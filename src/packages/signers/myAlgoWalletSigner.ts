import {Signer, SignerAccount} from "./types";
import {Transaction} from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import {NETWORKS} from "../core-sdk/constants";


export class MyAlgoWalletSigner implements Signer{
    private readonly myAlgoConnect: MyAlgoConnect;
    private supportedNetworks: string[];

    constructor() {
        this.myAlgoConnect = new MyAlgoConnect();
        this.supportedNetworks = [NETWORKS.BETANET, NETWORKS.TESTNET, NETWORKS.MAINNET];
    }

    async signTxn(unsignedTxn: Transaction): Promise<Uint8Array> {
        const byteTxn = unsignedTxn.toByte();
        const signedTxn = await this.myAlgoConnect.signTransaction(byteTxn);
        return signedTxn.blob;
    }

    async signGroupTxns(unsignedTxns: Transaction[]): Promise<Uint8Array[]> {
        const encodedTransactionObjs = [];
        unsignedTxns.forEach((unsignedTxn) => {
            encodedTransactionObjs.push(unsignedTxn.toByte());
        });

        const blobs = [];
        const signedTxns = await this.myAlgoConnect.signTransaction(encodedTransactionObjs);
        signedTxns.forEach((signedTxn) => {
            blobs.push(signedTxn.blob);
        });

        return blobs;
    }

    async connect(name: string): Promise<SignerAccount[]> {
        if (this.isInstalled()) {
            if (this.isNetworkSupported(name)) {
                const accounts: SignerAccount[] = [];
                const wallets = await this.myAlgoConnect.connect();
                if (wallets) {
                    wallets.forEach((wallet) => {
                        accounts.push({
                            address: wallet.address,
                            name: wallet.name
                        });
                    });
                }

                return accounts;
            }
            else {
                throw new Error(name + " is not supported by MyAlgo Wallet");
            }
        }
        else {
            throw new Error("MyAlgo Wallet is not installed");
        }
    }

    isInstalled(): boolean {
        return true;
    }

    isNetworkSupported(name: string): boolean {
        return this.supportedNetworks.indexOf(name) !== -1;
    }

    logout() {

    }
}