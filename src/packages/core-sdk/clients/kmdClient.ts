import {Account, Kmd, secretKeyToMnemonic} from "algosdk";
import {CustomTokenHeader, KMDTokenHeader} from "algosdk/dist/types/src/client/urlTokenBaseHTTPClient";
import * as sdk from "algosdk";
import {KMDConnectionParams} from "../types";


export class KmdClient {
    url: string
    port: string
    token: string | KMDTokenHeader | CustomTokenHeader
    kmd: Kmd

    constructor(params: KMDConnectionParams) {
        this.url = params.url;
        this.port = params.port;
        this.token = params.token;
        this.kmd = new sdk.Kmd(this.token, this.url, this.port);
    }

    async getVersions() {
        const versions = await this.kmd.listWallets();
        return versions;
    }

    async loadKmdAccounts(): Promise<string[]> {
        const mnemonics = [];
        const {wallets} = await this.kmd.listWallets();
        let defaultWallet;

        wallets.forEach((wallet) => {
            if (wallet.name === 'unencrypted-default-wallet') {
                defaultWallet = wallet;
            }
        });

        const {wallet_handle_token} = await this.kmd.initWalletHandle(defaultWallet.id, "");

        try {
            const {addresses} = await this.kmd.listKeys(wallet_handle_token);
            if (addresses.length > 0) {
                const proms = [];
                addresses.forEach((addr) => {
                    proms.push(this.kmd.exportKey(wallet_handle_token, "", addr));
                });

                const keys = await Promise.all(proms);

                keys.forEach((key) => {
                    mnemonics.push(secretKeyToMnemonic(key.private_key));
                })
            }
        }
        catch (e) {}

        return mnemonics;
    }

    async getDispenserAccount(): Promise<Account> {
        const {wallets} = await this.kmd.listWallets();
        let defaultWallet;

        wallets.forEach((wallet) => {
            if (wallet.name === 'unencrypted-default-wallet') {
                defaultWallet = wallet;
            }
        });

        const {wallet_handle_token} = await this.kmd.initWalletHandle(defaultWallet.id, "");

        try {
            const {addresses} = await this.kmd.listKeys(wallet_handle_token);
            if (addresses.length > 0) {
                const addr = addresses[0];
                const {private_key} = await this.kmd.exportKey(wallet_handle_token, "", addr);
                return {
                    addr,
                    sk: private_key
                }
            }
        }
        catch (e) {
            
        }

    }
}