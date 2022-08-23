import {A_Asset} from "../../core-sdk/types";
import {A_Arc3_Metadata, A_Arc3_Validation} from "../types";
import {IPFS_GATEWAY} from "../utils";
import axios, {AxiosResponse} from "axios";
import { sha256 } from 'js-sha256'
import {CoreAsset} from "../../core-sdk/classes/CoreAsset";

export class ARC3 {
    asset: A_Asset;
    metadata: A_Arc3_Metadata

    constructor(asset: A_Asset) {
        this.asset = asset;
    }

    getMetadata(): A_Arc3_Metadata {
        return this.metadata;
    }

    setMetadata(metadata: A_Arc3_Metadata) {
        this.metadata = metadata;
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

    hasValidMetadataHash(): boolean {
        const metadataHash = this.asset.params["metadata-hash"];

        const hash = sha256.create();
        hash.update(JSON.stringify(this.getMetadata()));
        const digest = new Uint8Array(hash.digest());
        const expectedMetadataHash = Buffer.from(digest).toString("base64");

        return  expectedMetadataHash === metadataHash;
    }

    hasValidMetadataContent(): {valid: boolean, message: string} {
        const validation = {
            valid: true,
            message: ""
        };

        const metadata = this.getMetadata();
        const assetInstance = new CoreAsset(this.asset);
        const {decimals, name, unitName, image, animation_url, external_url, image_integrity, image_mimetype, animation_url_integrity, animation_url_mimetype} = metadata;

        if (decimals !== undefined && decimals !== assetInstance.getDecimals()) {
            validation.valid = false;
            validation.message = "Decimals in metadata JSON did not match with the asset decimals";
        }
        else if (name && name !== assetInstance.getName()) {
            validation.valid = false;
            validation.message = "Name in metadata JSON did not match with the asset name";
        }
        else if (unitName && unitName !== assetInstance.getUnitName()) {
            validation.valid = false;
            validation.message = "Unitname in metadata JSON did not match with the asset unitname";
        }
        else if (!image && !animation_url && !external_url) {
            validation.valid = false;
            validation.message = "Atleast one of the URI fields (image, external_url, animation_url) should be defined in the metadata";
        }
        else if (image && !image_integrity) {
            validation.valid = false;
            validation.message = "image is provided but image_integrity is not provided";
        }
        else if (image && !image_mimetype) {
            validation.valid = false;
            validation.message = "image is provided but image_mimetype is not provided";
        }
        else if (animation_url && !animation_url_integrity) {
            validation.valid = false;
            validation.message = "animation_url is provided but animation_url_integrity is not provided";
        }
        else if (animation_url && !animation_url_mimetype) {
            validation.valid = false;
            validation.message = "animation_url is provided but animation_url_mimetype is not provided";
        }

        return validation;
    }

    getAssetWebUrl(): string {

        const {url} = this.asset.params;

        if (this.isIpfs()) {
            const chunks = url.split("://");
            return IPFS_GATEWAY + "/" + chunks[1];
        }

        return url
    }

    async validate(): Promise<A_Arc3_Validation> {

        const validation: A_Arc3_Validation = {
            validJsonMetadata: false,
            validMetadataHash: false,
            validJsonMetadataContent: false,
            validName: false,
            valid: false,
            errors: []
        };

        const validUrl = this.hasValidUrl();
        if (!validUrl) {
            validation.errors.push("Invalid url: Only https or ipfs are valid");
            return validation;
        }

        validation.validName = this.hasValidName();
        if (!validation.validName) {
            validation.errors.push(`Asset Name (an): MUST be:
             (NOT RECOMMENDED) either exactly arc3 (without any space)
             (NOT RECOMMENDED) or <name>@arc3, where <name> SHOULD be closely related to the name in the JSON Metadata file:
             If the resulting asset name can fit the Asset Name field, then <name> SHOULD be equal to the name in the JSON Metadata file.
             If the resulting asset name cannot fit the Asset Name field, then <name> SHOULD be a reasonable shorten version of the name in the JSON Metadata file.
             (RECOMMENDED) or <name> where <name> is defined as above. In this case, the Asset URL MUST ends with #arc3.
            `);
            return validation;
        }

        try {
            const webUrl = this.getAssetWebUrl();
            const response: AxiosResponse = await axios.get(webUrl);
            if (response.headers["content-type"] === "application/json") {
                validation.validJsonMetadata = true;
                validation.metadata = response.data;
                this.setMetadata(response.data);
            }
        }
        catch (e) {}

        if (!validation.validJsonMetadata) {
            validation.errors.push("JSON metadata provided is invalid");
            return validation;
        }

        validation.validMetadataHash = this.hasValidMetadataHash();

        if (!validation.validMetadataHash) {

            validation.errors.push(`Asset Metadata Hash (am):
If the JSON Metadata file specifies extra metadata e (property extra_metadata), then am is defined as:

am = SHA-512/256("arc0003/am" || SHA-512/256("arc0003/amj" || content of JSON Metadata file) || e)
where || denotes concatenation and SHA-512/256 is defined in NIST FIPS 180-4. The above definition of am MUST be used when the property extra_metadata is specified, even if its value e is the empty string. Python code to compute the hash and a full example are provided below (see "Sample with Extra Metadata").

Extra metadata can be used to store data about the asset that needs to be accessed from a smart contract. The smart contract would not be able to directly read the metadata. But, if provided with the hash of the JSON Metadata file and with the extra metadata e, the smart contract can check that e is indeed valid.

If the JSON Metadata file does not specify the property extra_metadata, then am is defined as the SHA-256 digest of the JSON Metadata file as a 32-byte string (as defined in NIST FIPS 180-4)

`);
            return validation;
        }

        const contentValidation = this.hasValidMetadataContent();
        validation.validJsonMetadataContent = contentValidation.valid;

        if (!validation.validJsonMetadataContent) {
            validation.errors.push(contentValidation.message);
            return validation;
        }

        validation.valid = true;
        return validation;
    }

}