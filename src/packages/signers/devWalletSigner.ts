import {Signer, SignerAccount} from "./types";
import {encodeAddress, mnemonicToSecretKey, Transaction} from "algosdk";
import {NETWORKS} from "../core-sdk/constants";
import {DevWallet} from "../dev-wallets/classes/DevWallet";
import {WalletSigner} from "./walletSigner";


export class DevWalletSigner implements Signer{
    private supportedNetworks: string[];

    constructor() {
        this.supportedNetworks = [NETWORKS.SANDBOX, NETWORKS.BETANET, NETWORKS.TESTNET];
    }

    async signTxn(unsignedTxn: Transaction): Promise<any> {
        const {from} = unsignedTxn;
        const address = encodeAddress(from.publicKey);

        const devWallet = await new DevWallet().get(address);

        const {mnemonic} = devWallet;
        const account = mnemonicToSecretKey(mnemonic);

        const wSigner = new WalletSigner(account);
        return  wSigner.signTxn(unsignedTxn);
    }

    async signGroupTxns(unsignedTxns: Transaction[]): Promise<Uint8Array[]> {
        const proms = [];
        unsignedTxns.forEach((unsignedTxn) => {
            proms.push(this.signTxn(unsignedTxn));
        });

        return  await Promise.all(proms);
    }

    async connect(name: string): Promise<SignerAccount[]> {
        if (this.isInstalled()) {
            if (this.isNetworkSupported(name)) {
                const accounts: SignerAccount[] = [];
                const wallets = await new DevWallet().getAll();
                if (wallets) {
                    wallets.forEach((wallet) => {
                        accounts.push({
                            address: wallet.address,
                            name: wallet.address
                        });
                    });
                }

                return accounts;
            }
            else {
                throw new Error(name + " is not supported by Dev Wallet");
            }
        }
        else {
            throw new Error("Dev Wallet is not installed");
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