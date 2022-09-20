import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_Genesis, A_Health, A_Status, A_VersionsCheck} from "../types";


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

    async status(): Promise<A_Status> {
        const status = await this.client.status().do();
        return status as A_Status;
    }

    async genesis(): Promise<A_Genesis> {
        const genesis = await this.client.genesis().do();
        return genesis as A_Genesis;
    }

    async health(): Promise<A_Health> {
        const health = await this.indexer.makeHealthCheck().do();
        return health as A_Health;
    }
}