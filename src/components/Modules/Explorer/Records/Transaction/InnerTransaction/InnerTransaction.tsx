import './InnerTransaction.scss';
import React from "react";
import {
    Grid
} from "@mui/material";
import {CoreTransaction} from "../../../../../../packages/core-sdk/classes/CoreTransaction";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../../../AlgoIcon/AlgoIcon";
import {TXN_TYPES} from "../../../../../../packages/core-sdk/constants";
import PaymentTransaction from '../Types/PaymentTransaction/PaymentTransaction';
import AssetTransferTransaction from "../Types/AssetTransferTransaction/AssetTransferTransaction";
import AssetConfigTransaction from "../Types/AssetConfigTransaction/AssetConfigTransaction";
import KeyRegTransaction from "../Types/KeyRegTransaction/KeyRegTransaction";
import AppCallTransaction from "../Types/AppCallTransaction/AppCallTransaction";
import TransactionAdditionalDetails from "../Sections/TransactionAdditionalDetails/TransactionAdditionalDetails";
import TransactionNote from "../Sections/TransactionNotes/TransactionNote";
import {shadedClr} from "../../../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";


function InnerTransaction(props): JSX.Element {
    const {txn, asset} = props;

    let txnObj = txn;
    let txnInstance = new CoreTransaction(txnObj);


    return (<div className={"inner-transaction-wrapper"}>
        <div className={"inner-transaction-container"}>

            <div className="inner-transaction-header">
                <div>
                    Inner transaction overview
                </div>
                <div>
                    <JsonViewer obj={txnObj}></JsonViewer>
                </div>
            </div>

            <div className="inner-transaction-body">

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Type
                                </div>
                                <div className="value">
                                    {txnInstance.getTypeDisplayValue()}
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Fee
                                </div>
                                <div className="value">
                                    {microalgosToAlgos(txnInstance.getFee())}
                                    <span style={{marginLeft: 5}}><AlgoIcon></AlgoIcon></span>

                                </div>
                            </div>
                        </Grid>



                        {txnInstance.getGroup() ? <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Group
                                </div>
                                <div className="value small">
                                    {txnInstance.getGroup()}
                                </div>
                            </div>
                        </Grid> : ''}

                    </Grid>
                </div>


                {txnInstance.getType() === TXN_TYPES.PAYMENT ? <PaymentTransaction transaction={txnObj}></PaymentTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.ASSET_TRANSFER ? <AssetTransferTransaction transaction={txnObj} asset={asset}></AssetTransferTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.ASSET_CONFIG ? <AssetConfigTransaction transaction={txnObj}></AssetConfigTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.KEY_REGISTRATION ? <KeyRegTransaction transaction={txnObj}></KeyRegTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.APP_CALL ? <AppCallTransaction transaction={txnObj}></AppCallTransaction> : ''}


                <TransactionNote transaction={txnObj}></TransactionNote>
                <TransactionAdditionalDetails transaction={txnObj}></TransactionAdditionalDetails>
            </div>


        </div>
    </div>);
}

export default InnerTransaction;
