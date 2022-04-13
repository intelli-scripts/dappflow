import {
    A_AccountInformation, A_Asset
} from "../types";


export class CoreAccount {
    account: A_AccountInformation;

    constructor(account: A_AccountInformation) {
        this.account = account;
    }

    get(): A_AccountInformation{
        return this.account;
    }

    getCreatedAssets(): A_Asset[]{
        const createdAssets = this.account['created-assets'];
        return createdAssets;
    }

    getBalance(): number {
        return this.account.amount;
    }

}