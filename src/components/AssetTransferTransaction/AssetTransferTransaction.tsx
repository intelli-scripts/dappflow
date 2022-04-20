import './AssetTransferTransaction.scss';
import React from "react";
import {Grid, Link} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import NumberFormat from "react-number-format";
import {CoreAsset} from "../../packages/core-sdk/classes/CoreAsset";


function AssetTransferTransaction(props): JSX.Element {
    const transaction = props.transaction;

    const shadedClr = pSBC(0.95, theme.palette.primary.main);
    const txnInstance = new CoreTransaction(transaction.information);
    const assetInstance = new CoreAsset(transaction.asset.information);


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
                                    <Link href={"/account/" + txnInstance.getFrom()}>{txnInstance.getFrom()}</Link>
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Receiver
                                </div>
                                <div className="value small">
                                    <Link href={"/account/" + txnInstance.getTo()}>{txnInstance.getTo()}</Link>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Asset
                                </div>
                                <div className="value">
                                    <Link href={"/asset/" + txnInstance.getAssetId()}>{txnInstance.getAssetId()} ({assetInstance.getName()})</Link>
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




                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default AssetTransferTransaction;
