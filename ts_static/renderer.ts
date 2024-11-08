import * as THREE from 'three';
import { IPC } from '../src/shared/IPC';
import { IRenderData } from '../src/shared/interfaces/render/renderdata';
import { IVideoData } from '../src/shared/interfaces/datatransfer/IVideoData';
import { IPositionMarker, MarkerType } from '../src/shared/interfaces/render/marker';
import { IGw2MumbleLinkData, UiState } from "../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { MovieManager } from './render/VideoMarker';
import { CameraPositionManager } from './render/CameraPositionManager';
import { CreateMarker } from './render/PositionMarker';

declare var ipcRenderer: any;
//declare var vPlayer: any;

class RenderManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private movieManager: MovieManager;
  private positionManager: CameraPositionManager;
  private raycaster: THREE.Raycaster;
  private intersected: THREE.Object3D | null = null;
  private renderData: IRenderData | null = null;
  private isUpdating = false;
  private lastTime = 0;
  private lastMainUpdate = 0;
  private isMap = false;
  private webSocket: WebSocket;
  private gotPosition = false;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(59, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    document.body.appendChild(this.renderer.domElement);

    this.movieManager = new MovieManager(this.scene);
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
      ipcRenderer.send(IPC.ConnectionStatus, "yellow");
    }
    this.webSocket.onclose = () => {
      this.logInfo("Disconnected from web socket");
      ipcRenderer.send(IPC.UseFallbackPositionUpdate, "msg");
    }
    this.webSocket.onerror = (event) => {
      console.log("Error on web socket", event);
      this.logInfo("Error on web socket");
    }

    this.webSocket.onmessage = (event) => {
      var msg = JSON.parse(event.data);
      if (msg?.identity?.FovDegrees) {
        if (!this.gotPosition) {
          this.gotPosition = true;
          this.logInfo("Got first position from websocket");
          ipcRenderer.send(IPC.ConnectionStatus, "green");
        }
        this.updateGw2Data(msg);
      }
    }
  }

  private initEventListeners() {
    ipcRenderer.on(IPC.Render, (event, data: IRenderData) => {
      this.renderData = data;
      this.updateSceneData(this.renderData);
      this.renderScene();
    });

    ipcRenderer.on(IPC.Video, (event, data: IVideoData) => {
      this.movieManager.PlayVideo(data);
    });

    ipcRenderer.on(IPC.Gw2Data, (event, data: IGw2MumbleLinkData) => {
      this.updateGw2Data(data);
    });

    ipcRenderer.on(IPC.MouseMove, (event, mouse) => {
      this.handleMouseMove(mouse);
    });
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
    this.movieManager.CheckVideoDistance(this.camera);
    this.renderer.render(this.scene, this.camera);
    this.handlePostRenderActions();

    if (timerarg) {
      requestAnimationFrame(this.renderScene.bind(this));
    }
  }

  private handlePostRenderActions() {
    this.scene.children.forEach((child) => {
      if (child.userData.onAfterRender) {
        child.userData.onAfterRender(this.positionManager.GetPosition(), this.scene, this.camera);
      }
      if (child.userData.showDistance && child.parent) {
        child.visible = child.parent.position.distanceTo(this.camera.position) < child.userData.showDistance;
      }
    });
  }

  private handleMouseMove(mouse: any) {
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    let intersect = intersects.length > 0 ? intersects[0].object.parent : null;

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
      if (performance.now() - this.lastMainUpdate > 500) {
        ipcRenderer.send(IPC.Gw2Data, data);
        this.lastMainUpdate = performance.now();
      }
    } catch (e) {
      console.log(e);
    }
  }

  private logInfo(text: string) {
    ipcRenderer.send(IPC.Log, "Render", text);
  }

  private logError(text: string) {
    ipcRenderer.send(IPC.Log, "Render", text);
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
      if (marker.type == MarkerType.VideoMarker) {
        const videoData = marker as IVideoData;
        videoData.visibleDistance = videoData.visibleDistance || 65;
        videoData.fadeInDistance = videoData.fadeInDistance || 50;
      }
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