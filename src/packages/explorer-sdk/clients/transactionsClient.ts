import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../../core-sdk/network";
import {A_SearchTransaction} from "../../core-sdk/types";


export class TransactionsClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(): Promise<A_SearchTransaction[]> {
        const {transactions} = await this.indexer.searchForTransactions().do();
        return transactions;
    }
}