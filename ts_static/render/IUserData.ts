import { ICameraPositionResult } from "./CameraPositionManager";

export interface IUserData {
    onRemove?: () => void;
    SkipRemove?: boolean;
    showDistance?: number;
    onAfterRender?: (camerapos: ICameraPositionResult, scene: THREE.Scene) => void;
    onMouseOverExit?: () => void;
    onMouseOverEnter?: () => void;
    onClick?: () => void;
}