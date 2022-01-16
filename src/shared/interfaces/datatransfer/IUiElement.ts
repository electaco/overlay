export interface IUiElement {
    id: string;
    icon: string;
    position: { x: number, y: number };
    scale: { x: number, y: number };
    onclick_event: string;
    onclick_data: string;
}