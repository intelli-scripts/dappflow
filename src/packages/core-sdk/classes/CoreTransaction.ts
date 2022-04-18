import {
    A_SearchTransaction
} from "../types";
import {TXN_TYPES} from "../constants";


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
        if(type === TXN_TYPES.ASSET_TRANSFER) {
            return this.txn["asset-transfer-transaction"].receiver;
        }
    }

    getAppId(): number {
        const type = this.getType();

        if (type === TXN_TYPES.APP_CALL) {
            let appId = this.txn["application-transaction"]["application-id"];

            if (!appId) {
                appId = this.txn["created-application-index"];
            }

            return appId;
        }
    }

    getAmount(): number {
        const type = this.getType();

        if (type === TXN_TYPES.PAYMENT) {
            return this.txn["payment-transaction"].amount;
        }
        if(type === TXN_TYPES.ASSET_TRANSFER) {
            return this.txn["asset-transfer-transaction"].amount;
        }
    }

    getTimestamp(): number {
        return this.txn["round-time"];
    }

    getSenderRewards(): number {
        return this.txn["sender-rewards"];
    }

    getReceiverRewards(): number {
        return this.txn["receiver-rewards"]
    }

    getNote(): string {
        return this.txn.note;
    }

    getFirstRound(): number {
        return this.txn["first-valid"];
    }

    getLastRound(): number {
        return this.txn["last-valid"];
    }

    getGenesisId(): string {
        return this.txn["genesis-id"];
    }

    getGenesisHash(): string {
        return this.txn["genesis-hash"];
    }
}