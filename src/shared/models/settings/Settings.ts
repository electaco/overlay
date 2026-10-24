import { IRuntimeSettings, ISettings } from "../../interfaces/settings";
import { IRenderSettings } from "../../interfaces/settings/IRenderSettings";
import { IRenderData } from "../../interfaces/render/renderdata";
import { IUpdateAvailable, MarkerGroupSettings } from "./MarkerGroupSettings";
import { RenderSettings } from "./RenderSettings";
import { deserialize, Type } from 'class-transformer';
import { IPositionMarker, MarkerType } from "../../interfaces/render/marker";
import { IVideoData } from "../../interfaces/datatransfer/IVideoData";
import { IOverlaySettings } from "../../interfaces/settings/IOverlaySettings";
import { OverlaySettings } from "./OverlaySettings";
import fetch from 'cross-fetch'

const fs = require('fs');

export class Settings implements ISettings {
    @Type(() => RenderSettings)
    render: IRenderSettings = new RenderSettings();

    @Type(() => MarkerGroupSettings)
    marks: Array<MarkerGroupSettings> = new Array<MarkerGroupSettings>();

    @Type(() => OverlaySettings)
    overlaySettings: IOverlaySettings = new OverlaySettings();

    configFile: string;

    runtimeData: IRuntimeSettings = {map: null};

    constructor(configFile: string) {
        this.configFile = configFile?.trim();
    }

    private get backupFile() {
        return this.configFile + ".bak";
    }

    saveConfig() {
        const json = JSON.stringify({
            render: this.render,
            marks: this.marks,
            overlaySettings: this.overlaySettings
        });

        // Write to a temp file and rename over the target: a kill mid-write then leaves the
        // previous file intact instead of a truncated one, and readers never see a partial
        // file. (rename is atomic on the same filesystem, and both paths are in userData.)
        const tmpFile = this.configFile + ".tmp";
        fs.writeFileSync(tmpFile, json);
        try {
            fs.renameSync(tmpFile, this.configFile);
        } catch (e) {
            // Some filesystems refuse to rename over an existing file; fall back to a
            // direct write so saving still works.
            fs.writeFileSync(this.configFile, json);
            try { fs.unlinkSync(tmpFile); } catch { /* ignore */ }
        }

        // Keep the previous contents as a one-step undo. Only retained when it actually
        // holds marker groups, so an empty-state save can never overwrite the last good
        // backup with emptiness.
        if (this.marks && this.marks.length > 0) {
            try {
                fs.copyFileSync(this.configFile, this.backupFile);
            } catch { /* best-effort */ }
        }
    }

    static loadConfig(filename: string): Settings {
        // Prefer the main file; fall back to the last good backup if it is missing or
        // unreadable, so a bad write cannot silently wipe the marker groups.
        const candidates = [filename, filename + ".bak"];
        for (const file of candidates) {
            if (!fs.existsSync(file)) { continue; }
            try {
                const data = fs.readFileSync(file);
                const instance = deserialize(Settings, data);
                instance.configFile = filename;
                if (file !== filename) {
                    console.log("Settings file unreadable, restored from " + file);
                }
                return instance;
            } catch (e) {
                console.log("Could not load settings from " + file + ": " + e);
            }
        }

        return new Settings(filename);
    }

    setMap(mapId: string) {
        this.runtimeData.map = mapId;
    }

    getMarkerGroupIndexById(id: string): number | null {
        let markid = this.marks.findIndex(m => m.id === id);
        if (markid === -1) {
            return null;
        }
        return markid;
    }

    addMarkerGroup(markerGroup: MarkerGroupSettings, forceReplace: boolean = false): boolean {
        var existing = this.getMarkerGroupIndexById(markerGroup.id);
        if ( existing !== null) {
            if (forceReplace) {
                this.removeMarkerGroup(existing);
            } else {
                return false;
            }
        }
        this.marks.push(markerGroup);
        return true;
    }

    removeMarkerGroup(index: number): void {
        this.marks.splice(index, 1);
    }

    getMarkerGroup(index: number): MarkerGroupSettings {
        return this.marks[index];
    }

    getMarkerGroupById(id: string): MarkerGroupSettings | null {
        let markid = this.marks.findIndex(m => m.id === id);
        if (markid === -1) {
            return null;
        }
        return this.marks[markid];
    }

    async CheckForMarkerUpdates() {
        console.log("Checking for marker updates");
        const asyncRes = await Promise.allSettled(this.marks.map(async (markerGroup) => { return await markerGroup.CheckForUpdates(); }));
        (asyncRes.filter(res => res.status === 'fulfilled') as PromiseFulfilledResult<IUpdateAvailable>[]).map(res => res.value).forEach(async res => {
            if (res.updateAvailable && res.url) {
                try {
                    var response = await fetch(res.url);
                } catch (e) {
                    console.log("Error fetching marker update! "+ e);
                    return;
                }
                if (!response?.ok) {
                    console.log("Failed to fetch update for " + res.markerid + " at " + res.url);
                    const message = `An error has occured: ${response?.status}`;
                    throw new Error(message);
                }
                var json = MarkerGroupSettings.fromJson(await response.text());
                this.addMarkerGroup(json, true);  
                console.log("Updated marker " + res.markerid);
            }
        });
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
                            description: marker.description,
                            group: markerGroup.name,
                            borderColor: marker.nameplate?.borderColor ?? markerGroup.defaultNamePlate?.borderColor ?? "#000000",
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