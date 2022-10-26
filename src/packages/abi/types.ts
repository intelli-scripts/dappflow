import {ABIContractParams, ABITransactionType} from "algosdk";

export interface A_Application_ABI {
    id?: number,
    network: string;
    app: number;
    abi: ABIContractParams;
}

export const ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES = [ABITransactionType.pay, ABITransactionType.axfer];