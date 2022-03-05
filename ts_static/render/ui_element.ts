import * as THREE from 'three';
import { IUiElement } from '../../src/shared/interfaces/datatransfer/IUiElement';
import { IPC } from '../../src/shared/IPC';
import { IUserData } from './IUserData';
    
declare var ipcRenderer: any;
const raycaster = new THREE.Raycaster();

export class UiElementManager {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    base: THREE.Object3D;
    uiElements: THREE.Object3D;
    uiScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
    Zplane = -10;
    lastFoV: number | null = null;
    box: THREE.Box2 | null = null;

    constructor(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
        this.camera = camera;
        this.scene = scene;
        
        this.base = new THREE.Object3D();
        this.base.name = "UI Elements";
        let userdata: IUserData = {SkipRemove: true};
        this.base.userData = userdata;
        this.uiElements = new THREE.Object3D();
        this.base.add(this.uiElements);
        scene.add(this.base);
        
        this.UpdatePosition();

        ipcRenderer.on(IPC.UI.AddElement, (event, uiElement: IUiElement) => { 
            this.AddElement(uiElement);
        });
        ipcRenderer.on(IPC.MouseClick, (event, data ) => {
            if (data.button == "Left") {
                const intersects = this.CastForElements({ x: data.x, y: data.y });
                console.log("intersects", intersects);
                if (intersects.length > 0) {
                    intersects[0].object.userData.onClick();
                }
            }
        });
        console.log("UiElementManager created");
    }

    // https://stackoverflow.com/questions/46578529/how-to-compute-the-size-of-the-rectangle-that-is-visible-to-the-camera-at-a-give
    visibleBox(z:number) {
        var t = Math.tan(THREE.MathUtils.degToRad( this.camera.fov ) / 2 )
        var h = t * 2 * z;
        var w = h * this.camera.aspect;
        return new THREE.Box2(new THREE.Vector2(-w, h), new THREE.Vector2(w, -h));
    }

    calculateVisibleArea(): boolean {
        if (this.lastFoV != this.camera.fov) {
            this.box = this.visibleBox(this.Zplane);
            this.lastFoV = this.camera.fov;
            return true;
        }
        return false;
    }

    calculateZdistance() {
        let size = this.uiElements.scale;

        const fov = this.camera.fov * ( Math.PI / 180 );
        const fovh = 2*Math.atan(Math.tan(fov/2) * this.camera.aspect);
        let dx = size.z / 2 + Math.abs( size.x / 2 / Math.tan( fovh / 2 ) );
        let dy = size.z / 2 + Math.abs( size.y / 2 / Math.tan( fov / 2 ) );
        let cameraZ = Math.max(dx, dy);
        return cameraZ * -100;
        // visible_height = 2 * Math.tan( ( Math.PI / 180 ) * camera.fov / 2 ) * distance_from_camera;
        // depht_s = Math.tan(fov_y/2.0 * Math.PI/180.0) * 2.0;
        //let x = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * 2;
        //let x = (this.camera.fov / this.camera.aspect) - 100;
        //console.log(x);
        //return x;
    }

    UpdatePosition() {
        this.base.position.copy(this.camera.position);
        this.base.rotation.copy(this.camera.rotation);
        if (this.camera.fov != this.lastFoV) {
            this.uiElements.position.set(0, 0, this.calculateZdistance());
            this.lastFoV = this.camera.fov;
        }
    }

    CastForElements(position: {x: number, y: number}) {
        raycaster.setFromCamera(position, this.camera);
        const intersects = raycaster.intersectObjects(this.uiElements.children, false)
        return intersects;
    }

    AddElement(uiElement: IUiElement): void {
        const element = new THREE.Sprite(new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(uiElement.icon),
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: false,
        }));
        const scaleFudge = 0.1;
        element.scale.set(uiElement.scale.x * scaleFudge, uiElement.scale.y * scaleFudge, 1);

        let ud: IUserData = {
            onClick: () => { 
                ipcRenderer.send(IPC.UI.OnClick, {event: uiElement.onclick_event, data: uiElement.onclick_data});
            },
            onMouseOverEnter: () => {
                element.material.opacity = 1;
            },
            onMouseOverExit: () => {
                element.material.opacity = 0.5;
            }
        }
        element.userData = ud;
        element.layers.enable(2);
        this.uiElements.add(element);
        element.position.set(uiElement.position.x, uiElement.position.y, 0);
    }
}

