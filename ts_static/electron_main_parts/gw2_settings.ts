import * as fs from "fs";
import * as path from "path";

// GW2's "Use DPI scaling" option (GFXSettings.Gw2-64.exe.xml in the game's AppData folder). With
// it on, the game scales its UI, the map included, by Windows' display scale; the overlay's map
// layer has to do the same to line up. Unknown (no file, other build) counts as on, the game's
// usual setting.
export function GameUsesDpiScaling(): boolean {
    try {
        const file = path.join(process.env.APPDATA ?? "", "Guild Wars 2", "GFXSettings.Gw2-64.exe.xml");
        const option = /<OPTION\s+Name="dpiScaling"[^>]*Value="(\w+)"/i.exec(fs.readFileSync(file, "utf-8"));
        return option ? option[1].toLowerCase() !== "false" : true;
    } catch {
        return true;
    }
}
