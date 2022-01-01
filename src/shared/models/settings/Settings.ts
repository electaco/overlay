import { IRuntimeSettings, ISettings } from "../../interfaces/settings";
import { IRenderSettings } from "../../interfaces/settings/IRenderSettings";
import { IRenderData } from "../../interfaces/render/renderdata";
import { MarkerGroupSettings } from "./MarkerGroupSettings";
import { RenderSettings } from "./RenderSettings";
import { deserialize, Type } from 'class-transformer';
import { IPositionMarker, MarkerType } from "../../interfaces/render/marker";
import { IVideoData } from "../../interfaces/datatransfer/IVideoData";

const fs = require('fs');

export class Settings implements ISettings {
    @Type(() => RenderSettings)
    render: IRenderSettings = new RenderSettings();

    @Type(() => MarkerGroupSettings)
    marks: Array<MarkerGroupSettings> = new Array<MarkerGroupSettings>();

    private configFile: string;

    runtimeData: IRuntimeSettings = {map: null};

    constructor(configFile: string) {
        this.configFile = configFile?.trim();
    }

    saveConfig() {

        fs.writeFileSync(this.configFile, JSON.stringify({
            render: this.render,
            marks: this.marks
        }));
    }

    addMarkerGroupFromJson(json: string): void {
        var instance = deserialize(MarkerGroupSettings, json);
        this.addMarkerGroup(instance);
    }

    static loadConfig(filename: string): Settings {
        if (fs.existsSync(filename)) {
            let data = fs.readFileSync(filename);
            var instance = deserialize(Settings, data);
            instance.configFile = filename;
            return instance;
        }

        return new Settings(filename);
    }

    setMap(mapId: string) {
        this.runtimeData.map = mapId;
    }

    addMarkerGroup(markerGroup: MarkerGroupSettings): void {
        this.marks.push(markerGroup);
    }

    removeMarkerGroup(index: number): void {
        this.marks.splice(index, 1);
    }

    getMarkerGroup(index: number): MarkerGroupSettings {
        return this.marks[index];
    }

    // Translate marker data from settings to render ready data
    createRenderData(MapId: string): IRenderData {
        let data: IRenderData = { markers: [] };

        this.marks.forEach((markerGroup, index) => {
            if (!markerGroup.active) {
                return;
            }

            markerGroup.markers[MapId]?.forEach((marker, markerIndex) => {
                if (!marker.active) { return; }
                
                if (marker.type === MarkerType.VideoMarker && marker.extraData) {
                    if (!marker.extraData?.source.url) {
                        return;
                    }
                    let videoMarker: IVideoData = {
                        type: MarkerType.VideoMarker,
                        position: marker.position,
                        rotation: marker.extraData.rotation,
                        source: marker.extraData.source,
                        scale: marker.extraData.scale,
                        visibleDistance: marker.visibleDistance,
                        fadeInDistance: marker.fadeInDistance,
                    }
                    data.markers.push(videoMarker);
                } else if (marker.type === MarkerType.PositionMarker) {

                    let renderMarker: IPositionMarker = {
                        position: marker.position,
                        icon: { icon: markerGroup.icon, color: markerGroup.color },
                        text: null,
                        type: MarkerType.PositionMarker,
                        markerMouseoverData: {
                            markerGroup: index,
                            markerIndex: markerIndex
                        }
                    }

                    if (this.render.showMarkerNames && marker.nameplate?.visible != false) {
                        renderMarker.text = {
                            backgroundColor: marker.nameplate?.plateColor ?? markerGroup.defaultNamePlate?.plateColor ?? "#000000",
                            text: marker.name,
                            borderColor: marker.nameplate?.borderColor ?? markerGroup.defaultNamePlate?.borderColor ?? "#ffffff",
                            textColor: marker.nameplate?.textColor ?? markerGroup.defaultNamePlate?.textColor ?? "#F00",
                            offset: {
                                X: 0,
                                Y: marker.nameplate?.offset ?? markerGroup.defaultNamePlate?.offset ?? 2,
                                Z: 0
                            },
                            showDistance: marker.nameplate?.viewDistance ?? markerGroup.defaultNamePlate?.viewDistance ?? this.render.markerNameViewDistance ?? 80
                        };
                    }
                    data.markers.push(renderMarker);
                }
            });

        });
        return data;
    }
}