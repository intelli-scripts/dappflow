import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";
import Transactions from "../Transactions/Transactions";
import Api from '../Api/Api';

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
                <Route path="/api" element={<Api></Api>} />
                <Route
                    path="*"
                    element={<Navigate to="/accounts" replace />}
                />
            </Routes>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
