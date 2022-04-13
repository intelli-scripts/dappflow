import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";
import Transactions from "../Transactions/Transactions";
import DeveloperApi from '../DeveloperApi/DeveloperApi';
import Account from "../Account/Account";
import AccountTransactions from "../AccountTransactions/AccountTransactions";
import Block from "../Block/Block";
import BlockTransactions from "../BlockTransactions/BlockTransactions";
import Assets from "../Assets/Assets";
import AccountCreatedAssets from "../AccountCreatedAssets.tsx/AccountCreatedAssets";
import Asset from "../Asset/Asset";
import AssetTransactions from "../AssetTransactions/AssetTransactions";
import Applications from "../Applications/Applications";

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
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
