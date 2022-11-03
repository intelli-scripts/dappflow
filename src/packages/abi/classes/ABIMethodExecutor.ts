import {
    ABIArgumentType,
    ABIMethod,
    ABIMethodParams,
    ABITransactionType,
    abiTypeIsTransaction, Account,
    AtomicTransactionComposer, TransactionWithSigner
} from "algosdk";
import {A_ABI_METHOD_EXECUTOR_ARG, ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES} from "../types";
import {TransactionClient} from "../../core-sdk/clients/transactionClient";
import dappflow from "../../../utils/dappflow";
import {WalletSigner} from "../../signers";

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
            return false;
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
            default:
                return val;
        }
    }

    async getUnsignedTxns(appId: number, from: string, args: A_ABI_METHOD_EXECUTOR_ARG[] = []): Promise<TransactionWithSigner[]> {
        const atc = new AtomicTransactionComposer();

        const sp = await new TransactionClient(dappflow.network).getSuggestedParams();

        const appCallParams = {
            appID: appId,
            sender: from,
            suggestedParams:sp,
            signer: undefined
        }

        const methodArgs = args.map((arg) =>
                this.parseArgumentValue(arg)
            ).filter((value) => value !== undefined && value !== "" && value !== null);

        atc.addMethodCall({
            method: new ABIMethod(this.method),
            methodArgs: methodArgs,
            ...appCallParams
        });

        const unsignedTxns= atc.buildGroup();
        return unsignedTxns;
    }

    async signMethodTxns(unsignedTxns: TransactionWithSigner[], account: Account): Promise<Uint8Array[]> {
        const signer = new WalletSigner(account);
        const txns = [];
        unsignedTxns.forEach((unsignedTxn) => {
            txns.push(unsignedTxn.txn);
        });
        const signedTxns = signer.signGroupTxns(txns);
        return signedTxns
    }

    async execute(signedTxns: Uint8Array[]) {
        const txnClient = new TransactionClient(dappflow.network);
        const resp = await txnClient.send(signedTxns);
        console.log(resp);
    }
}