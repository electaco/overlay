import { IVideoData } from "../../src/shared/interfaces/datatransfer/IVideoData";
import * as THREE from 'three';
import { ICameraPositionResult } from "./CameraPositionManager";
import { Vector3 } from "three";
// @ts-ignore
import isEqual = require("lodash.isequal");
const Hls = require("hls.js");

export class MovieManager {
  video: HTMLVideoElement;
  movieScreen: THREE.Mesh | null = null;
  //vPlayer: any;
  scene: THREE.Scene;
  isPlaying: boolean = false;
  isActive: boolean = false;
  vTexture: THREE.VideoTexture | null = null;
  vTextureUpdated: Date = new Date();

  activeVideoMark: IVideoData | null = null;
  videoMarks: {marker: IVideoData, pos: Vector3}[] = [];
  vMaterial: THREE.MeshBasicMaterial;

  constructor(scene: THREE.Scene) {
    //this.vPlayer = player;
    this.scene = scene;
    this.video = document.getElementById('player') as HTMLVideoElement;
    this.video.crossOrigin = "anonymous";
    this.vTexture = new THREE.VideoTexture(this.video);
    this.vMaterial = new THREE.MeshBasicMaterial({ map: this.vTexture, side: THREE.FrontSide });

    this.video.onended = () => {
      this.Stop();
    }
  }

  GetVideoMarker(ratio: [number, number]) {
    if (this.movieScreen) {
      if (this.movieScreen.userData.ratio == ratio)
        return;
      this.scene.remove(this.movieScreen);
      this.movieScreen.geometry.dispose();
    }
    var movieGeometry = new THREE.PlaneGeometry(ratio[0], ratio[1]);
    this.movieScreen = new THREE.Mesh(movieGeometry, this.vMaterial);

    this.movieScreen.userData.SkipRemove = true;
    this.movieScreen.userData.ratio = ratio;
    this.scene.add(this.movieScreen);
    console.log("Created video marker with ratio "+ ratio[0] + "x" + ratio[1]);
  }

  Stop() {
   this.isPlaying = false;
   // this.vPlayer.pause();
  }

  SetVisibleStatus (status: boolean) {
    if (this.movieScreen) {
      this.movieScreen.visible = status;
      this.vMaterial.visible = status;
    }
  }

  Cleanup() {
    //this.vPlayer.dispose();
  }

  Play() {
    if (this.isActive) {
      //this.vPlayer.play();
      this.isPlaying = true;
    }
  }

  AddVideo(data: IVideoData) {
    console.log("Add video", data);
    this.videoMarks.push({
      marker: data,
      pos: new Vector3(data.position.X, data.position.Y, data.position.Z)
    });
  }

  ClearMarkers() {
    this.videoMarks = [];
  }

  SetVideoMarkers(markers: IVideoData[]) {
    this.ClearMarkers();
    for (let i = 0; i < markers.length; i++) {
      this.AddVideo(markers[i]);
    }
    this.CheckMarkersList();
  }

  CheckMarkersList() {
    if (this.activeVideoMark) {
      let index = this.videoMarks.findIndex(x => isEqual(x.marker, this.activeVideoMark));
      if (index == -1) {
        this.UnloadMarker();
      }
    }
  }

  UnloadMarker() {
    if (this.movieScreen == null) return;
    this.movieScreen.userData.onAfterRender = null;
    this.activeVideoMark = null;
    this.Stop();
    this.SetVisibleStatus(false);
  }

  CheckVideoDistance(camera: THREE.Camera) {
    if (this.activeVideoMark) {
      return;
    }
    for (let i = 0; i < this.videoMarks.length; i++) {
      let data = this.videoMarks[i];
      if (data.marker.visibleDistance) {
        let distance = data.pos.distanceTo(camera.position);
        if (distance < data.marker.visibleDistance) {
          this.PlayVideo(data.marker);
          break;
        }
      }
    }
    this.Stop();
  }

  PlayVideo(data: IVideoData) {
    //this.SetVisibleStatus(true);
    if (isEqual(data, this.activeVideoMark)) return;
    console.log("Data is not active video mark");
    this.GetVideoMarker(data.source.ratio);
    this.isActive = true;

    if (!isEqual(data.source, this.activeVideoMark?.source)) {
      this.Stop();
      let src = { url: data.source.url, type: data.source.type };
      console.log('Play video', src);
      var hls = new Hls();
      hls.loadSource(src.url);
      hls.attachMedia(this.video);
      this.video.play();
      //this.vPlayer.src(src);
    }

    this.activeVideoMark = data;

    if (this.movieScreen == null) return;

    this.movieScreen.position.set(data.position.X, data.position.Y, data.position.Z);
    this.movieScreen.rotation.set(data.rotation.X, data.rotation.Y, data.rotation.Z);
    this.movieScreen.scale.set(data.scale, data.scale, data.scale);
    this.SetVisibleStatus(true);

    this.movieScreen.userData.onAfterRender = (camerapos: ICameraPositionResult, scene: THREE.Scene, camera) => {
      if (!this.movieScreen)
        return;

      if (data.visibleDistance) {
        let distance = this.movieScreen.position.distanceTo(camerapos.playerposition);
        if (distance > (data.visibleDistance+2)) {
          this.UnloadMarker();
          return;
        }

        if (data.fadeInDistance && this.movieScreen.visible) {
          if (distance > data.fadeInDistance) {
            let opacity = THREE.MathUtils.mapLinear(distance, data.fadeInDistance, data.visibleDistance, 1, 0);
            opacity = Math.min(Math.max(opacity, 0), 1);
            this.vMaterial.opacity = opacity;
            this.video.volume = opacity;
          } else {
            this.vMaterial.opacity = 1;
            this.video.volume = 1;
          }
        }
      }
      if (this.movieScreen.visible && !this.isPlaying)
        this.Play();
      if (!this.movieScreen.visible && this.isPlaying)
        this.Stop();
    }
    return this.movieScreen;
  }
}