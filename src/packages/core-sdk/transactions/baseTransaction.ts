import {Algodv2, SuggestedParams} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {PendingTransactionResponse} from "algosdk/dist/types/src/client/v2/algod/models/types";


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

    async waitForConfirmation(txId: string): Promise<PendingTransactionResponse> {
        const status = await this.client.status().do();
        let lastRound = status["last-round"];
        while (true) {
            const pendingInfo = await this.client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                return pendingInfo as PendingTransactionResponse;
            }
            lastRound++;
            await this.client.statusAfterBlock(lastRound).do();
        }
    };
}