import {A_Application_ABI} from "../types";
import {dataStore} from "../../../db/datastore";

export class ApplicationABI {

    async save(applicationABI: A_Application_ABI): Promise<number> {
        const id = await dataStore.applicationABIs.add({
            ...applicationABI
        });

        return id as number;
    }

    async get(app: number): Promise<A_Application_ABI> {
        const appABI = await dataStore.applicationABIs.get({
            app: app
        });

        return appABI;
    }

    async delete(app: number): Promise<boolean> {
        await dataStore.applicationABIs.where({
            app: app
        }).delete();

        return true
    }
}