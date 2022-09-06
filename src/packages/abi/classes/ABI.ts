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

}