import * as THREE from 'three';
import { IPC } from '../src/shared/ipc';
import { IRenderData } from '../src/shared/interfaces/render/renderdata';
import { IVideoData } from '../src/shared/interfaces/datatransfer/IVideoData';
import { IPositionMarker, MarkerType } from '../src/shared/interfaces/render/marker';
import { IGw2MumbleLinkData, UiState } from "../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { MovieManager } from './render/VideoMarker';
import { ArrowHud } from './render/ArrowHud';
import { CameraPositionManager } from './render/CameraPositionManager';
import { CreateMarker } from './render/PositionMarker';
import { send, on, invoke } from '../src/shared/electron_ipc';

class RenderManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private movieManager: MovieManager;
  private arrowHud: ArrowHud;
  private positionManager: CameraPositionManager;
  private raycaster: THREE.Raycaster;
  private intersected: THREE.Object3D | null = null;
  private renderData: IRenderData | null = null;
  private isUpdating = false;
  private lastTime = 0;
  private lastMainUpdate = 0;
  private isMap = false;
  private mapId: string | null = null;
  private mapChangePending = false;
  private webSocket: WebSocket | null = null;
  private gotPosition = false;
  // Cursor in normalized device coordinates, or null when it is off the overlay. Updated from DOM
  // events and acted on once per rendered frame.
  private pointer: THREE.Vector2 | null = null;
  private pointerMoved = false;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(59, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    // Render at the display's real resolution. Without the pixel ratio the canvas is drawn in CSS
    // pixels and stretched by the display scale (1.5x at 150%), blurring all text and markers.
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    this.movieManager = new MovieManager(this.scene);
    this.arrowHud = new ArrowHud(this.scene);
    this.positionManager = new CameraPositionManager(this.renderScene.bind(this));
    this.raycaster = new THREE.Raycaster();
    this.raycaster.layers.set(2);

    this.initWebSocket();
    this.initEventListeners();
    requestAnimationFrame(this.renderScene.bind(this));
  }

  private initWebSocket() {
    const WS_CLIENT = "ws://localhost:19939/position";
    this.webSocket = new WebSocket(WS_CLIENT);
    this.webSocket.onopen = () => {
      this.logInfo("Connected to web socket");
      send(IPC.ConnectionStatus, "yellow");
    }
    this.webSocket.onclose = () => {
      this.logInfo("Disconnected from web socket");
      send(IPC.UseFallbackPositionUpdate, "msg");
    }
    this.webSocket.onerror = (event) => {
      console.log("Error on web socket", event);
      this.logInfo("Error on web socket");
    }

    this.webSocket.onmessage = (event) => {
      var msg = JSON.parse(event.data);
      if (msg?.Type === "loadingscreen") {
        // MumbleLink has no loading screen flag; the position service detects one from a
        // stalled uiTick. The position stays at the old spot until the next map has loaded,
        // so nothing is drawn meanwhile and the video is paused. Older services never send this.
        const loading = String(msg.Data).toLowerCase() === "true";
        this.logInfo(loading ? "Loading screen" : "Loading screen ended");
        this.scene.visible = !loading;
        this.movieManager.SetSuspended(loading);
        // Main's last position is stale meanwhile too (marker auto-hide must not count it).
        send(IPC.LoadingScreen, loading);
        return;
      }
      if (msg?.identity?.FovDegrees) {
        if (!this.gotPosition) {
          this.gotPosition = true;
          this.logInfo("Got first position from websocket");
          send(IPC.ConnectionStatus, "green");
        }
        this.updateGw2Data(msg);
      }
    }
  }

  private initEventListeners() {
    on(IPC.Render, (data) => {
      this.renderData = data as IRenderData;
      // Render data can arrive while the map is open (any settings change sends it). It is
      // kept for when the map closes, not shown.
      this.updateSceneData(this.isMap ? null : this.renderData);
      this.renderScene();
    });

    on(IPC.Gw2Data, (data) => {
      this.updateGw2Data(data as IGw2MumbleLinkData);
    });

    // The overlay is click-through with { forward: true } (windows.ts), so the page still gets
    // real mousemove events while the game has focus, in page pixels on whatever display the
    // overlay covers. No clicks reach it.
    //
    // The last position is kept and raycast every frame, so hover follows the camera while the
    // cursor is still. 'mouseleave' is no use here: a click-through window that never really holds
    // the mouse gets mouseout/mouseleave right after every forwarded move (still inside the
    // window), which made hover flash for a frame. Whether the cursor has really left the
    // overlay (to another display) is asked from main while something is hovered.
    window.addEventListener('mousemove', (e) => {
      this.pointer = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1);
      this.pointerMoved = true;
    });
    setInterval(() => {
      if (!this.pointer || !this.movieManager.IsHovered()) return;
      invoke(IPC.CursorInOverlay).then((inside) => {
        if (inside === false) {
          this.pointer = null;
          this.pointerMoved = true;
        }
      });
    }, 500);
  }

  private updateSceneData(renderData: IRenderData | null) {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    try {
      this.removeUnusedObjects();
      this.addNewMarkers(renderData);
      this.movieManager.SetVideoMarkers(this.extractVideoMarkers(renderData));
      this.arrowHud.SetCandidates(renderData?.arrow?.candidates);
    } catch (e) {
      this.logError("Error in UpdateScene: " + e);
    }
    this.isUpdating = false;
  }

  private renderScene(timerarg: number | null = null) {
    if (this.isUpdating) {
      requestAnimationFrame(this.renderScene.bind(this));
      return;
    }

    if (timerarg) {
      if (timerarg == null || timerarg - this.lastTime < 21) {
        requestAnimationFrame(this.renderScene.bind(this));
        return;
      }
      this.lastTime = timerarg;
    }

    this.positionManager.UpdateCameraPosition(this.camera);
    if (this.positionManager.isReady) {
      this.movieManager.Update(this.positionManager.GetPosition());
    }
    if (this.pointerMoved) {
      this.pointerMoved = false;
      this.handleMouseMove(this.pointer);
    }
    // Every frame, not only on mouse moves: the screen moves under a still cursor as the camera does.
    this.movieManager.UpdateHover(this.pointer, this.camera);
    // Before rendering: marker sizes and text facing depend on the camera, and applying them after
    // the render drew every frame with the previous frame's values, so markers (close ones most,
    // whose size changes fastest) wobbled as the player moved.
    this.updateSceneObjects();
    if (this.positionManager.isReady) {
      this.arrowHud.Update(this.positionManager.GetPosition(), this.camera, this.scene.visible);
    }
    this.renderer.render(this.scene, this.camera);

    if (timerarg) {
      requestAnimationFrame(this.renderScene.bind(this));
    }
  }

  private updateSceneObjects() {
    this.scene.children.forEach((child) => {
      if (child.userData.onFrame) {
        child.userData.onFrame(this.positionManager.GetPosition(), this.scene, this.camera);
      }
      if (child.userData.showDistance && child.parent) {
        child.visible = child.parent.position.distanceTo(this.camera.position) < child.userData.showDistance;
      }
    });
  }

  private handleMouseMove(mouse: THREE.Vector2 | null) {
    let intersect: THREE.Object3D | null = null;
    if (mouse) {
      this.raycaster.setFromCamera(mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      intersect = intersects.length > 0 ? intersects[0].object.parent : null;
    }

    if (intersect !== this.intersected) {
      if (this.intersected && this.intersected.userData.onMouseOverExit) {
        this.intersected.userData.onMouseOverExit();
      }

      if (intersect && intersect.userData.onMouseOverEnter) {
        intersect.userData.onMouseOverEnter();
      }
    }
    this.intersected = intersect;
  }

  private updateGw2Data(data: IGw2MumbleLinkData) {
    const mapId = data.coordinates?.MapId ? String(data.coordinates.MapId) : null;
    if (mapId && mapId !== this.mapId) {
      // The markers we have belong to the previous map. Drop them now rather than when main
      // notices the change (up to the relay interval later), and ask for the new map's markers:
      // main only resends on its own if the translated map id changed. The first position asks
      // too, so a reloaded overlay page gets its markers without waiting for a map change.
      this.mapChangePending = true;
      if (this.mapId !== null) {
        this.renderData = null;
        this.updateSceneData(null);
      }
      this.mapId = mapId;
    }

    if (data.context.UiState & UiState.MapOpen) {
      if (!this.isMap) {
        this.updateSceneData(null);
        this.positionManager.SetPosition(data);
      }
      this.isMap = true;
      return;
    }

    if (this.isMap) {
      this.updateSceneData(this.renderData);
      this.isMap = false;
    }

    this.positionManager.SetPosition(data);

    try {
      if (this.mapChangePending) {
        this.mapChangePending = false;
        send(IPC.Gw2Data, data);
        send(IPC.GetRender);
        this.lastMainUpdate = performance.now();
      } else if (performance.now() - this.lastMainUpdate > 500) {
        // Throttled relay to main, which only needs it to notice map changes.
        send(IPC.Gw2Data, data);
        this.lastMainUpdate = performance.now();
      }
    } catch (e) {
      console.log(e);
    }
  }

  private logInfo(text: string) {
    send(IPC.Log, "Render", text);
  }

  private logError(text: string) {
    send(IPC.Log, "Render", text);
  }

  private removeUnusedObjects() {
    let toRemove: THREE.Object3D[] = [];
    this.scene.children.forEach((child) => {
      if (child.userData.onRemove) {
        child.userData.onRemove(this.scene);
      }
      if (!child.userData.SkipRemove) {
        toRemove.push(child);
      }
    });
    this.scene.remove(...toRemove);
  }

  private addNewMarkers(renderData: IRenderData | null) {
    renderData?.markers?.forEach((marker) => {
      if (marker.type == MarkerType.PositionMarker)
        this.scene.add(CreateMarker(marker as IPositionMarker));
    });
  }

  private extractVideoMarkers(renderData: IRenderData | null): Array<IVideoData> {
    const videoMarkers: Array<IVideoData> = [];
    renderData?.markers?.forEach((marker) => {
      if (marker.type == MarkerType.VideoMarker) {
        videoMarkers.push(marker as IVideoData);
      }
    });
    return videoMarkers;
  }
}

new RenderManager();