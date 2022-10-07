import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";

import Explorer from "../Modules/Explorer/Explorer/Explorer";
import Home from "../Modules/Explorer/Home/Home";
import Accounts from "../Modules/Explorer/Lists/Accounts/Accounts";
import Transactions from "../Modules/Explorer/Lists/Transactions/Transactions";
import Assets from "../Modules/Explorer/Lists/Assets/Assets";
import Applications from "../Modules/Explorer/Lists/Applications/Applications";
import DeveloperApi from "../Modules/DeveloperApi/DeveloperApi";
import Account from "../Modules/Explorer/Records/Account/Account";
import AccountAssets from "../Modules/Explorer/Records/Account/RelatedList/AccountAssets/AccountAssets";
import AccountTransactions from "../Modules/Explorer/Records/Account/RelatedList/AccountTransactions/AccountTransactions";
import AccountCreatedAssets
    from "../Modules/Explorer/Records/Account/RelatedList/AccountCreatedAssets.tsx/AccountCreatedAssets";
import AccountCreatedApplications
    from "../Modules/Explorer/Records/Account/RelatedList/AccountCreatedApplications.tsx/AccountCreatedApplications";
import AccountOptedApplications
    from "../Modules/Explorer/Records/Account/RelatedList/AccountOptedApplications.tsx/AccountOptedApplications";
import Block from "../Modules/Explorer/Records/Block/Block";
import BlockTransactions from "../Modules/Explorer/Records/Block/RelatedList/BlockTransactions/BlockTransactions";
import Asset from "../Modules/Explorer/Records/Asset/Asset";
import AssetTransactions from "../Modules/Explorer/Records/Asset/RelatedList/AssetTransactions/AssetTransactions";
import Application from "../Modules/Explorer/Records/Application/Application";
import ApplicationTransactions
    from "../Modules/Explorer/Records/Application/RelatedList/ApplicationTransactions/ApplicationTransactions";
import Transaction from "../Modules/Explorer/Records/Transaction/Transaction";
import Group from "../Modules/Explorer/Records/Group/Group";
import GroupTransactions from "../Modules/Explorer/Records/Group/RelatedList/GroupTransactions/GroupTransactions";
import {Grid} from "@mui/material";
import LeftBar from "../LeftBar/LeftBar";
import Settings from "../LeftBar/Settings/Settings";
import Loader from "../Common/Loader/Loader";
import AppSnackbar from "./AppSnackbar";
import Arc from "../Modules/ArcPortal/Arc/Arc";
import ArcOverview from "../Modules/ArcPortal/Arc/RelatedList/ArcOverview/ArcOverview";
import IndexerApi from "../Modules/DeveloperApi/IndexerApi/IndexerApi";
import AlgodApi from "../Modules/DeveloperApi/AlgodApi/AlgodApi";
import ArcPortal from "../Modules/ArcPortal/ArcPortal/ArcPortal";
import ArcWorkspace from "../Modules/ArcPortal/Arc/RelatedList/ArcWorkspace/ArcWorkspace";
import ABIStudio from "../Modules/ABI/ABIStudio/ABIStudio";
import Dispenser from "../Modules/Dispenser/Dispenser";
import NodeStatus from "../Modules/NodeStatus/NodeStatus";
import ArcHome from "../Modules/ArcPortal/Home/ArcHome";

function AppRouter(): JSX.Element {


    return (<div>
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <LeftBar></LeftBar>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
                    <div className="content-wrapper">
                        <div className="content-container">
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
                                <Route path="/developer-api" element={<DeveloperApi></DeveloperApi>}>
                                    <Route path="indexer" element={<IndexerApi></IndexerApi>} />
                                    <Route path="algod" element={<AlgodApi></AlgodApi>} />
                                    <Route path="" element={<Navigate to="indexer" replace />}/>
                                </Route>
                                <Route path="/arc-portal" element={<ArcPortal></ArcPortal>}>
                                    <Route path="/arc-portal/home" element={<ArcHome></ArcHome>} />
                                    <Route path="/arc-portal/arc/:id" element={<Arc></Arc>}>
                                        <Route path="overview" element={<ArcOverview></ArcOverview>} />
                                        <Route path="workspace" element={<ArcWorkspace></ArcWorkspace>} />
                                        <Route path="" element={<Navigate to="overview" replace />}/>
                                    </Route>
                                    <Route index element={<Navigate to="home" replace />} />
                                </Route>
                                <Route path="/abi-studio" element={<ABIStudio></ABIStudio>}></Route>
                                <Route path="/dispenser" element={<Dispenser></Dispenser>}></Route>
                                <Route path="/node-status" element={<NodeStatus></NodeStatus>}></Route>
                                <Route path="*" element={<Navigate to="/explorer" replace />}/>
                            </Routes>
                        </div>

                    </div>
                </Grid>
            </Grid>


            <Settings></Settings>
            <Loader></Loader>
            <AppSnackbar></AppSnackbar>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
