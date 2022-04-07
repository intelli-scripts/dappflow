import {Network} from "../packages/core-sdk/network";
import {Explorer} from "../packages/explorer-sdk/explorer";

function getNetwork() {
    return new Network('sandbox', 'Sandbox', 'http://localhost', 'http://localhost', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', '4001', '8980');
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