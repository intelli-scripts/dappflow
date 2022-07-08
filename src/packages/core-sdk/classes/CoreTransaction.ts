import {
    A_Asset,
    A_SearchTransaction,
    A_SearchTransaction_App_Call_Payload,
    A_SearchTransaction_Asset_Transfer_Payload, A_SearchTransaction_KeyReg_Payload,
    A_SearchTransaction_Payment_Payload, A_SearchTransaction_Signature, A_SearchTransactionInner
} from "../types";
import {TEXT_ENCODING, TIMESTAMP_DISPLAY_FORMAT, TXN_TYPES} from "../constants";
import atob from 'atob';
import msgpack from "msgpack-lite";
import dateFormat  from "dateformat";
import {encodeAddress} from "algosdk";


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
            return 'Transfer';
        }
        else if(type === 'appl') {
            return 'App call';
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

    getPaymentPayload(): A_SearchTransaction_Payment_Payload {
        return this.txn["payment-transaction"];
    }

    getKeyRegPayload(): A_SearchTransaction_KeyReg_Payload {
        return this.txn["keyreg-transaction"];
    }

    getAssetTransferPayload(): A_SearchTransaction_Asset_Transfer_Payload {
        return this.txn["asset-transfer-transaction"];
    }

    getAssetConfigPayload(): A_Asset {
        return this.txn["asset-config-transaction"];
    }

    getAppCallPayload(): A_SearchTransaction_App_Call_Payload {
        return this.txn["application-transaction"];
    }

    getAppId(): number {
        const type = this.getType();

        if (type === TXN_TYPES.APP_CALL) {
            let appId = this.getAppCallPayload()["application-id"];

            if (!appId) {
                appId = this.txn["created-application-index"];
            }

            return appId;
        }
    }

    getAssetId(): number {
        const type = this.getType();

        if (type === TXN_TYPES.ASSET_TRANSFER) {
            return  this.getAssetTransferPayload()["asset-id"];
        }
        if (type === TXN_TYPES.ASSET_CONFIG) {
            if (this.txn["created-asset-index"]) {
                return this.txn["created-asset-index"];
            }
            return  this.getAssetConfigPayload()["asset-id"];
        }
    }

    getAmount(): number {
        const type = this.getType();

        if (type === TXN_TYPES.PAYMENT) {
            return this.getPaymentPayload().amount;
        }
        if(type === TXN_TYPES.ASSET_TRANSFER) {
            return this.getAssetTransferPayload().amount;
        }
    }

    getTimestamp(): number {
        return this.txn["round-time"];
    }

    getTimestampDisplayValue(format: string = TIMESTAMP_DISPLAY_FORMAT): string {
        return dateFormat(new Date(this.getTimestamp() * 1000), format);
    }

    getSenderRewards(): number {
        return this.txn["sender-rewards"];
    }

    getReceiverRewards(): number {
        return this.txn["receiver-rewards"]
    }

    getNote(encoding: string = TEXT_ENCODING.BASE64): string {
        if(encoding === TEXT_ENCODING.BASE64) {
            return this.txn.note;
        }
        if(encoding === TEXT_ENCODING.TEXT) {
            return atob(this.txn.note);
        }
        if(encoding === TEXT_ENCODING.MSG_PACK) {
            try {
                return JSON.stringify(msgpack.decode(Buffer.from(this.txn.note, 'base64')));
            }
            catch (e) {
                return msgpack.decode(Buffer.from(this.txn.note, 'base64'));
            }

        }
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

    getSig(): A_SearchTransaction_Signature {
        return this.txn.signature;
    }

    isMultiSig(): boolean {
        const sig = this.getSig();
        return sig.multisig !== undefined;
    }

    getMultiSigSubSignatures(): string[] {
        const addresses: string[] = [];
        const sig = this.getSig();
        if (this.isMultiSig()) {
            const subSigs = sig.multisig.subsignature;
            subSigs.forEach((subSig) => {
                const pk = subSig["public-key"];
                const buf = Buffer.from(pk, "base64");
                addresses.push(encodeAddress(buf));
            });
        }

        return addresses;
    }

    isLogicSig(): boolean {
        const sig = this.getSig();
        return sig.logicsig !== undefined;
    }

    getGroup(): string {
        return this.txn.group;
    }

    hasLocalStateDelta(): boolean {
        return this.txn["local-state-delta"] && this.txn["local-state-delta"].length > 0;
    }

    hasGlobalStateDelta(): boolean {
        return this.txn["global-state-delta"] && this.txn["global-state-delta"].length > 0;
    }

    hasInnerTransactions(): boolean {
        return this.txn["inner-txns"] && this.txn["inner-txns"].length > 0;
    }

    getInnerTransactions(): A_SearchTransactionInner[] {
        return this.txn["inner-txns"];
    }

    getInnerTransaction(index: number): A_SearchTransactionInner {
        const txns = this.getInnerTransactions();
        return txns[index];
    }

    hasAppCallArguments(): boolean {
        const appCallPayload = this.getAppCallPayload();
        return appCallPayload && appCallPayload["application-args"] && appCallPayload["application-args"].length > 0;
    }

    hasAppCallForeignAssets(): boolean {
        const appCallPayload = this.getAppCallPayload();
        return appCallPayload && appCallPayload["foreign-assets"] && appCallPayload["foreign-assets"].length > 0;
    }

    hasAppCallForeignApps(): boolean {
        const appCallPayload = this.getAppCallPayload();
        return appCallPayload && appCallPayload["foreign-apps"] && appCallPayload["foreign-apps"].length > 0;
    }

    hasAppCallForeignAccounts(): boolean {
        const appCallPayload = this.getAppCallPayload();
        return appCallPayload && appCallPayload["accounts"] && appCallPayload["accounts"].length > 0;
    }

    hasLogs(): boolean {
        return this.txn.logs && this.txn.logs.length > 0;
    }

    getCloseTo(): string  {
        if (this.getType() === TXN_TYPES.ASSET_TRANSFER) {
            const payload = this.getAssetTransferPayload();
            return payload["close-to"];
        }
        if (this.getType() === TXN_TYPES.PAYMENT) {
            const payload = this.getPaymentPayload();
            return payload["close-remainder-to"];
        }
    }

    getCloseAmount(): number  {
        if (this.getType() === TXN_TYPES.ASSET_TRANSFER) {
            const payload = this.getAssetTransferPayload();
            return payload["close-amount"];
        }
        if (this.getType() === TXN_TYPES.PAYMENT) {
            const payload = this.getPaymentPayload();
            return payload["close-amount"];
        }
    }
}