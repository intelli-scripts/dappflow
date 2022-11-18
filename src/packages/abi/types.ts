import {ABIArgumentType, ABIContractParams, ABITransactionType} from "algosdk";

export interface A_Application_ABI {
    id?: number,
    network: string;
    app: number;
    abi: ABIContractParams;
}

export const ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES: ABITransactionType[] = [ABITransactionType.pay];

export interface A_ABI_METHOD_EXECUTOR_ARG {
    type: ABIArgumentType,
    name?: string,
    description?: string,
    value: any
}

export interface A_ABI_METHOD_EXECUTOR_APP_CREATION_PARAMS {
    id: string,
    approvalProgram: string,
    clearProgram: string,
    globalBytes: string,
    localBytes: string,
    globalInts: string,
    localInts: string,
    note: string
}