import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_SearchTransaction} from "../types";


export class TransactionClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async getTransactions(): Promise<A_SearchTransaction[]> {
        const {transactions} = await this.indexer.searchForTransactions().do();
        return transactions;
    }

    async get(id: string): Promise<A_SearchTransaction> {
        const {transactions} = await this.indexer.searchForTransactions().txid(id).do();
        return transactions[0];
    }
}