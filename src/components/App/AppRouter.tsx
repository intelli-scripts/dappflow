import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";

function AppRouter(): JSX.Element {
    return (<div>
        <Header></Header>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/transactions" element={<div>transactions</div>} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
