import {Signer} from "./types";
import * as sdk from "algosdk";
import {LogicSigAccount} from "algosdk";
import {NETWORKS} from "../core-sdk/constants";

export class LogicSigner implements Signer{

    private supportedNetworks: string[];

    constructor() {
        this.supportedNetworks = [NETWORKS.BETANET, NETWORKS.TESTNET, NETWORKS.MAINNET];
    }

    async signTxnByLogic(unsignedTxn, logic: string): Promise<Uint8Array> {
        const logicSig = new LogicSigAccount(new Uint8Array(Buffer.from(logic, "base64")));
        return sdk.signLogicSigTransactionObject(unsignedTxn, logicSig).blob;
    }

    isInstalled(): boolean {
        return true;
    }

    logout() {

    }
}
