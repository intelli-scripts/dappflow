import {A_Arc16_Metadata} from "../../types";

export class ARC16 {
    metadata: A_Arc16_Metadata

    constructor(metadata: A_Arc16_Metadata) {
        this.metadata = metadata;
    }

    hasTraits(): boolean {
        if (this.metadata) {
            const {properties} = this.metadata;
            if (properties) {
                const {traits} = properties;
                if (traits) {
                    return true;
                }
            }
        }

        return false;
    }

}