import {A_Asset} from "../../../core-sdk/types";
import {A_Arc69_Metadata, A_Arc_Validation} from "../../types";
import {CoreAsset} from "../../../core-sdk/classes/CoreAsset";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";

export class ARC69 {
    assetInstance: CoreAsset

    constructor(asset: A_Asset) {
        this.assetInstance = new CoreAsset(asset);
    }

    hasValidUrl(): boolean {
        return this.assetInstance.hasHttpsUrl() || this.assetInstance.hasIpfsUrl();
    }

    async hasValidAssetMetadataHash(): Promise<boolean> {
        const metadataHash = this.assetInstance.getMetadataHash();

        if (!metadataHash) {
            return true;
        }

        //handle metadata hash
        return false;
    }

    async getMetaData(indexer: IndexerClient): Promise<A_Arc69_Metadata> {
        const assetId = this.assetInstance.getIndex();
        const {transactions} = await indexer.searchForTransactions().assetID(assetId).txType("acfg").do();
        transactions.sort((a, b) => b["round-time"] - a["round-time"]);

        for (const transaction of transactions) {
            try {
                const noteBase64 = transaction.note;
                const noteString = atob(noteBase64)
                    .trim()
                    .replace(/[^ -~]+/g, "");

                const arc69MetaData: A_Arc69_Metadata = JSON.parse(noteString);
                if (arc69MetaData.standard === "arc69") {
                    if (!arc69MetaData.description) {
                        arc69MetaData.description = '';
                    }
                    if (!arc69MetaData.external_url) {
                        arc69MetaData.external_url = '';
                    }
                    if (!arc69MetaData.properties) {
                        arc69MetaData.properties = {};
                    }
                    return arc69MetaData;
                }
            } catch (err) {

            }
        }
    }

    validateMetadata(metadata: A_Arc69_Metadata): A_Arc_Validation {
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

        const {standard, attributes} = metadata;
        if (standard !== 'arc69') {
            validation.valid = false;
            validation.errors.push('metadata standard should be arc69');
        }
        if (attributes) {
            validation.warnings.push('attributes is deprecated. New NFTs should define attributes with the simple `properties` object. Marketplaces should support both the `properties` object and the `attributes` array).');
        }

        return validation;
    }

    async validate(indexer: IndexerClient): Promise<A_Arc_Validation> {

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

        if (!await this.hasValidAssetMetadataHash()) {
            validation.valid = false;
            validation.errors.push("Asset Metadata Hash (am): SHA-256 digest of the full resolution media file as a 32-byte string");
            return validation;
        }

        const metadata = await this.getMetaData(indexer);

        const metadataValidation = this.validateMetadata(metadata);
        validation.warnings = [...validation.warnings, ...metadataValidation.warnings];

        if (!metadataValidation.valid) {
            validation.valid = false;
            validation.errors = [...validation.errors, ...metadataValidation.errors];
            return validation;
        }

        return validation;
    }

}