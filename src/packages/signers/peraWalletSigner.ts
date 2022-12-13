import {Signer, SignerAccount} from "./types";
import {Transaction} from "algosdk";
import {NETWORKS} from "../core-sdk/constants";
import {PeraWalletConnect} from '@perawallet/connect';
import {PeraWalletNetwork} from "@perawallet/connect/dist/util/peraWalletTypes";


export class PeraWalletSigner implements Signer{
    private supportedNetworks: string[];
    private peraWallet: PeraWalletConnect;

    constructor() {
        this.peraWallet = new PeraWalletConnect();
        this.supportedNetworks = [NETWORKS.TESTNET, NETWORKS.MAINNET];
    }

    async signTxn(unsignedTxn: Transaction): Promise<Uint8Array> {
        const signedTxn = await this.peraWallet.signTransaction([[{txn: unsignedTxn}]]);
        return signedTxn[0];
    }

    async signGroupTxns(unsignedTxns: Transaction[]): Promise<Uint8Array[]> {
        const encodedTransactionObjs = [];
        unsignedTxns.forEach((unsignedTxn) => {
            encodedTransactionObjs.push({txn: unsignedTxn});
        });

        const signedTxns = await this.peraWallet.signTransaction([encodedTransactionObjs]);
        return signedTxns;
    }

    async connect(name: string): Promise<SignerAccount[]> {
        if (this.isInstalled()) {
            if (this.isNetworkSupported(name)) {
                const accounts: SignerAccount[] = [];
                const wallets = await this.peraWallet.connect({network: name as PeraWalletNetwork});
                if (wallets) {
                    wallets.forEach((wallet) => {
                        accounts.push({
                            address: wallet,
                            name: wallet
                        });
                    });
                }

                return accounts;
            }
            else {
                throw new Error(name + " is not supported by Pera Wallet");
            }
        }
        else {
            throw new Error("Pera Wallet is not installed");
        }
    }

    isInstalled(): boolean {
        return true;
    }

    isNetworkSupported(name: string): boolean {
        return this.supportedNetworks.indexOf(name) !== -1;
    }

    logout() {
        this.peraWallet.disconnect();
    }
}