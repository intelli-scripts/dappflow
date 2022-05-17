import {Algodv2} from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Network} from "../network";
import {A_Group} from "../types";
import {BlockClient} from "./blockClient";


export class GroupClient {
    client: Algodv2;
    indexer: IndexerClient;
    network: Network;

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(id: string, blockId: number): Promise<A_Group> {
        const blockClient = new BlockClient(this.network);
        const {timestamp, transactions} = await blockClient.get(blockId);

        const grp: A_Group = {block: blockId, id, timestamp, transactions: []};

        transactions.forEach((txn) => {
            if (txn.group === id) {
                grp.transactions.push(txn);
            }
        });

        return grp;
    }
}