import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";

function AppRouter(): JSX.Element {
    return (<div>

        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/accounts" element={<Accounts></Accounts>} />
                <Route
                    path="*"
                    element={<Navigate to="/accounts" replace />}
                />
            </Routes>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
