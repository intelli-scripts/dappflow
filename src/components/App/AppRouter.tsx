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

function AppRouter(): JSX.Element {
    return (<div>

        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/accounts" element={<Accounts></Accounts>} />
                <Route path="/transactions" element={<Transactions></Transactions>} />
                <Route path="/assets" element={<div>Assets</div>} />
                <Route path="/applications" element={<div>Applications</div>} />
                <Route path="/developer-api" element={<DeveloperApi></DeveloperApi>} />
                <Route path="/account/:address" element={<Account></Account>}>
                    <Route path="transactions" element={<AccountTransactions></AccountTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="/block/:id" element={<Block></Block>}>
                    <Route path="transactions" element={<BlockTransactions></BlockTransactions>} />
                    <Route path="" element={<Navigate to="transactions" replace />}/>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
