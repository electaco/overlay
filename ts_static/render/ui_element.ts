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

    constructor(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
        this.camera = camera;
        this.scene = scene;
        
        this.base = new THREE.Object3D();
        this.base.name = "UI Elements";
        let userdata: IUserData = {SkipRemove: true};
        this.base.userData = userdata;
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

    UpdatePosition() {
        this.base.position.copy(this.camera.position);
        this.base.rotation.copy(this.camera.rotation);
    }

    CastForElements(position: {x: number, y: number}) {
        raycaster.setFromCamera(position, this.camera);
        const intersects = raycaster.intersectObjects(this.base.children, false)
        return intersects;
    }

    AddElement(uiElement: IUiElement): void {
        const element = new THREE.Sprite(new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(uiElement.icon),
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        }));
        
        element.scale.set(uiElement.scale.x, uiElement.scale.y, 1);
        let ud: IUserData = {
            onClick: () => { 
                ipcRenderer.send(IPC.UI.OnClick, {event: uiElement.onclick_event, data: uiElement.onclick_data});
            },
            onMouseOverEnter: () => {
                element.material.opacity = 1;
            },
            onMouseOverExit: () => {
                element.material.opacity = 0.5;
            },
        }
        element.userData = ud;
        element.layers.enable(2);
        this.base.add(element);
        element.position.set(uiElement.position.x, uiElement.position.y,-10);
    }
}

