import './AppCallTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import AppCallTxnGlobalStateDelta from "./Sections/AppCallTxnGlobalStateDelta/AppCallTxnGlobalStateDelta";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";
import LinkToApplication from "../../../../Common/Links/LinkToApplication";
import {shadedClr} from "../../../../../utils/common";
import AppCallTxnLocalStateDelta from "./Sections/AppCallTxnLocalStateDelta/AppCallTxnLocalStateDelta";
import AppCallTxnInnerTxns from "./Sections/AppCallTxnInnerTxns/AppCallTxnInnerTxns";
import AppCallTxnArguments from "./Sections/AppCallTxnArguments/AppCallTxnArguments";
import AppCallTxnForeignAssets from "./Sections/AppCallTxnForeignAssets/AppCallTxnForeignAssets";
import AppCallTxnForeignApps from "./Sections/AppCallTxnForeignApps/AppCallTxnForeignApps";
import AppCallTxnForeignAccounts from "./Sections/AppCallTxnForeignAccounts/AppCallTxnForeignAccounts";


function AppCallTransaction(props): JSX.Element {
    const {transaction} = props;

    const txnInstance = new CoreTransaction(transaction);
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


                {txnInstance.hasAppCallArguments() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnArguments args={appCallPayload['application-args']}></AppCallTxnArguments>
                        </Grid>
                    </Grid>
                </div> : ''}


                {txnInstance.hasAppCallForeignAssets() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnForeignAssets assets={appCallPayload['foreign-assets']}></AppCallTxnForeignAssets>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasAppCallForeignApps() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnForeignApps apps={appCallPayload['foreign-apps']}></AppCallTxnForeignApps>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasAppCallForeignAccounts() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnForeignAccounts accounts={appCallPayload['accounts']}></AppCallTxnForeignAccounts>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasGlobalStateDelta() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnGlobalStateDelta state={transaction["global-state-delta"]}></AppCallTxnGlobalStateDelta>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasLocalStateDelta() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnLocalStateDelta state={transaction["local-state-delta"]}></AppCallTxnLocalStateDelta>
                        </Grid>
                    </Grid>
                </div> : ''}

                {txnInstance.hasInnerTransactions() ? <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <AppCallTxnInnerTxns id={txnInstance.getId()} txns={transaction["inner-txns"]}></AppCallTxnInnerTxns>
                        </Grid>
                    </Grid>
                </div> : ''}

            </div>
        </div>
    </div>);
}

export default AppCallTransaction;
