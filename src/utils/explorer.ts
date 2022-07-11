import {Network} from "../packages/core-sdk/network";

import {
    getNodeConfig
} from "./nodeConfig";


function getNetwork() {
    const nodeConfig = getNodeConfig();
    const {algodUrl, algodPort, algodToken, indexerPort, indexerToken, indexerUrl} = nodeConfig;

    return new Network('sandbox', 'Sandbox', algodUrl, indexerUrl, algodToken, indexerToken, algodPort, indexerPort);
}

class Explorer {
    network: Network

    constructor() {
        this.network = getNetwork();
    }

}

export default new Explorer();