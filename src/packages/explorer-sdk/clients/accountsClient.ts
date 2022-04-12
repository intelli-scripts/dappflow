import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {DAPPFLOW_EXPLORER_ACCOUNT} from "../types";
import {Network} from "../../core-sdk/network";
import {A_SearchTransaction} from "../../core-sdk/types";


export class AccountsClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(): Promise<DAPPFLOW_EXPLORER_ACCOUNT[]> {
        const {accounts} = await this.indexer.searchAccounts().do();
        return accounts;
    }

    async getAccountTransactions(address: string): Promise<A_SearchTransaction[]> {
        const {transactions} = await this.indexer.searchForTransactions().address(address).do();
        return transactions;
    }
}