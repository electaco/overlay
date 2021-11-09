import * as THREE from 'three';

export interface ICameraPositionManager {
    SetPosition(coordinates): void;
    GetPosition(): ICameraPositionResult;
    UpdateCameraPosition(camera): void;
  }

export interface ICameraPositionResult {
    position: THREE.Vector3;
    target: THREE.Vector3;
    playerposition: THREE.Vector3;
    fov: number;
}

function v3ize(data) {
  return new THREE.Vector3(data.Z, data.Y, data.X);
}

export class CameraPositionManager implements ICameraPositionManager {
    renderCallback: any;

    constructor(renderCallback) {
        this.renderCallback = renderCallback;
    }

    UpdateCameraPosition(camera: THREE.PerspectiveCamera): void {
      if (!this.isReady) return;
  
      let cameraData = this.GetPosition();
      camera.position.set(cameraData.position.x, cameraData.position.y, cameraData.position.z);
      camera.lookAt(cameraData.target);
  
      if (cameraData.fov != camera.fov) {
        camera.fov = cameraData.fov;
        camera.updateProjectionMatrix();
      }
    }
  
    SetPosition(result) {
      this.last_received_position = v3ize(result.coordinates.cameraPosition);
      this.last_received_target = this.last_received_position.clone().add(v3ize(result.coordinates.cameraAngle));
      this.last_received_player_position = v3ize(result.coordinates.playerPosition);
      this.fov = result.identity.FovDegrees;
      this.isReady = true;
      this.renderCallback();
    }
  
    GetPosition(): ICameraPositionResult {
      return {
        position: this.last_received_position,
        target: this.last_received_target,
        fov: this.fov,
        playerposition: this.last_received_player_position
      }
    }
    last_received_position: THREE.Vector3;
    last_received_target: THREE.Vector3;
    last_received_player_position: THREE.Vector3;
    fov: number;
    isReady: boolean = false;
  }