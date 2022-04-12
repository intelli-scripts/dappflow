import { Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_Asset
} from "../types";
import {Network} from "../network";


export class AssetClient{
    client: Algodv2;
    indexer: IndexerClient;
    network: Network

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(id: number): Promise<A_Asset>{
        const asset = await this.client.getAssetByID(id).do();
        return asset as A_Asset;
    }

    getTotalSupply(asset: A_Asset): number {
        return (asset.params.total / Math.pow(10, asset.params.decimals));
    }

    hasManager(asset: A_Asset): boolean {
        return Boolean(asset.params.manager);
    }

    hasFreeze(asset: A_Asset): boolean {
        return Boolean(asset.params.freeze);
    }

    hasClawback(asset: A_Asset): boolean {
        return Boolean(asset.params.clawback);
    }
}