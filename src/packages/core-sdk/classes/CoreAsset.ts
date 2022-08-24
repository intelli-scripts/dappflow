import {
    A_Asset
} from "../types";
import {IPFS_GATEWAY} from "../../arc-portal/utils";


export class CoreAsset {
    asset: A_Asset;

    constructor(asset: A_Asset) {
        if (!asset) {
            throw new Error("Invalid asset");
        }
        this.asset = asset;
    }

    get(): A_Asset{
        return this.asset;
    }

    hasManager(): boolean {
        return Boolean(this.asset.params.manager);
    }

    hasReserve(): boolean {
        return Boolean(this.asset.params.reserve);
    }

    hasFreeze(): boolean {
        return Boolean(this.asset.params.freeze);
    }

    hasClawback(): boolean {
        return Boolean(this.asset.params.clawback);
    }

    getManager(): string {
        return this.asset.params.manager;
    }

    getReserve(): string {
        return this.asset.params.reserve;
    }

    getFreeze(): string {
        return this.asset.params.freeze;
    }

    getClawback(): string {
        return this.asset.params.clawback;
    }

    getIndex(): number {
        return this.asset.index;
    }

    getName(): string {
        return this.asset.params.name;
    }

    getUnitName(): string {
        return this.asset.params["unit-name"];
    }

    getDecimals(): number {
        return this.asset.params.decimals;
    }

    getTotal(): number {
        return this.asset.params.total;
    }

    getTotalSupply(): number {
        return (this.getTotal() / Math.pow(10, this.getDecimals()));
    }

    getAmountInDecimals(amount: number): number {
        return (amount / Math.pow(10, this.getDecimals()));
    }

    getCreator(): string {
        return this.asset.params.creator;
    }

    getDefaultFrozen(): boolean {
        return this.asset.params["default-frozen"];
    }

    getUrl(): string {
        return this.asset.params.url;
    }

    getMetadataHash(): string {
        return this.asset.params["metadata-hash"];
    }

    getUrlProtocol(): string {
        const url = this.getUrl();

        if (!url) {
            return '';
        }

        const chunks = url.split("://");
        if (chunks.length > 0) {
            return chunks[0];
        }

        return '';
    }

    hasHttpsUrl(): boolean {
        return this.getUrlProtocol() === 'https';
    }

    hasIpfsUrl(): boolean {
        return this.getUrlProtocol() === 'ipfs';
    }

    getResolvedUrl(ipfsGateway: string = IPFS_GATEWAY): string {
        const url = this.getUrl();

        if (this.hasIpfsUrl()) {
            const chunks = url.split("://");
            return IPFS_GATEWAY + "/" + chunks[1];
        }

        return url
    }

    isArc3(): boolean {
        const name = this.asset.params.name;
        const url = this.asset.params.url;

        if (name === 'arc3') {
            return true;
        }
        if (name && name.slice(name.length - 5) === '@arc3') {
            return true;
        }
        if (url && url.slice(url.length - 5) === '#arc3') {
            return true;
        }

        return false;
    }
}