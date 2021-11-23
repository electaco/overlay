import * as THREE from 'three';
import { IRenderData } from '../src/shared/interfaces/render/renderdata';
import { IVideoData } from '../src/shared/interfaces/datatransfer/IVideoData';
import { IPositionMarker, MarkerType } from '../src/shared/interfaces/render/marker';
import { MovieManager } from './render/VideoMarker';
import { CameraPositionManager } from './render/CameraPositionManager';
import { IGw2MumbleLinkData, UiState } from "../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { CreateMarker } from './render/PositionMarker';

declare var ipcRenderer: any;
declare var vPlayer: any;

let RenderData: IRenderData = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(59, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

const logger = function (text) {
  ipcRenderer.send("log", "Render", text);
}

const movieManager = new MovieManager(scene, vPlayer);
const positionManager = new CameraPositionManager(RenderScene);

let ISUPDATING = false;


function UpdateSceneData(renderData: IRenderData) {
  logger("UpdateSceneData called");
  if (ISUPDATING) {
    return;
  }

  ISUPDATING = true;
  try {
    let toRemove = [];
    scene.children.forEach((child) => {
      if (child.userData.onRemove) {
        child.userData.onRemove(scene);
      }
      if (!child.userData.SkipRemove) {
        toRemove.push(child);
      }
    });
    scene.remove(...toRemove);

    let videoMarkers: Array<IVideoData> = [];

    renderData?.markers?.forEach((marker) => {
      if (marker.type == MarkerType.PositionMarker)
        scene.add(CreateMarker(marker as IPositionMarker));
      if (marker.type == MarkerType.VideoMarker) {
        const videoData = marker as IVideoData;
        videoData.visibleDistance = videoData.visibleDistance || 65;
        videoData.fadeInDistance = videoData.fadeInDistance || 50;
        videoMarkers.push(videoData);
      }
    });

    movieManager.SetVideoMarkers(videoMarkers);

  } catch (e) {
    logger("Error in UpdateScene: " + e);
  }
  ISUPDATING = false;
}
let LASTTIME = 0;


function RenderScene(timerarg = null) {
  if (ISUPDATING) {
    requestAnimationFrame(RenderScene);
    return;
  }

  if (timerarg) {
    //console.log("Timer: " + timerarg + " - " + LASTTIME);
    if (timerarg == null || timerarg - LASTTIME < 21) {
      requestAnimationFrame(RenderScene);
      return;
    }
    LASTTIME = timerarg;
  }
  positionManager.UpdateCameraPosition(camera);
  movieManager.CheckVideoDistance(camera);

  renderer.render(scene, camera);
 
  scene.children.forEach((child) => {
    if (child.userData.onAfterRender) {
      child.userData.onAfterRender(positionManager.GetPosition(), scene);
    }
    if (child.userData.autoScale) {
      var distance = child.position.distanceTo(camera.position);
      distance = THREE.MathUtils.clamp(distance, 100, 1000);
      var scale = THREE.MathUtils.mapLinear(distance, 5, 2000, 1.4, 0.1);
      child.scale.set(scale, scale, scale);
    }
    if (child.userData.showDistance) {
      child.visible = child.parent.position.distanceTo(camera.position) < child.userData.showDistance;
    }
  })

  if (timerarg) {
    requestAnimationFrame(RenderScene);
  }
}

ipcRenderer.on('render', function (event, data: IRenderData) {
  RenderData = data;
  UpdateSceneData(RenderData);
  RenderScene();
});

ipcRenderer.on('video', function (event, data: IVideoData) {
  movieManager.PlayVideo(data);
});

ipcRenderer.on('gw2data', function (event, data: IGw2MumbleLinkData) {
  updateGw2Data(data);
});

ipcRenderer.on('cleanup', function (event, data) {
  movieManager.Cleanup();
  ipcRenderer.send("cleanup-done");
});

var raycaster = new THREE.Raycaster();
raycaster.layers.set(2);
var intersected = null;

ipcRenderer.on('mousemove', function (event, mouse) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  /*scene.remove ( arrow );
  arrow = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 100, Math.random() * 0xffffff );
  scene.add( arrow );*/

  if (intersected) {
    intersected.children[1].userData.showDistance = intersected.children[1].userData.oldShowDistance;
  }

  intersected = null;

  if (intersects.length > 0) {
    intersected = intersects[0].object.parent;
    intersected.children[1].userData.oldShowDistance = intersects[0].object.parent.children[1].userData.showDistance;
    intersected.children[1].userData.showDistance = 99999999;
  }
});

let isMap = false;
function updateGw2Data(data: IGw2MumbleLinkData) {
  if (data.context.UiState & UiState.MapOpen) {
    if (!isMap) {
      UpdateSceneData(null);
      positionManager.SetPosition(data);
    }
    logger(`Map data: ${JSON.stringify(data.context, null, 2)}`)
    logger(`Linear mapping: ${THREE.MathUtils.mapLinear(data.context.MapPlayerX, 15232, 17664, -27648, 30720)}`)
    isMap = true;
    return;
  }

  if (isMap) {
    UpdateSceneData(RenderData);
    isMap = false;
  }

  positionManager.SetPosition(data);

  try {
    if ((performance.now() - LAST_MAIN_UPDATE) > 500) {
      ipcRenderer.send('gw2data', data);
      LAST_MAIN_UPDATE = performance.now();
    }
  } catch (e) {
    console.log(e);
  }
}

ipcRenderer.send('getrender', true);

let LAST_MAIN_UPDATE = 0;
const WS_CLIENT = "ws://localhost:19939/position";
let webSocket = new WebSocket(WS_CLIENT);
webSocket.onopen = function (event) {
  logger("Connected to web socket");
  ipcRenderer.send('connstatus', "yellow");
}
webSocket.onclose = function (event) {
  logger("Disconnected from web socket");
  ipcRenderer.send('fallback_positionupdate', "msg");
}
webSocket.onerror = function (event) {
  console.log("Error on web socket", event);
  logger("Error on web socket");
}

let got_position = false;
webSocket.onmessage = function (event) {

  var msg = JSON.parse(event.data);
  if (msg?.identity?.FovDegrees) {
    if (!got_position) {
      got_position = true;
      logger("Got first position from websocket");
      ipcRenderer.send('connstatus', "green");
    }
    updateGw2Data(msg);
  }
}

requestAnimationFrame(RenderScene);