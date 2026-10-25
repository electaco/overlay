import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';
import { ISettings } from '../../shared/interfaces/settings';

interface IProps {
    settings: ISettings;
    packId: string;
    // Set to target one marker; otherwise the pack.
    markerId?: string;
}

// Makes this pack (its nearest drawn marker, or the current one of a sequential pack) or this
// marker the HUD arrow's target; pressing it again clears the target, which hides the arrow.
function ArrowTargetButton(props: IProps) {
    const target = props.settings.render?.arrowTarget;
    const active = !!target && target.packId === props.packId && (target.markerId ?? null) === (props.markerId ?? null);

    function toggle() {
        if (active) {
            send(IPC.Settings.Update, { path: "render.arrowTarget", value: null });
            return;
        }
        send(IPC.Settings.Update, { path: "render.arrowTarget", value: { packId: props.packId, markerId: props.markerId } });
        send(IPC.Settings.Update, { path: "render.showArrow", value: true });
    }

    const what = props.markerId ? "this marker" : "this pack's nearest marker";
    return (
        <span className={"button arrowtarget" + (active ? " active" : "")} onClick={toggle}
            title={active ? "The arrow points at " + what + ". Click to hide the arrow." : "Point the arrow at " + what}>
            <FontAwesomeIcon icon={faCrosshairs} style={{ width: "1em" }} />
        </span>
    );
}

export default ArrowTargetButton;
