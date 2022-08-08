import {A_Asset} from "../../core-sdk/types";
import {A_Arc_Validation} from "../types";
import {IPFS_GATEWAY} from "../utils";
import axios, {AxiosResponse} from "axios";

export class ARC3 {
    asset: A_Asset;

    constructor(asset: A_Asset) {
        this.asset = asset;
    }

    getUrlProtocol(): string {
        const {url} = this.asset.params;
        if (!url) {
            return '';
        }

        const chunks = url.split("://");
        if (chunks.length > 0) {
            return chunks[0];
        }

        return '';
    }

    isHttps(): boolean {
        return this.getUrlProtocol() === 'https';
    }

    isIpfs(): boolean {
        return this.getUrlProtocol() === 'ipfs';
    }

    hasValidUrl(): boolean {
        return this.isHttps() || this.isIpfs();
    }

    getWebUrl(): string {

        const {url} = this.asset.params;

        if (this.isIpfs()) {
            const chunks = url.split("://");
            return IPFS_GATEWAY + "/" + chunks[1];
        }

        return url
    }

    async validate(): Promise<A_Arc_Validation> {
        const asset = this.asset;

        const validation: A_Arc_Validation = {
            valid: false,
            suggestions: [],
            errors: []
        };

        const {name, url} = asset.params;

        const matchedName = name === 'arc3';
        const matchedNameUsingLength = name && name.slice(name.length - 5) === '@arc3';
        const matchedNameUsingUrl = url && url.slice(url.length - 5) === '#arc3';

        const nameMatched = matchedName || matchedNameUsingLength || matchedNameUsingUrl;
        const urlMatched = this.hasValidUrl();
        let validUrlContent = false;

        if (urlMatched) {
            const webUrl = this.getWebUrl();
            const response: AxiosResponse = await axios.get(webUrl);
            if (response.headers["content-type"] === "application/json") {
                validUrlContent = true;
            }
        }

        return validation;
    }

}