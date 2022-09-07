import {ABIContractNetworks, ABIContractParams, ABIMethodParams} from "algosdk";

export class ABI {
    abi: ABIContractParams

    constructor(abi: ABIContractParams) {
        this.abi = abi;
    }

    getName(): string {
        return this.abi.name;
    }

    getDesc(): string {
        return this.abi.desc;
    }

    getMethods(): ABIMethodParams[] {
        return this.abi.methods || [];
    }

    getNetworks(): ABIContractNetworks {
        return this.abi.networks || {};
    }

}