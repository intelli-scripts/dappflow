import {A_Arc3_Metadata} from "../../types";
import {IPFS_GATEWAY} from "../../utils";

export class ARC3Metadata {
    metadata: A_Arc3_Metadata

    constructor(metadata: A_Arc3_Metadata) {
        this.metadata = metadata;
    }

    getMediaUrlProtocol(): string {
        const {image} = this.metadata;
        if (!image) {
            return '';
        }

        const chunks = image.split("://");
        if (chunks.length > 0) {
            return chunks[0];
        }

        return '';
    }

    isHttps(): boolean {
        return this.getMediaUrlProtocol() === 'https';
    }

    isIpfs(): boolean {
        return this.getMediaUrlProtocol() === 'ipfs';
    }

    hasValidUrl(): boolean {
        return this.isHttps() || this.isIpfs();
    }

    getMediaWebUrl(): string {

        const {image} = this.metadata;

        if (this.isIpfs()) {
            const chunks = image.split("://");
            return IPFS_GATEWAY + "/" + chunks[1];
        }

        return image;
    }

}