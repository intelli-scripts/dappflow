import { Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_Asset, A_SearchTransaction
} from "../types";
import {Network} from "../network";


export type A_AssetTransactionsResponse = {
    'next-token': string,
    transactions: A_SearchTransaction[]
};

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

    async getAssets(): Promise<A_Asset[]> {
        const {assets} = await this.indexer.searchForAssets().do();
        return assets;
    }

    async getAssetTransactions(id: number, token?: string): Promise<A_AssetTransactionsResponse> {
        const req = this.indexer.searchForTransactions().assetID(id);
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_AssetTransactionsResponse;
    }
}