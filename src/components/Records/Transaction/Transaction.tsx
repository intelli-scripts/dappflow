import './Transaction.scss';
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Grid
} from "@mui/material";
import {loadTransaction} from "../../../redux/actions/transaction";
import {CoreTransaction} from "../../../packages/core-sdk/classes/CoreTransaction";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../../AlgoIcon/AlgoIcon";
import {TXN_TYPES} from "../../../packages/core-sdk/constants";
import PaymentTransaction from './Types/PaymentTransaction/PaymentTransaction';
import AssetTransferTransaction from "./Types/AssetTransferTransaction/AssetTransferTransaction";
import AssetConfigTransaction from "./Types/AssetConfigTransaction/AssetConfigTransaction";
import KeyRegTransaction from "./Types/KeyRegTransaction/KeyRegTransaction";
import AppCallTransaction from "./Types/AppCallTransaction/AppCallTransaction";
import LinkToBlock from "../../Common/Links/LinkToBlock";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";
import TransactionAdditionalDetails from "./Sections/TransactionAdditionalDetails/TransactionAdditionalDetails";
import TransactionNote from "./Sections/TransactionNotes/TransactionNote";
import {shadedClr} from "../../../utils/common";
import TransactionMultiSig from "./Sections/TransactionMultiSig/TransactionMultiSig";
import TransactionLogicSig from "./Sections/TransactionLogicSig/TransactionLogicSig";
import JsonViewer from "../../Common/JsonViewer/JsonViewer";
import LinkToGroup from "../../Common/Links/LinkToGroup";
import {RootState} from "../../../redux/store";
import CustomError from '../../Common/CustomError/CustomError';


function Transaction(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const {id} = params;

    const transaction = useSelector((state: RootState) => state.transaction);
    const asset = transaction.asset.information;

    let txnObj = transaction.information;
    let txnInstance = new CoreTransaction(txnObj);


    useEffect(() => {
        dispatch(loadTransaction(id));
    }, [dispatch, id]);

    return (<div className={"transaction-wrapper"}>
        <div className={"transaction-container"}>

            {transaction.error ? <CustomError></CustomError> : <div>
                <div className="transaction-header">
                    <div>
                        Transaction overview
                    </div>
                    <div>
                        <JsonViewer obj={txnObj}></JsonViewer>
                    </div>
                </div>

                {transaction.loading ? <LoadingTile></LoadingTile> : <div className="transaction-body">
                    <div className="index">
                        {txnInstance.getId()}
                    </div>


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
                                        Block
                                    </div>
                                    <div className="value">
                                        <LinkToBlock id={txnInstance.getBlock()}></LinkToBlock>
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



                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Timestamp
                                    </div>
                                    <div className="value">
                                        {txnInstance.getTimestampDisplayValue() + ' GMT'}
                                    </div>
                                </div>
                            </Grid>

                            {txnInstance.getGroup() ? <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Group
                                    </div>
                                    <div className="value small">
                                        <LinkToGroup id={txnInstance.getGroup()} blockId={txnInstance.getBlock()}></LinkToGroup>
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
                    <TransactionMultiSig transaction={txnObj}></TransactionMultiSig>
                    <TransactionLogicSig transaction={txnObj}></TransactionLogicSig>
                    <TransactionAdditionalDetails transaction={txnObj}></TransactionAdditionalDetails>
                </div>}

            </div>}




        </div>
    </div>);
}

export default Transaction;
