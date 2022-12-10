import {A_Dev_Wallet} from "../types";
import {dataStore} from "../../../db/datastore";

export class DevWallet {

    async save(wallet: A_Dev_Wallet): Promise<A_Dev_Wallet> {
        await dataStore.devWallets.add({
            ...wallet
        });

        return this.get(wallet.address);
    }

    async get(address: string): Promise<A_Dev_Wallet> {
        const wallet = await dataStore.devWallets.get({
            address: address
        });

        return wallet;
    }

    async delete(address: string): Promise<boolean> {
        await dataStore.devWallets.where({
            address: address
        }).delete();

        return true
    }

    async getAll(): Promise<A_Dev_Wallet[]> {
        const wallets = await dataStore.devWallets.toArray()
        return wallets;
    }
}