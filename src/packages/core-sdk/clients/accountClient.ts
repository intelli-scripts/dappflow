import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_AccountInformation,
    A_SearchAccount, A_SearchTransaction
} from "../types";
import {Network} from "../network";

export type A_AccountsResponse = {
    'next-token': string,
    accounts: A_SearchAccount[]
};

export type A_AccountTransactionsResponse = {
    'next-token': string,
    transactions: A_SearchTransaction[]
};

export class AccountClient{
    client: Algodv2;
    indexer: IndexerClient;
    network: Network

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async getAccountInformation(address: string): Promise<A_AccountInformation> {
        const accountInformation = await this.client.accountInformation(address).do() as A_AccountInformation;
        return accountInformation;
    }

    async getAccounts(token?: string): Promise<A_AccountsResponse> {
        const req = this.indexer.searchAccounts();
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_AccountsResponse;
    }

    async getAccountTransactions(address: string, token?: string): Promise<A_AccountTransactionsResponse> {
        const req = this.indexer.searchForTransactions().address(address);
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_AccountTransactionsResponse;

    }
}