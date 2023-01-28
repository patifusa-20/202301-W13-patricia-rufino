import { GenericStructure } from "../types/generic.type.ts";

export class GenericModel implements GenericStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ("000000" + aNumbers[0]).slice(-6);
    }
    id: string;
    isSelected: boolean;
    constructor(public name: string, public icon: string) {
        this.id = GenericModel.generateId();
        this.isSelected = false;
    }
}
