import { INamePlateSetting } from "../../interfaces/settings/INamePlateSetting";

export class NamePlateSetting implements INamePlateSetting {
    offset: number | null = null;
    visible: boolean = true;
    borderColor: string | null = null;
    plateColor: string | null = null;
    textColor: string | null = null;
    viewDistance: number | null = null;
}