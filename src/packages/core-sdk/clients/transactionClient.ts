import {Algodv2, SuggestedParams} from "algosdk";
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
        const {transactions} = await this.indexer.searchForTransactions().txid(id).do();
        return transactions[0];
    }

    async getSuggestedParams(): Promise<SuggestedParams>{
        const sp = await this.client.getTransactionParams().do();
        return sp;
    }

    async send(txns: Uint8Array | Uint8Array[]): Promise<any> {
        return await this.client.sendRawTransaction(txns).do();
    }
}