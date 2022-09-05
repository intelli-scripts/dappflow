import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_Block} from "../types";


export class BlockClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(id: number): Promise<A_Block> {
        const response = await this.indexer.lookupBlock(id).do();
        return response as A_Block;
    }

    async statusAfterBlock(round: number): Promise<A_Block> {
        const response = await this.client.statusAfterBlock(round).do();
        console.log(response);
        return response as A_Block;
    }
}