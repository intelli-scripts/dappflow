import {Network} from "../packages/core-sdk/network";

import {
    getNodeConfig
} from "./nodeConfig";


function getNetwork() {
    const nodeConfig = getNodeConfig();
    return new Network(nodeConfig);
}

class Dappflow {
    network: Network

    constructor() {
        this.network = getNetwork();
    }

}

export default new Dappflow();