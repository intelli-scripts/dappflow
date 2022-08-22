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

    hasValidName(): boolean {
        const {name, url} = this.asset.params;
        const validUrl = this.hasValidUrl();

        const matchedName = name === 'arc3';
        const matchedNameUsingLength = name && name.slice(name.length - 5) === '@arc3';
        const matchedNameUsingUrl = validUrl && url.slice(url.length - 5) === '#arc3';

        return matchedName || matchedNameUsingLength || matchedNameUsingUrl;
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

        const validation: A_Arc_Validation = {
            valid: false,
            errors: []
        };

        const validUrl = this.hasValidUrl();
        if (!validUrl) {
            validation.errors.push("Invalid url: Only https or ipfs are valid");
            return validation;
        }

        const validName = this.hasValidName();
        if (!validName) {
            validation.errors.push(`Asset Name (an): MUST be:
             (NOT RECOMMENDED) either exactly arc3 (without any space)
             (NOT RECOMMENDED) or <name>@arc3, where <name> SHOULD be closely related to the name in the JSON Metadata file:
             If the resulting asset name can fit the Asset Name field, then <name> SHOULD be equal to the name in the JSON Metadata file.
             If the resulting asset name cannot fit the Asset Name field, then <name> SHOULD be a reasonable shorten version of the name in the JSON Metadata file.
             (RECOMMENDED) or <name> where <name> is defined as above. In this case, the Asset URL MUST ends with #arc3.
            `);
            return validation;
        }

        let validJsonMetadata = false;

        try {
            const webUrl = this.getWebUrl();
            const response: AxiosResponse = await axios.get(webUrl);
            if (response.headers["content-type"] === "application/json") {
                validJsonMetadata = true;
            }
        }
        catch (e) {}

        if (!validJsonMetadata) {
            validation.errors.push("JSON metadata provided is invalid");
            return validation;
        }

        validation.valid = true;
        return validation;
    }

}