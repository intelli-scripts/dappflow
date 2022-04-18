import {
    A_SearchTransaction
} from "../types";
import {TXN_TYPES} from "../constants";
import {microalgosToAlgos} from "algosdk";


export class CoreTransaction {
    txn: A_SearchTransaction;

    constructor(txn: A_SearchTransaction) {
        this.txn = txn;
    }

    get(): A_SearchTransaction{
        return this.txn;
    }

    getId(): string {
        return this.txn.id;
    }

    getBlock(): number {
        return this.txn["confirmed-round"];
    }

    getFee(): number {
        return this.txn.fee;
    }

    getFrom(): string {
        return this.txn.sender;
    }

    getType(): string {
        return this.txn["tx-type"];
    }

    getTypeDisplayValue(): string {
        const type = this.getType();
        if (type === 'pay') {
            return "Payment";
        }
        else if(type === 'keyreg') {
            return 'Key registration';
        }
        else if(type === 'acfg') {
            return 'Asset config';
        }
        else if(type === 'axfer') {
            return 'Asset transfer';
        }
        else if(type === 'appl') {
            return 'Application call';
        }
    }

    getTo(): string {
        const type = this.getType();
        if (type === TXN_TYPES.PAYMENT) {
            return this.txn["payment-transaction"].receiver;
        }
        else if(type === TXN_TYPES.KEY_REGISTRATION) {
            return '';
        }
        else if(type === TXN_TYPES.ASSET_CONFIG) {
            return '';
        }
        else if(type === TXN_TYPES.ASSET_TRANSFER) {
            return this.txn["asset-transfer-transaction"].receiver;
        }
        else if(type === TXN_TYPES.APP_CALL) {
            let appId = this.txn["application-transaction"]["application-id"];

            if (!appId) {
                appId = this.txn["created-application-index"];
            }

            return appId.toString();
        }
    }

    getToDisplayValue(): string {
        const type = this.getType();
        const to = this.getTo();

        if (type === TXN_TYPES.PAYMENT || type === TXN_TYPES.KEY_REGISTRATION || type === TXN_TYPES.ASSET_CONFIG || type === TXN_TYPES.ASSET_TRANSFER) {
            return to;
        }
        else if(type === TXN_TYPES.APP_CALL) {
            return 'App ID: ' + to;
        }
    }

    getAmount(): string {
        const type = this.getType();

        if (type === TXN_TYPES.PAYMENT) {
            return microalgosToAlgos(this.txn["payment-transaction"].amount).toString();
        }
        else if(type === TXN_TYPES.KEY_REGISTRATION) {
            return '';
        }
        else if(type === TXN_TYPES.ASSET_CONFIG) {
            return '';
        }
        else if(type === TXN_TYPES.ASSET_TRANSFER) {
            return this.txn["asset-transfer-transaction"].amount.toString();
        }
        else if(type === TXN_TYPES.APP_CALL) {
            return '';
        }
    }

    getTimestamp(): number {
        return this.txn["round-time"];
    }
}