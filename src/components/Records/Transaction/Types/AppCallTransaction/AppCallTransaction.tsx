import './AppCallTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import AppCallTxnGlobalStateDelta from "./Sections/AppCallTxnGlobalStateDelta/AppCallTxnGlobalStateDelta";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";
import LinkToAsset from "../../../../Common/Links/LinkToAsset";
import LinkToApplication from "../../../../Common/Links/LinkToApplication";
import {shadedClr} from "../../../../../utils/common";
import AppCallTxnLocalStateDelta from "./Sections/AppCallTxnLocalStateDelta/AppCallTxnLocalStateDelta";


function AppCallTransaction(props): JSX.Element {
    const transaction = props.transaction;

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
                                    <LinkToApplication id={txnInstance.getAppId()}></LinkToApplication>
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


                {appCallPayload["application-args"] && appCallPayload["application-args"].length > 0 ? <div className="props" style={{background: shadedClr}}>
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
                </div> : ''}


                {appCallPayload["foreign-assets"] && appCallPayload["foreign-assets"].length > 0 ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign assets
                                </div>
                                <div className="value">
                                    {appCallPayload["foreign-assets"].map((asset) => {
                                        return <span key={asset}><LinkToAsset id={asset}></LinkToAsset></span>;
                                    })}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}


                {appCallPayload["foreign-apps"] && appCallPayload["foreign-apps"].length > 0 ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign apps
                                </div>
                                <div className="value">
                                    {appCallPayload["foreign-apps"].map((app) => {
                                        return <span key={app}><LinkToApplication id={app}></LinkToApplication></span>
                                    })}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}


                {appCallPayload["accounts"] && appCallPayload["accounts"].length > 0 ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Foreign accounts
                                </div>
                                <div className="value">
                                    {appCallPayload["accounts"].map((account) => {
                                        return <span key={account}><LinkToAccount address={account}></LinkToAccount></span>;
                                    })}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}


                {transaction.information["global-state-delta"] && transaction.information["global-state-delta"].length > 0 ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnGlobalStateDelta state={transaction.information["global-state-delta"]}></AppCallTxnGlobalStateDelta>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasLocalStateDelta() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnLocalStateDelta state={transaction.information["local-state-delta"]}></AppCallTxnLocalStateDelta>
                        </Grid>
                    </Grid>
                </div> : ''}


            </div>
        </div>
    </div>);
}

export default AppCallTransaction;
