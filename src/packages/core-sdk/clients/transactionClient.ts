import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_SearchTransaction} from "../types";


export type A_TransactionsResponse = {
    'next-token': string,
    transactions: A_SearchTransaction[]
};

export class TransactionClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async getTransactions(token?: string): Promise<A_TransactionsResponse> {
        const req = this.indexer.searchForTransactions();
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_TransactionsResponse;
    }

    async get(id: string): Promise<A_SearchTransaction> {
        const {transaction} = await this.indexer.lookupTransactionByID(id).do();
        return transaction as A_SearchTransaction;
    }
}