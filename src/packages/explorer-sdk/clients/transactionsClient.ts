import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {DAPPFLOW_EXPLORER_SEARCH_TRANSACTION} from "../types";


export class TransactionsClient {
    client: Algodv2;
    indexer: IndexerClient;

    constructor(client: Algodv2, indexer: IndexerClient) {
        this.client = client;
        this.indexer = indexer;
    }

    async get(): Promise<DAPPFLOW_EXPLORER_SEARCH_TRANSACTION[]> {
        const {transactions} = await this.indexer.searchForTransactions().do();
        return transactions;
    }
}