import {
    A_AccountInformation, A_Application, A_Asset
} from "../types";


export class CoreAccount {
    account: A_AccountInformation;

    constructor(account: A_AccountInformation) {
        if (!account) {
            throw new Error("Invalid account");
        }
        this.account = account;
    }

    get(): A_AccountInformation{
        return this.account;
    }

    getCreatedAssets(): A_Asset[]{
        const createdAssets = this.account['created-assets'];
        return createdAssets;
    }

    getCreatedApplications(): A_Application[]{
        const createdApps = this.account['created-apps'];
        return createdApps;
    }

    getBalance(): number {
        return this.account.amount;
    }

}