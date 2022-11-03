import {ABIArgumentType, ABIContractParams, ABITransactionType} from "algosdk";

export interface A_Application_ABI {
    id?: number,
    network: string;
    app: number;
    abi: ABIContractParams;
}

export const ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES: ABITransactionType[] = [ABITransactionType.pay, ABITransactionType.axfer];

export interface A_ABI_METHOD_EXECUTOR_ARG {
    type: ABIArgumentType,
    name?: string,
    description?: string,
    value: any
}