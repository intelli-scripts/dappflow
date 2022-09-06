import Dexie, { Table } from 'dexie';
import {A_Application_ABI} from "../packages/abi/types";

export class DappflowDataStore extends Dexie {
    applicationABIs!: Table<A_Application_ABI, number>;

    constructor() {
        super('dappflow');
        this.version(1).stores({
            applicationABIs: '++id, network, app, abi'
        });
    }
}

export const dataStore = new DappflowDataStore();
