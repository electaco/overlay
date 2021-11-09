import * as THREE from 'three';
import { IRenderData } from '../src/shared/interfaces/render/renderdata';
import { IVideoData } from '../src/shared/interfaces/datatransfer/IVideoData';
import { IPositionMarker, MarkerType } from '../src/shared/interfaces/render/marker';
import { Object3D } from 'three';
import { makeTextSprite3 } from './render/textsprite';
import { MovieManager } from './render/VideoMarker';
import { CameraPositionManager } from './render/CameraPositionManager';
import { createMarkerIcon } from './render/MarkerIcon';

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

let textSprites: Array<Object3D> = [];

function CreateMarker(marker: IPositionMarker) {
  const markerGroup = new THREE.Group();
  markerGroup.position.set(marker.position.X, marker.position.Y, marker.position.Z);
  markerGroup.name = "Hello world";
  if (marker.icon) {
    let icon = createMarkerIcon(marker.icon);
    markerGroup.add(icon);

  }

  if (marker.text) {
    var sprite = makeTextSprite3(marker.text);
    sprite.position.set(marker.text.offset.X, marker.text.offset.Y, marker.text.offset.Z);
    markerGroup.add(sprite);
    textSprites.push(sprite);
  }
  markerGroup.userData = {
    mouseover: marker.markerMouseoverData,
    autoScale: true
  }
  return markerGroup;
}
let ISUPDATING = false;


function UpdateScene(renderData: IRenderData) {
  logger("UpdateScene called");
  if (ISUPDATING) {
    return;
  }

  ISUPDATING = true;
  try {
    scene.children.forEach((child) => {
      if (child.userData.onRemove) {
        child.userData.onRemove(scene);
      }
    });
    scene.remove(...scene.children);
    textSprites = [];

    renderData?.markers?.forEach((marker) => {
      if (marker.type == MarkerType.PositionMarker)
        scene.add(CreateMarker(marker as IPositionMarker));
      if (marker.type == MarkerType.VideoMarker) {
        const videoData = marker as IVideoData;
        marker.visibleDistance = 65;
        marker.fadeInDistance = 50;
        const videoMarker = movieManager.PlayVideo(videoData, false);
        scene.add(videoMarker);
      }
    });
  } catch (e) {
    logger("Error in UpdateScene: " + e);
  }
  ISUPDATING = false;
}
let LASTTIME = 0;

function render(timerarg = null) {
  if (ISUPDATING) {
    requestAnimationFrame(render);
    return;
  }

  if (timerarg) {
    //console.log("Timer: " + timerarg + " - " + LASTTIME);
    if (timerarg == null || timerarg - LASTTIME < 21) {
      requestAnimationFrame(render);
      return;
    }
    LASTTIME = timerarg;
  }

  positionManager.UpdateCameraPosition(camera);
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
    requestAnimationFrame(render);
  }
}

const movieManager = new MovieManager(scene, vPlayer);
const positionManager = new CameraPositionManager(render);

ipcRenderer.on('render', function (event, data: IRenderData) {
  RenderData = data;
  UpdateScene(RenderData);
  render();
});

ipcRenderer.on('video', function (event, data: IVideoData) {
  movieManager.PlayVideo(data);
});

ipcRenderer.on('gw2data', function (event, data) {
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
function updateGw2Data(data) {
  if (data.context.UiFlags !== undefined && data.context.UiFlags.indexOf("MapOpen") != -1) {
    if (!isMap) {
      UpdateScene(null);
      positionManager.SetPosition(data);
    }
    isMap = true;
    return;
  }

  if (isMap) {
    UpdateScene(RenderData);
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
  if (msg) {
    if (!got_position) {
      got_position = true;
      logger("Got first position from websocket");
      ipcRenderer.send('connstatus', "green");
    }
    updateGw2Data(msg);
  }
}

requestAnimationFrame(render);