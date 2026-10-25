import React from 'react';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';
import { IMarkerGroupSettings } from '../../shared/interfaces/settings/IMarkerGroupSettings';
import { AutoHideOptions, ReappearMode } from '../../shared/models/settings/MarkerPrefs';
import { NumberEditor } from '../settings/NumberEditor';

interface IProps {
    pack: IMarkerGroupSettings;
    path: string;
}

const REAPPEAR: { mode: ReappearMode; label: string }[] = [
    { mode: "manual", label: "only when I show them" },
    { mode: "after", label: "after a while" },
    { mode: "daily", label: "at daily reset (00:00 UTC)" },
    { mode: "weekly", label: "at weekly reset (Mon 07:30 UTC)" },
];

// Pack behaviour options. They are part of the pack data (so a pack author can ship them) and
// apply to everyone using the pack.
function PackOptions(props: IProps) {
    const auto = AutoHideOptions(props.pack);
    const set = (key: string, value: unknown) => send(IPC.Settings.Update, { path: props.path + "autoHide." + key, value });

    return (
        <div className="packoptions">
            <label className="d-block">
                <input type="checkbox" checked={auto.enabled} onChange={(e) => set("enabled", e.target.checked)} />{" "}
                Auto-hide markers I've been to
            </label>
            {auto.enabled && (
                <div className="ml-4">
                    <div>
                        When within <NumberEditor path={props.path + "autoHide.distance"} value={auto.distance} min={1} max={200} step={1} /> m
                        for <NumberEditor path={props.path + "autoHide.seconds"} value={auto.seconds} min={0} max={600} step={1} /> s
                    </div>
                    <div>
                        Show again{" "}
                        <select value={auto.reappear} onChange={(e) => set("reappear", e.target.value)}>
                            {REAPPEAR.map((r) => <option key={r.mode} value={r.mode}>{r.label}</option>)}
                        </select>
                        {auto.reappear === "after" && (
                            <span> of <NumberEditor path={props.path + "autoHide.afterMinutes"} value={auto.afterMinutes} min={1} max={60 * 24 * 30} step={5} /> minutes</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PackOptions;
