import {Network} from "../core";

export const network = new Network('sandbox', 'Sandbox', 'http://localhost', 'http://localhost', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', '4001', '8980');


export async function getLatestBlocks() {
    const indexer = network.getIndexer();
    const txns = await indexer.searchForTransactions().do();
    console.log(txns);
    const client = network.getClient();
    const status = await client.versionsCheck().do();
    console.log(status);
}