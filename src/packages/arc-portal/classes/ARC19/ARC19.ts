import {A_Asset} from "../../../core-sdk/types";
import {A_Arc_Validation} from "../../types";
import {CoreAsset} from "../../../core-sdk/classes/CoreAsset";
import {decodeAddress} from "algosdk";
import { CID } from 'multiformats/cid'
import * as mfsha2 from 'multiformats/hashes/sha2'
import * as digest from 'multiformats/hashes/digest'
import { CIDVersion } from 'multiformats/types/src/cid'
import {IPFS_GATEWAY} from "../../utils";
import axios, {AxiosResponse} from "axios";

export class ARC19 {
    assetInstance: CoreAsset

    constructor(asset: A_Asset) {
        this.assetInstance = new CoreAsset(asset);
    }

    hasValidUrl(): boolean {
        const url = this.assetInstance.getUrl();

        if (!url) {
            return false;
        }

        const protocol = this.assetInstance.getUrlProtocol();
        if (protocol !== 'template-ipfs') {
            return false;
        }

        const chunks = url.split('://');
        if (chunks.length < 1) {
            return false;
        }
        if (!chunks[1].startsWith('{ipfscid:')) {
            return false;
        }

        const cidComponents = chunks[1].split(':');

        if (cidComponents.length !== 5) {
            return false
        }

        const [, , cidCodec, asaField, cidHash] = cidComponents;

        if (cidHash.split('}')[0] !== 'sha2-256') {
            return false;
        }
        if (cidCodec !== 'raw' && cidCodec !== 'dag-pb') {
            return false;
        }
        if (asaField !== 'reserve') {
            return false;
        }

        return true;
    }

    getMetadataUrl(): string {
        const reserve = this.assetInstance.getReserve();
        const url = this.assetInstance.getUrl();

        if (!reserve) {
            return '';
        }

        const chunks = url.split('://');
        const cidComponents = chunks[1].split(':');
        const [, cidVersion, cidCodec] = cidComponents;

        let cidCodecCode
        if (cidCodec === 'raw') {
            cidCodecCode = 0x55
        } else if (cidCodec === 'dag-pb') {
            cidCodecCode = 0x70
        }

        const address = decodeAddress(reserve);
        const mhdigest = digest.create(mfsha2.sha256.code, address.publicKey);
        const cid = CID.create(parseInt(cidVersion) as CIDVersion, cidCodecCode, mhdigest);

        return IPFS_GATEWAY + '/' + cid.toString() + '/' + chunks[1].split('/').slice(1).join('/');
    }

    async getMetadata() {
        if (this.hasValidUrl()) {
            const url = this.getMetadataUrl();
            try {
                const response: AxiosResponse = await axios.get(url);
                return response.data;
            }
            catch (e) {

            }
        }
    }

    async validate(): Promise<A_Arc_Validation> {

        const validation: A_Arc_Validation = {
            valid: true,
            errors: [],
            warnings: []
        };

        if (!this.hasValidUrl()) {
            validation.valid = false;
            validation.errors.push(`Url must be of form 
template-ipfs://{ipfscid:<version>:<multicodec>:<field name containing 32-byte digest, ie reserve>:<hash type>}[/...]`);
            return validation;
        }


        return validation;
    }

}