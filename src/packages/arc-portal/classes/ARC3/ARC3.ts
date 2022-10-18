import {A_Asset} from "../../../core-sdk/types";
import {A_Arc3_Metadata, A_Arc_Validation} from "../../types";
import axios, {AxiosResponse} from "axios";
import { sha256 } from 'js-sha256'
import {CoreAsset} from "../../../core-sdk/classes/core/CoreAsset";

export class ARC3 {
    assetInstance: CoreAsset

    constructor(asset: A_Asset) {
        this.assetInstance = new CoreAsset(asset);
    }

    hasValidUrl(): boolean {
        return this.assetInstance.hasHttpsUrl() || this.assetInstance.hasIpfsUrl();
    }

    hasValidName(): boolean {
        const url = this.assetInstance.getUrl();
        const name = this.assetInstance.getName();

        const validUrl = this.hasValidUrl();

        const matchedName = name === 'arc3';
        const matchedNameUsingLength = name && name.slice(name.length - 5) === '@arc3';
        const matchedNameUsingUrl = validUrl && url.slice(url.length - 5) === '#arc3';

        return matchedName || matchedNameUsingLength || matchedNameUsingUrl;
    }

    hasValidAssetMetadataHash(raw: any): boolean {
        const metadataHash = this.assetInstance.getMetadataHash();

        if (!metadataHash) {
            return false;
        }

        const expectedMetadataHash = Buffer.from(new Uint8Array(sha256.digest(raw))).toString("base64");

        return  expectedMetadataHash === metadataHash;
    }

    async getMetadata(): Promise<{ data: A_Arc3_Metadata; raw: any }> {
        let raw;
        const webUrl = this.assetInstance.getResolvedUrl();

        try {
            const response: AxiosResponse = await axios.get(webUrl, {transformResponse: (r) => {
                    raw = r;
                    return axios.defaults.transformResponse[0](r)
                }
            });

            return {
                raw,
                data: response.data
            };
        }
        catch (e) {
        }

    }

    validateMetadata(metadata: A_Arc3_Metadata): A_Arc_Validation {
        const validation: A_Arc_Validation = {
            valid: true,
            errors: [],
            warnings: []
        };

        if (!metadata) {
            validation.valid = false;
            validation.errors.push('metadata is invalid');
            return validation;
        }

        const {decimals, image, animation_url, external_url, image_mimetype, animation_url_mimetype} = metadata;

        if (decimals !== undefined && decimals !== this.assetInstance.getDecimals()) {
            validation.valid = false;
            validation.errors.push("Decimals in metadata JSON did not match with the asset decimals");
        }
        else if (!image && !animation_url && !external_url) {
            validation.valid = false;
            validation.errors.push("Atleast one of the URI fields (image, external_url, animation_url) should be defined in the metadata");
        }
        // else if (image && !image_integrity) {
        //     validation.valid = false;
        //     validation.errors.push("image is provided but image_integrity is not provided");
        // }
        else if (image && !image_mimetype) {
            validation.warnings.push("image is provided but image_mimetype is not provided");
        }
        // else if (animation_url && !animation_url_integrity) {
        //     validation.valid = false;
        //     validation.errors.push("animation_url is provided but animation_url_integrity is not provided");
        // }
        else if (animation_url && !animation_url_mimetype) {
            validation.warnings.push("animation_url is provided but animation_url_mimetype is not provided");
        }

        return validation;
    }



    async validate(): Promise<A_Arc_Validation> {

        const validation: A_Arc_Validation = {
            valid: true,
            errors: [],
            warnings: []
        };

        if (!this.hasValidUrl()) {
            validation.valid = false;
            validation.errors.push("Invalid url: Only https or ipfs are valid");
            return validation;
        }

        if (!this.hasValidName()) {
            validation.valid = false;
            validation.errors.push(`Asset Name (an): MUST be:
             (NOT RECOMMENDED) either exactly arc3 (without any space)
             (NOT RECOMMENDED) or <name>@arc3, where <name> SHOULD be closely related to the name in the JSON Metadata file:
             If the resulting asset name can fit the Asset Name field, then <name> SHOULD be equal to the name in the JSON Metadata file.
             If the resulting asset name cannot fit the Asset Name field, then <name> SHOULD be a reasonable shorten version of the name in the JSON Metadata file.
             (RECOMMENDED) or <name> where <name> is defined as above. In this case, the Asset URL MUST ends with #arc3.
            `);
            return validation;
        }

        const metadata = await this.getMetadata();

        if (!metadata) {
            validation.valid = false;
            validation.errors.push('metadata provided in the url is invalid.');
            return validation;
        }

        if (!this.hasValidAssetMetadataHash(metadata.raw)) {
            validation.valid = false;
            validation.errors.push(`Asset Metadata Hash (am):
If the JSON Metadata file specifies extra metadata e (property extra_metadata), then am is defined as:

am = SHA-512/256("arc0003/am" || SHA-512/256("arc0003/amj" || content of JSON Metadata file) || e)
where || denotes concatenation and SHA-512/256 is defined in NIST FIPS 180-4. The above definition of am MUST be used when the property extra_metadata is specified, even if its value e is the empty string. Python code to compute the hash and a full example are provided below (see "Sample with Extra Metadata").

Extra metadata can be used to store data about the asset that needs to be accessed from a smart contract. The smart contract would not be able to directly read the metadata. But, if provided with the hash of the JSON Metadata file and with the extra metadata e, the smart contract can check that e is indeed valid.

If the JSON Metadata file does not specify the property extra_metadata, then am is defined as the SHA-256 digest of the JSON Metadata file as a 32-byte string (as defined in NIST FIPS 180-4)

`);
            return validation;
        }

        const metadataValidation = this.validateMetadata(metadata.data);
        validation.warnings = [...validation.warnings, ...metadataValidation.warnings];

        if (!metadataValidation.valid) {
            validation.valid = false;
            validation.errors = [...validation.errors, ...metadataValidation.errors];
            return validation;
        }

        return validation;
    }

}