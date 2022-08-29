import {A_ABI, A_ABI_Method, A_ABI_Networks} from "../types";

export class ABI {
    abi: A_ABI

    constructor(abi: A_ABI) {
        this.abi = abi;
    }

    getName(): string {
        return this.abi.name;
    }

    getDesc(): string {
        return this.abi.desc;
    }

    getMethods(): A_ABI_Method[] {
        return this.abi.methods || [];
    }

    getNetworks(): A_ABI_Networks {
        return this.abi.networks || {};
    }

    hasNetworks(): boolean {
        const networks = this.getNetworks();
        if (networks) {
            const keys = Object.keys(networks);
            return keys.length > 0;
        }

        return false;
    }

    getNetworkName(name: string): string {
        return Buffer.from(name, 'base64').toString();
    }

}