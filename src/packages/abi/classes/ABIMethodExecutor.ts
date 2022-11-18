import {
    ABIArgumentType,
    ABIMethod,
    ABIMethodParams,
    ABITransactionType,
    abiTypeIsTransaction,
    AtomicTransactionComposer, makeBasicAccountTransactionSigner,
    Transaction,
    TransactionType,
    TransactionWithSigner
} from "algosdk";
import {A_ABI_METHOD_EXECUTOR_ARG, ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES} from "../types";
import dappflow from "../../../utils/dappflow";
import {BaseTransaction} from "../../core-sdk/transactions/baseTransaction";

export default class ABIMethodExecutor {
    method: ABIMethodParams

    constructor(method: ABIMethodParams) {
        this.method = method;
    }

    getArgs(): Array<{ type: ABIArgumentType; name?: string; description?: string }> {
        return  new ABIMethod(this.method).args || [];
    }

    canExecute(): boolean {
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

    parseArgumentValue(arg: A_ABI_METHOD_EXECUTOR_ARG): any {
        const dataType = arg.type.toString();
        const val = arg.value;

        switch (dataType) {
            case "uint64":
            case "byte":
            case "asset":
            case "application":
                return BigInt(val);
            case "bool":
                return Boolean(val);
            case "byte[]":
                return new Uint8Array(Buffer.from(val, "base64"));
            default:
                return val;
        }
    }

    getSequenceOfTxnTypes(): string[] {
        const txnTypes: string[] = [];

        const args = this.getArgs();
        args.forEach((arg) => {
            if (abiTypeIsTransaction(arg.type.toString())) {
                txnTypes.push(arg.type.toString());
            }
            else {
                if (txnTypes.indexOf('current') === -1) {
                    txnTypes.push('current');
                }
            }
        });

        return txnTypes;
    }

    async getUnsignedTxns(appId: number, from: string, args: A_ABI_METHOD_EXECUTOR_ARG[] = []): Promise<TransactionWithSigner[]> {
        console.log(this.getSequenceOfTxnTypes());
        const atc = new AtomicTransactionComposer();

        const sp = await new BaseTransaction(dappflow.network).getSuggestedParams();
        const signer = undefined;

        const appCallParams = {
            appID: appId,
            sender: from,
            suggestedParams: sp,
            signer
        }

        console.log(sp);
        const methodArgs = args.map((arg) => {
            const val = this.parseArgumentValue(arg);
            if (abiTypeIsTransaction(arg.type.toString())) {
                const txn = new Transaction({type: TransactionType.pay, from: from, to: from, amount: 1000, fee: sp.fee, ...sp});
                return {
                    txn: txn,
                    signer: makeBasicAccountTransactionSigner({addr: from, sk: undefined})
                };
            }
            else {
                return val;
            }
        }).filter((value) => value !== undefined && value !== "" && value !== null);

        console.log(methodArgs);

        atc.addMethodCall({
            ...appCallParams,
            method: new ABIMethod(this.method),
            methodArgs
        });

        const unsignedTxns= atc.buildGroup();
        return unsignedTxns;
    }
}