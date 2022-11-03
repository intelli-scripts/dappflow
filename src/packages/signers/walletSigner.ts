import {Signer} from "./types";
import {Account, Transaction} from "algosdk";
import {NETWORKS} from "./constants";

export class WalletSigner implements Signer{
    private wallet: Account;
    private supportedNetworks: string[];

    constructor(wallet?: Account) {
        if (wallet) {
            this.setWallet(wallet);
        }
        this.supportedNetworks = [NETWORKS.BETANET, NETWORKS.TESTNET, NETWORKS.MAINNET];
    }

    setWallet(wallet: Account): void {
        this.wallet = wallet;
    }

    signTxn(unsignedTxn: Transaction): Uint8Array {
        const {sk} = this.wallet;
        const signedRawTxn = unsignedTxn.signTxn(sk);
        return signedRawTxn;
    }

    signGroupTxns(unsignedTxns: Transaction[]): Uint8Array[] {
        const signedTxns: Uint8Array[] = [];

        unsignedTxns.forEach((unsignedTxn) => {
            const test = this.signTxn(unsignedTxn);
            signedTxns.push(test);
        });

        return signedTxns;
    }

    isInstalled(): boolean {
        return true;
    }

    logout() {

    }
}