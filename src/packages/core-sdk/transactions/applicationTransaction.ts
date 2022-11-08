import sdk, {Transaction} from 'algosdk';
import {BaseTransaction} from "./baseTransaction";
import {Network} from "../network";
import {AppCreateTxn} from "algosdk";

export class ApplicationTransaction extends BaseTransaction{

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(network: Network) {
        super(network);
    }

    async prepareCreateTxn(params: AppCreateTxn): Promise<Transaction> {
        const suggestedParams = await this.getSuggestedParams();
        const {from, appOnComplete, appApprovalProgram, appClearProgram, appLocalByteSlices, appLocalInts, appGlobalByteSlices, appGlobalInts, appArgs, appForeignApps, appForeignAssets, appAccounts, note} = params;
        return sdk.makeApplicationCreateTxn(from, suggestedParams, appOnComplete, appApprovalProgram, appClearProgram, appLocalInts, appLocalByteSlices, appGlobalInts, appGlobalByteSlices, appArgs, appAccounts, appForeignApps, appForeignAssets, note);
    }
}