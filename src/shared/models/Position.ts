import { IPosition } from "../interfaces/common";

export class Position implements IPosition {
    X: number;
    Y: number;
    Z: number;

    // Note: The Z and X are switched here.
    static FromGw2Position(position) {
        return new Position(position.Z, position.Y, position.X);
    }

    constructor(X: number, Y: number, Z: number) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
}