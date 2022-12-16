import { Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_Asset
} from "../types";
import {Network} from "../network";
import {A_TransactionsResponse} from "./transactionClient";


export type A_AssetTransactionsResponse = A_TransactionsResponse;

export type A_AssetsResponse = {
    'next-token': string,
    assets: A_Asset[]
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

    async getAssets(token?: string): Promise<A_AssetsResponse> {

        const req = this.indexer.searchForAssets();
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_AssetsResponse;
    }

    async getAssetTransactions(id: number, token?: string): Promise<A_AssetTransactionsResponse> {
        const req = this.indexer.searchForTransactions().assetID(id);
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_AssetTransactionsResponse;
    }

    async searchForAssetsByName(searchText: string): Promise<A_Asset> {
        return await this.indexer.searchForAssets().name(searchText).do() as A_Asset;
    }

    async searchForAssetsByIndex(id: number): Promise<A_Asset> {
        return  await this.indexer.searchForAssets().index(id).do() as A_Asset;
    }


}