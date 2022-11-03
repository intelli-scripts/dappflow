import {Transaction} from "algosdk";

export interface SignerAccount {
    address: string,
    name: string
}

export interface Signer {
    signTxn?(unsignedTxn: Transaction): Uint8Array | Promise<Uint8Array>;
    signGroupTxns?(unsignedTxns: Transaction[]): Uint8Array[] | Promise<Uint8Array[]>;
    signTxnByLogic?(unsignedTxn, logic: string): Promise<Uint8Array>;
    isInstalled(): boolean;
    connect?(name: string): Promise<SignerAccount[]>,
    isNetworkSupported?(name: string): boolean,
    logout(): void
}