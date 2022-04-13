import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_AccountInformation,
    A_SearchAccount, A_SearchTransaction
} from "../types";
import {Network} from "../network";

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

    async getAccounts(): Promise<A_SearchAccount[]> {
        const {accounts} = await this.indexer.searchAccounts().do();
        return accounts;
    }

    async getAccountTransactions(address: string): Promise<A_SearchTransaction[]> {
        const {transactions} = await this.indexer.searchForTransactions().address(address).do();
        return transactions;
    }
}