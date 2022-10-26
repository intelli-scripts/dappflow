import {ABIMethod, ABIMethodParams, abiTypeIsTransaction} from "algosdk";
import {ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES} from "../types";

export default class ABIMethodExecutor {
    method: ABIMethodParams

    constructor(method: ABIMethodParams) {
        this.method = method;
    }

    canExecute(): boolean {
        let args = new ABIMethod(this.method).args;
        if (!args) {
            args = [];
        }

        let supported = true;

        args.forEach((arg) => {
            const type = arg.type;
            if (abiTypeIsTransaction(type)) {
                if (ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES.indexOf(type) === -1) {
                    supported = false;
                }
            }
        });

        return supported;
    }

    isGroup(): boolean {
        return new ABIMethod(this.method).txnCount() > 1;
    }
}