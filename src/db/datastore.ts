import Dexie, { Table } from 'dexie';
import {A_Application_ABI} from "../packages/abi/types";
import {A_Dev_Wallet} from "../packages/dev-wallets/types";

export class DappflowDataStore extends Dexie {
    applicationABIs!: Table<A_Application_ABI, number>;
    devWallets!: Table<A_Dev_Wallet, number>;

    constructor() {
        super('dappflow');
        this.version(2).stores({
            applicationABIs: '++id, network, app, abi',
            devWallets: '++id, address, mnemonic'
        });
    }
}

export const dataStore = new DappflowDataStore();
