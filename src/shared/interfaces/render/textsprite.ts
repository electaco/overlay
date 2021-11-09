import { IPosition } from '../common';

export interface ITextSprite {
    text: string;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    offset: IPosition;
    showDistance: number;
}