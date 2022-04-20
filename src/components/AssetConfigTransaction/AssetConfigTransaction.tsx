import './AssetConfigTransaction.scss';
import React from "react";
import {Grid, Link} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import NumberFormat from "react-number-format";
import {CoreAsset} from "../../packages/core-sdk/classes/CoreAsset";


function AssetConfigTransaction(props): JSX.Element {
    const transaction = props.transaction;

    const shadedClr = pSBC(0.95, theme.palette.primary.main);
    const txnInstance = new CoreTransaction(transaction.information);
    const assetConfig = txnInstance.getAssetConfigPayload();
    const assetInstance = new CoreAsset(assetConfig);

    const isCreate = assetConfig["asset-id"] ? false : true;


    return (<div className={"asset-config-transaction-wrapper"}>
        <div className={"asset-config-transaction-container"}>
            <div className="asset-config-transaction-header">
                Asset config
            </div>
            <div className="asset-config-transaction-body">

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
                                    Action
                                </div>
                                <div className="value">
                                    {isCreate ? 'Creation' : 'Reconfiguration'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Asset ID
                                </div>
                                <div className="value">
                                    <Link href={"/asset/" + txnInstance.getAssetId()}>{txnInstance.getAssetId()} {assetInstance.getName() ? '(' + assetInstance.getName() + ')' : ''}</Link>
                                </div>
                            </div>
                        </Grid>


                        {isCreate ? [
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={2}>
                                <div className="property">
                                    <div className="key">
                                        Asset name
                                    </div>
                                    <div className="value">
                                        {assetInstance.getName()}
                                    </div>
                                </div>
                            </Grid>,
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={3}>
                                <div className="property">
                                    <div className="key">
                                        Asset unit
                                    </div>
                                    <div className="value">
                                        {assetInstance.getUnitName()}
                                    </div>
                                </div>
                            </Grid>,
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={4}>
                                <div className="property">
                                    <div className="key">
                                        URL
                                    </div>
                                    <div className="value small">
                                        {assetInstance.getUrl() ? <Link href={assetInstance.getUrl()} target={"_blank"}>{assetInstance.getUrl()}</Link> : ''}
                                    </div>
                                </div>
                            </Grid>,
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={5}>
                                <div className="property">
                                    <div className="key">
                                        Total supply
                                    </div>
                                    <div className="value">
                                        <NumberFormat
                                            value={assetInstance.getTotalSupply()}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        ></NumberFormat>
                                        <span style={{marginLeft: 5}}>{assetInstance.getUnitName()}</span>
                                    </div>
                                </div>
                            </Grid>,
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={6}>
                                <div className="property">
                                    <div className="key">
                                        Decimals
                                    </div>
                                    <div className="value">
                                        {assetInstance.getDecimals()}
                                    </div>
                                </div>
                            </Grid>,
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={6}>
                                <div className="property">
                                    <div className="key">
                                        Default frozen
                                    </div>
                                    <div className="value">
                                        {assetInstance.getDefaultFrozen() ? 'True' : 'False'}
                                    </div>
                                </div>
                            </Grid>
                        ] : ''}










                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Manager account
                                </div>
                                <div className="value small">
                                    {assetInstance.hasManager() ? <Link href={"/account/" + assetInstance.getManager()}>{assetInstance.getManager()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Reserve account
                                </div>
                                <div className="value small">
                                    {assetInstance.hasReserve() ? <Link href={"/account/" + assetInstance.getReserve()}>{assetInstance.getReserve()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Freeze account
                                </div>
                                <div className="value small">
                                    {assetInstance.hasFreeze() ? <Link href={"/account/" + assetInstance.getFreeze()}>{assetInstance.getFreeze()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Clawback account
                                </div>
                                <div className="value small">
                                    {assetInstance.hasClawback() ? <Link href={"/account/" + assetInstance.getClawback()}>{assetInstance.getClawback()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default AssetConfigTransaction;
