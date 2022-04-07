import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {DAPPFLOW_EXPLORER_ACCOUNT} from "../types";


export class AccountsClient {
    client: Algodv2;
    indexer: IndexerClient;

    constructor(client: Algodv2, indexer: IndexerClient) {
        this.client = client;
        this.indexer = indexer;
    }

    async get(): Promise<DAPPFLOW_EXPLORER_ACCOUNT[]> {
        const {accounts} = await this.indexer.searchAccounts().do();
        return accounts;
    }
}