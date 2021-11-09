import { IVideoData } from "../../src/shared/interfaces/datatransfer/IVideoData";
import * as THREE from 'three';
import { throws } from "assert";
import { ICameraPositionResult } from "./CameraPositionManager";

export class MovieManager {
    video: HTMLVideoElement;
    movieScreen: THREE.Mesh | null = null;
    vPlayer: any;
    scene: THREE.Scene;
    isPlaying: boolean = false;
    isActive: boolean = false;
    vTexture: THREE.VideoTexture | null = null;
    vTextureUpdated: Date = new Date();
  
    constructor(scene: THREE.Scene, player: any) {
      this.vPlayer = player;
      this.scene = scene;
      this.video = document.getElementById('player_html5_api') as HTMLVideoElement;
      this.video.crossOrigin = "anonymous";
      
      this.vTexture = new THREE.VideoTexture(this.video);
      //vTexture.minFilter = THREE.LinearFilter;
      //vTexture.magFilter = THREE.LinearFilter;
      //vTexture.format = THREE.RGBFormat;

      this.video.onended = () => {
        this.Stop();
      }
    }
  
    GetTexture() {
      if (!this.vTexture) {// || this.vTextureUpdated.getTime() < Date.now() - 5000) {
        if (this.vTexture)
          this.vTexture.dispose();
        this.vTexture = new THREE.VideoTexture(this.video);
        this.vTextureUpdated = new Date();
      }
      return this.vTexture;
    }

    Stop() {
      this.isPlaying = false;
      this.vPlayer.pause();
    }

    Cleanup() {
      this.vPlayer.dispose();
    }
  
    Play() {
      if (this.isActive) {
        this.vPlayer.play();
        this.isPlaying = true;
      }
    }

    PlayVideo(data: IVideoData, autoplay = true) {
      this.Stop();

      this.vPlayer.src({ type: data.source.type, src: data.source.url });
      this.isActive = true;

      if (autoplay) 
        this.Play();

      let vMaterial = new THREE.MeshBasicMaterial({ map: this.GetTexture(), side: THREE.DoubleSide });
  
      var movieGeometry = new THREE.PlaneGeometry(data.source.ratio[0], data.source.ratio[1]);
      this.movieScreen = new THREE.Mesh(movieGeometry, vMaterial);
      this.movieScreen.position.set(data.position.X, data.position.Y, data.position.Z);
      this.movieScreen.rotation.set(data.rotation.X, data.rotation.Y, data.rotation.Z);
      this.movieScreen.scale.set(data.scale, data.scale, data.scale);

      this.movieScreen.userData.onRemove = (_scene) => {
        this.isActive = false;
        vMaterial.dispose();
        movieGeometry.dispose();
        this.Stop();
        this.movieScreen = null;
      }

      this.movieScreen.userData.onAfterRender = (camerapos: ICameraPositionResult, scene: THREE.Scene) => {
        if (!this.movieScreen)
          return;

        if (data.visibleDistance) {
          let distance = this.movieScreen.position.distanceTo(camerapos.playerposition);
          this.movieScreen.visible =  distance < data.visibleDistance;
          vMaterial.visible = this.movieScreen.visible;
          if (data.fadeInDistance && this.movieScreen.visible) {
            if (distance > data.fadeInDistance) {
              let opacity =THREE.MathUtils.mapLinear(distance, data.fadeInDistance, data.visibleDistance, 1, 0);
              vMaterial.opacity = opacity;
              this.video.volume = opacity;
            } else {
              vMaterial.opacity = 1;
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