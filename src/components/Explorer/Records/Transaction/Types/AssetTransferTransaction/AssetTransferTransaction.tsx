import './AssetTransferTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../../packages/core-sdk/classes/CoreTransaction";
import NumberFormat from "react-number-format";
import {CoreAsset} from "../../../../../../packages/core-sdk/classes/CoreAsset";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";
import LinkToAsset from "../../../../Common/Links/LinkToAsset";
import {shadedClr} from "../../../../../../utils/common";


function AssetTransferTransaction(props): JSX.Element {
    const {transaction, asset} = props;
    const txnInstance = new CoreTransaction(transaction);
    const assetInstance = new CoreAsset(asset);


    return (<div className={"asset-transfer-transaction-wrapper"}>
        <div className={"asset-transfer-transaction-container"}>
            <div className="asset-transfer-transaction-header">
                Asset transfer
            </div>
            <div className="asset-transfer-transaction-body">

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Sender
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getFrom()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Receiver
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getTo()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Asset
                                </div>
                                <div className="value">
                                    <LinkToAsset id={txnInstance.getAssetId()} name={txnInstance.getAssetId() + '(' + assetInstance.getName() + ')'}></LinkToAsset>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Amount
                                </div>
                                <div className="value">
                                    <NumberFormat
                                        value={assetInstance.getAmountInDecimals(txnInstance.getAmount())}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        style={{marginRight: 5}}
                                    ></NumberFormat>
                                    {assetInstance.getUnitName()}
                                </div>
                            </div>
                        </Grid>



                        {txnInstance.getCloseTo() ? <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Close account
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getCloseTo()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid> : ''}




                        {txnInstance.getCloseTo() ? <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Close amount
                                </div>
                                <div className="value">
                                    <NumberFormat
                                        value={assetInstance.getAmountInDecimals(txnInstance.getCloseAmount())}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        style={{marginRight: 5}}
                                    ></NumberFormat>
                                    {assetInstance.getUnitName()}
                                </div>
                            </div>
                        </Grid> : ''}



                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default AssetTransferTransaction;
