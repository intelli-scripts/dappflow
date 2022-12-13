import {Network} from "../packages/core-sdk/network";

import {
    getNodeConfig
} from "./nodeConfig";
import {Signer} from "../packages/signers/types";
import {getSigner} from "../packages/signers";


function getNetwork() {
    const nodeConfig = getNodeConfig();
    return new Network(nodeConfig);
}

class Dappflow {
    network: Network
    signer: Signer

    constructor() {
        this.network = getNetwork();
    }

    setSigner(signer: string): void {
        this.signer = getSigner(signer);
    }
}

export default new Dappflow();