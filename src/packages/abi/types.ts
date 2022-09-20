import {ABIContractParams} from "algosdk";

export interface A_Application_ABI {
    id?: number,
    network: string;
    app: number;
    abi: ABIContractParams;
}