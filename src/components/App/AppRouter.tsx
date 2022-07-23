import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";

import Explorer from "../Explorer/Explorer/Explorer";
import Home from "../Explorer/Home/Home";
import Accounts from "../Explorer/Lists/Accounts/Accounts";
import Transactions from "../Explorer/Lists/Transactions/Transactions";
import Assets from "../Explorer/Lists/Assets/Assets";
import Applications from "../Explorer/Lists/Applications/Applications";
import DeveloperApi from "../DeveloperApi/DeveloperApi";
import Account from "../Explorer/Records/Account/Account";
import AccountAssets from "../Explorer/Records/Account/RelatedList/AccountAssets/AccountAssets";
import AccountTransactions from "../Explorer/Records/Account/RelatedList/AccountTransactions/AccountTransactions";
import AccountCreatedAssets
    from "../Explorer/Records/Account/RelatedList/AccountCreatedAssets.tsx/AccountCreatedAssets";
import AccountCreatedApplications
    from "../Explorer/Records/Account/RelatedList/AccountCreatedApplications.tsx/AccountCreatedApplications";
import AccountOptedApplications
    from "../Explorer/Records/Account/RelatedList/AccountOptedApplications.tsx/AccountOptedApplications";
import Block from "../Explorer/Records/Block/Block";
import BlockTransactions from "../Explorer/Records/Block/RelatedList/BlockTransactions/BlockTransactions";
import Asset from "../Explorer/Records/Asset/Asset";
import AssetTransactions from "../Explorer/Records/Asset/RelatedList/AssetTransactions/AssetTransactions";
import Application from "../Explorer/Records/Application/Application";
import ApplicationTransactions
    from "../Explorer/Records/Application/RelatedList/ApplicationTransactions/ApplicationTransactions";
import Transaction from "../Explorer/Records/Transaction/Transaction";
import Group from "../Explorer/Records/Group/Group";
import GroupTransactions from "../Explorer/Records/Group/RelatedList/GroupTransactions/GroupTransactions";
import {Grid} from "@mui/material";
import LeftBar from "../LeftBar/LeftBar";
import Settings from "../Settings/Settings";

function AppRouter(): JSX.Element {


    return (<div>
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <LeftBar></LeftBar>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
                    <div className="content">
                        <Routes>
                            <Route path="/explorer" element={<Explorer></Explorer>}>
                                <Route path="/explorer/home" element={<Home></Home>} />
                                <Route path="/explorer/accounts" element={<Accounts></Accounts>} />
                                <Route path="/explorer/transactions" element={<Transactions></Transactions>} />
                                <Route path="/explorer/assets" element={<Assets></Assets>} />
                                <Route path="/explorer/applications" element={<Applications></Applications>} />
                                <Route path="/explorer/account/:address" element={<Account></Account>}>
                                    <Route path="assets" element={<AccountAssets></AccountAssets>} />
                                    <Route path="transactions" element={<AccountTransactions></AccountTransactions>} />
                                    <Route path="created-assets" element={<AccountCreatedAssets></AccountCreatedAssets>} />
                                    <Route path="created-applications" element={<AccountCreatedApplications></AccountCreatedApplications>} />
                                    <Route path="opted-applications" element={<AccountOptedApplications></AccountOptedApplications>} />
                                    <Route path="" element={<Navigate to="transactions" replace />}/>
                                </Route>
                                <Route path="/explorer/block/:id" element={<Block></Block>}>
                                    <Route path="transactions" element={<BlockTransactions></BlockTransactions>} />
                                    <Route path="" element={<Navigate to="transactions" replace />}/>
                                </Route>
                                <Route path="/explorer/asset/:id" element={<Asset></Asset>}>
                                    <Route path="transactions" element={<AssetTransactions></AssetTransactions>} />
                                    <Route path="" element={<Navigate to="transactions" replace />}/>
                                </Route>
                                <Route path="/explorer/application/:id" element={<Application></Application>}>
                                    <Route path="transactions" element={<ApplicationTransactions></ApplicationTransactions>} />
                                    <Route path="" element={<Navigate to="transactions" replace />}/>
                                </Route>
                                <Route path="/explorer/transaction/:id" element={<Transaction></Transaction>}></Route>
                                <Route path="/explorer/group/:id/:blockId" element={<Group></Group>}>
                                    <Route path="transactions" element={<GroupTransactions></GroupTransactions>} />
                                    <Route path="" element={<Navigate to="transactions" replace />}/>
                                </Route>
                                <Route index element={<Navigate to="home" replace />} />
                            </Route>
                            <Route path="/developer-api" element={<DeveloperApi></DeveloperApi>} />
                            <Route path="/arcs" element={<div style={{marginTop: 200, fontSize: 30}}>Coming soon ...</div>} />
                            <Route path="*" element={<Navigate to="/explorer" replace />}/>
                        </Routes>
                    </div>
                </Grid>
            </Grid>


            <Settings></Settings>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
