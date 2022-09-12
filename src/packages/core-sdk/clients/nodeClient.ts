import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_VersionsCheck} from "../types";
import Status from "algosdk/dist/types/src/client/v2/algod/status";


export class NodeClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async versionsCheck(): Promise<A_VersionsCheck> {
        const versions = await this.client.versionsCheck().do();
        return versions as A_VersionsCheck;
    }

    async status(): Promise<Status> {
        const status = await this.client.status().do();
        return status as Status;
    }
}