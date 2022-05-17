import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Lists/Accounts/Accounts";
import Transactions from "../Lists/Transactions/Transactions";
import DeveloperApi from '../DeveloperApi/DeveloperApi';
import Account from "../Records/Account/Account";
import AccountTransactions from "../Records/Account/RelatedList/AccountTransactions/AccountTransactions";
import Block from "../Records/Block/Block";
import BlockTransactions from "../Records/Block/RelatedList/BlockTransactions/BlockTransactions";
import Assets from "../Lists/Assets/Assets";
import AccountCreatedAssets from "../Records/Account/RelatedList/AccountCreatedAssets.tsx/AccountCreatedAssets";
import Asset from "../Records/Asset/Asset";
import AssetTransactions from "../Records/Asset/RelatedList/AssetTransactions/AssetTransactions";
import Applications from "../Lists/Applications/Applications";
import AccountCreatedApplications from "../Records/Account/RelatedList/AccountCreatedApplications.tsx/AccountCreatedApplications";
import Application from "../Records/Application/Application";
import ApplicationTransactions from "../Records/Application/RelatedList/ApplicationTransactions/ApplicationTransactions";
import Transaction from "../Records/Transaction/Transaction";
import Settings from "../Settings/Settings";
import Group from "../Records/Group/Group";
import GroupTransactions from "../Records/Group/RelatedList/GroupTransactions/GroupTransactions";

function AppRouter(): JSX.Element {
    return (<div>

        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/accounts" element={<Accounts></Accounts>} />
                <Route path="/transactions" element={<Transactions></Transactions>} />
                <Route path="/assets" element={<Assets></Assets>} />
                <Route path="/applications" element={<Applications></Applications>} />
                <Route path="/developer-api" element={<DeveloperApi></DeveloperApi>} />
                <Route path="/account/:address" element={<Account></Account>}>
                    <Route path="transactions" element={<AccountTransactions></AccountTransactions>} />
                    <Route path="created-assets" element={<AccountCreatedAssets></AccountCreatedAssets>} />
                    <Route path="created-applications" element={<AccountCreatedApplications></AccountCreatedApplications>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="/block/:id" element={<Block></Block>}>
                    <Route path="transactions" element={<BlockTransactions></BlockTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="/asset/:id" element={<Asset></Asset>}>
                    <Route path="transactions" element={<AssetTransactions></AssetTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="/application/:id" element={<Application></Application>}>
                    <Route path="transactions" element={<ApplicationTransactions></ApplicationTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="/transaction/:id" element={<Transaction></Transaction>}></Route>
                <Route path="/group/:id/:blockId" element={<Group></Group>}>
                    <Route path="transactions" element={<GroupTransactions></GroupTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
            <Settings></Settings>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
