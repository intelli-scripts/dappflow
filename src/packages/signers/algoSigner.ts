import {Signer, SignerAccount} from "./types";
import {Transaction} from "algosdk";
import {ALGO_SIGNER_NET, NETWORKS} from "./constants";

export class BrowserAlgoSigner implements Signer{
    private supportedNetworks: string[];

    constructor() {
        this.supportedNetworks = [NETWORKS.TESTNET, NETWORKS.MAINNET];
    }

    async signTxn(unsignedTxn: Transaction): Promise<Uint8Array> {
        const byteTxn: Uint8Array = unsignedTxn.toByte();
        // @ts-ignore
        const b64Txn = AlgoSigner.encoding.msgpackToBase64(byteTxn);

        // @ts-ignore
        const signedTxns: any[] = await AlgoSigner.signTxn([
            {txn: b64Txn},
        ]);

        // @ts-ignore
        const rawSignedTxn: Uint8Array = AlgoSigner.encoding.base64ToMsgpack(signedTxns[0].blob);
        return rawSignedTxn;
    }

    async signGroupTxns(unsignedTxns: Transaction[]): Promise<Uint8Array[]> {
        const txns: any[] = [];

        unsignedTxns.forEach((unsignedTxn) => {
            const byteTxn: Uint8Array = unsignedTxn.toByte();
            // @ts-ignore
            const b64Txn = AlgoSigner.encoding.msgpackToBase64(byteTxn);
            txns.push({
                txn: b64Txn
            });
        });

        // @ts-ignore
        const signedTxns = await AlgoSigner.signTxn(txns);

        const rawSignedTransactions: Uint8Array[] = [];

        signedTxns.forEach((signedTxn) => {
            // @ts-ignore
            rawSignedTransactions.push(AlgoSigner.encoding.base64ToMsgpack(signedTxn.blob));
        });

        return rawSignedTransactions;
    }

    isInstalled(): boolean {
        // @ts-ignore
        return typeof AlgoSigner !== 'undefined';
    }

    isNetworkSupported(name: string): boolean {
        return this.supportedNetworks.indexOf(name) !== -1;
    }

    getAlgoSignerNet(name: string): string {
        if (name === NETWORKS.MAINNET) {
            return ALGO_SIGNER_NET.MAINNET
        }
        if (name === NETWORKS.BETANET) {
            return ALGO_SIGNER_NET.BETANET
        }
        if (name === NETWORKS.TESTNET) {
            return ALGO_SIGNER_NET.TESTNET
        }
    }

    async connect(name: string): Promise<SignerAccount[]> {
        if (this.isInstalled()) {
            if (this.isNetworkSupported(name)) {
                const accounts: SignerAccount[] = [];
                // @ts-ignore
                const connection = await AlgoSigner.connect();
                // @ts-ignore
                const wallets = await AlgoSigner.accounts({
                    ledger: this.getAlgoSignerNet(name)
                });

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
                throw new Error(name + " is not supported by AlgoSigner");
            }
        }
        else {
            throw new Error("Algosigner is not installed");
        }
    }

    logout() {

    }
}