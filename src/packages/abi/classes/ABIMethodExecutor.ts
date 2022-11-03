import {
    ABIArgumentType,
    ABIMethod,
    ABIMethodParams,
    ABITransactionType,
    abiTypeIsTransaction,
    AtomicTransactionComposer, TransactionWithSigner
} from "algosdk";
import {ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES} from "../types";
import {TransactionClient} from "../../core-sdk/clients/transactionClient";
import dappflow from "../../../utils/dappflow";

export default class ABIMethodExecutor {
    method: ABIMethodParams

    constructor(method: ABIMethodParams) {
        this.method = method;
    }

    getArgs(): Array<{ type: ABIArgumentType; name?: string; description?: string }> {
        return  new ABIMethod(this.method).args || [];
    }

    canExecute(): boolean {
        if (this.isGroup()) {
            return false
        }

        let supported = true;

        const txnTypes = this.getTxnTypes();

        txnTypes.forEach((type) => {
            if (ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES.indexOf(type) === -1) {
                supported = false;
            }
        });

        return supported;
    }

    isGroup(): boolean {
        return new ABIMethod(this.method).txnCount() > 1;
    }

    getTxnTypes(): ABITransactionType[] {
        const txnTypes: ABITransactionType[] = [];

        if (this.isGroup()) {
            const args = this.getArgs();
            for (const arg of args) {
                if (abiTypeIsTransaction(arg.type)) {
                    txnTypes.push(arg.type)
                }
            }
        }

        return txnTypes;
    }

    parseArgumentValue(val: any, dataType: string) {
        switch (dataType) {
            case "uint64":
            case "byte":
                return BigInt(val);
            case "bool":
                return Boolean(val);
            default:
                return val;
        }
    }

    async getUnsignedTxns(appId: number, from: string, args: any[] = []): Promise<TransactionWithSigner[]> {
        const atc = new AtomicTransactionComposer();

        const sp = await new TransactionClient(dappflow.network).getSuggestedParams();

        const appCallParams = {
            appID: appId,
            sender: from,
            suggestedParams:sp,
            signer: undefined
        }

        const methodArgs = args.map((arg) =>
                this.parseArgumentValue(
                    arg.value,
                    arg.type
                )
            ).filter((value) => value !== undefined && value !== "" && value !== null);

        atc.addMethodCall({
            method: new ABIMethod(this.method),
            methodArgs: methodArgs,
            ...appCallParams
        });

        const unsignedTxns = atc.buildGroup();
        return unsignedTxns;
    }
}