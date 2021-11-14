import { IPosition } from "../common";

export interface IGw2Coordinates {
    playerPosition: IPosition
    cameraPosition: IPosition
    cameraAngle: IPosition
    playerViewAngle: IPosition
    playerTop: IPosition
    cameraTop: IPosition
    WorldId: number
    MapId: number
}

export enum GW2Profession {
    Guardian = 1,
    Warrior = 2,
    Engineer = 3,
    Ranger = 4,
    Thief = 5,
    Elementalist = 6,
    Mesmer = 7,
    Necromancer = 8,
    Revenant = 9
}

export enum GW2Race {
    Asura = 0,
    Charr = 1,
    Human = 2,
    Norn = 3,
    Sylvari = 4
}

export enum GW2UiSize {
    Small, Normal, Large, Larger
}

export interface IGw2Identity {
    Name: string
    Profession: GW2Profession
    Race: GW2Race
    MapId: number
    WorldId: number
    TeamColorId: number
    IsCommander: boolean
    FovRadians: number
    UiSize: GW2UiSize
    Spec: number
    FovDegrees: number
}

export enum UiState {
    MapOpen = 1,
    CompassTopRight = 2,
    CompassRotationEnabled = 4,
    GameHasFocus = 8,
    CompetetiveMode = 16,
    TextBoxInFocus = 32
}

export enum Mount {
    None,
    Jackal,
    Griffon,
    Springer,
    Skimmer,
    Raptor,
    RollerBeetle,
    Warclaw,
    Skyscale,
}

export interface IGw2Context {
    ServerAddress: Uint8Array
    MapId: number
    MapType: number
    ShardId: number
    Instance: number
    BuildId: number
    UiState: UiState
    CompassWidth: number
    CompassHeight: number
    CompassRotation: number
    MapPlayerX: number
    MapPlayerY: number
    MapCenterX: number
    MapCenterY: number
    MapScale: number
    ProcessId: number
    MountIndex: Mount
    UiFlags: string[]
}

export interface IGw2MumbleLinkData {
    coordinates: IGw2Coordinates
    identity: IGw2Identity
    context: IGw2Context
}