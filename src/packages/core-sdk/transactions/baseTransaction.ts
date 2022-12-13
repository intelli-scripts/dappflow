import {Algodv2, SuggestedParams, waitForConfirmation} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";


export class BaseTransaction {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async getSuggestedParams(): Promise<SuggestedParams>{
        return  await this.client.getTransactionParams().do();
    }

    async send(txns: Uint8Array | Uint8Array[]): Promise<any> {
        return await this.client.sendRawTransaction(txns).do();
    }

    toUint8Array(text: string): Uint8Array {
        const enc = new TextEncoder();
        return enc.encode(text);
    }

    async waitForConfirmation(txId: string): Promise<any> {
        return await waitForConfirmation(this.client, txId, 20);
    };

}