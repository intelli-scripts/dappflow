import {
    A_Asset
} from "../types";


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