import './AppCallTransaction.scss';
import React from "react";
import {Alert, Grid, Link} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import AppCallTxnGlobalStateDelta from "../AppCallTxnGlobalStateDelta/AppCallTxnGlobalStateDelta";
import LinkToAccount from "../Links/LinkToAccount";


function AppCallTransaction(props): JSX.Element {
    const transaction = props.transaction;

    const shadedClr = pSBC(0.95, theme.palette.primary.main);
    const txnInstance = new CoreTransaction(transaction.information);
    const appCallPayload = txnInstance.getAppCallPayload();

    const isCreate = appCallPayload["application-id"] ? false : true;

    return (<div className={"app-call-transaction-wrapper"}>
        <div className={"app-call-transaction-container"}>
            <div className="app-call-transaction-header">
                Application call
            </div>
            <div className="app-call-transaction-body">

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
                                    Application ID
                                </div>
                                <div className="value">
                                    <Link href={"/application/" + txnInstance.getAppId()}>{txnInstance.getAppId()}</Link>
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Action
                                </div>
                                <div className="value">
                                    {isCreate ? 'Creation' : 'Call'}
                                </div>
                            </div>
                        </Grid>



                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    On completion
                                </div>
                                <div className="value">
                                    {appCallPayload["on-completion"]}
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>


                {appCallPayload["approval-program"] ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Approval program
                                </div>
                                <div className="value small">
                                    {appCallPayload["approval-program"]}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}


                {appCallPayload["clear-state-program"] ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Clear state program
                                </div>
                                <div className="value small">
                                    {appCallPayload["clear-state-program"]}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Application args
                                </div>
                                <div className="value small">
                                    {appCallPayload["application-args"].map((arg, index) => {
                                        return <div key={index + '_' + arg}>{arg}</div>;
                                    })}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign assets
                                </div>
                                <div className="value">
                                    {appCallPayload["foreign-assets"].map((asset) => {
                                        return <Link href={"/asset/" + asset} key={asset}>{asset}</Link>;
                                    })}
                                    {appCallPayload["foreign-assets"].length === 0 ? <Alert color={"error"} icon={false}>No foreign assets</Alert> : ''}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign apps
                                </div>
                                <div className="value">
                                    {appCallPayload["foreign-apps"].map((app) => {
                                        return <Link href={"/application/" + app} key={app}>{app}</Link>;
                                    })}
                                    {appCallPayload["foreign-apps"].length === 0 ? <Alert color={"error"} icon={false}>No foreign apps</Alert> : ''}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign accounts
                                </div>
                                <div className="value">
                                    {appCallPayload["accounts"].map((account) => {
                                        return <LinkToAccount address={account}></LinkToAccount>;
                                    })}
                                    {appCallPayload["accounts"].length === 0 ? <Alert color={"error"} icon={false}>No foreign accounts</Alert> : ''}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Global state delta
                                </div>
                                <div className="value">
                                    <AppCallTxnGlobalStateDelta state={transaction.information["global-state-delta"]}></AppCallTxnGlobalStateDelta>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default AppCallTransaction;
