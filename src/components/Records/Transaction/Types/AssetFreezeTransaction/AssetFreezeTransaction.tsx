import './AssetFreezeTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {CoreAsset} from "../../../../../packages/core-sdk/classes/CoreAsset";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";
import LinkToAsset from "../../../../Common/Links/LinkToAsset";
import {shadedClr} from "../../../../../utils/common";


function AssetFreezeTransaction(props): JSX.Element {
    const {transaction, asset} = props;
    const txnInstance = new CoreTransaction(transaction);
    const assetInstance = new CoreAsset(asset);


    return (<div className={"asset-freeze-transaction-wrapper"}>
        <div className={"asset-freeze-transaction-container"}>
            <div className="asset-freeze-transaction-header">
                Asset freeze
            </div>
            <div className="asset-freeze-transaction-body">

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





                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Target account
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getAssetFreezeAccount()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    New freeze status
                                </div>
                                <div className="value small">
                                    {txnInstance.getAssetFreezeStatus().toString()}
                                </div>
                            </div>
                        </Grid>



                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default AssetFreezeTransaction;
