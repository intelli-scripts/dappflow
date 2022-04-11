import {Network} from "../packages/core-sdk/network";
import {Explorer} from "../packages/explorer-sdk/explorer";
import {
    getNodeConfig
} from "../packages/explorer-sdk/nodeConfig";

function getNetwork() {
    const nodeConfig = getNodeConfig();
    const {algodUrl, algodPort, algodToken, indexerPort, indexerToken, indexerUrl} = nodeConfig;

    return new Network('sandbox', 'Sandbox', algodUrl, indexerUrl, algodToken, indexerToken, algodPort, indexerPort);
}

class ExplorerSdk {
    network: Network
    explorer: Explorer

    constructor() {
        this.network = getNetwork();
        this.explorer = new Explorer(this.network);
    }

    changeNetwork(): void {
        this.network = getNetwork();
        this.explorer = new Explorer(this.network);
    }
}

export default new ExplorerSdk();