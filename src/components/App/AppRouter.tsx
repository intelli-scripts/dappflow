import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Loader from "../Common/Loader/Loader";
import AppSnackbar from "./AppSnackbar";


function AppRouter(): JSX.Element {


    return (<div>
        <BrowserRouter>
            <div className="app-container">
                <div className="app-header">
                    header
                </div>
                <div className="app-right">
                    <div className="content-wrapper">
                        <div className="content-container">
                            <Routes>
                                <Route path="/swap" element={<div>swap</div>}></Route>
                                <Route path="*" element={<Navigate to="/explorer" replace />}/>
                            </Routes>
                        </div>

                    </div>
                </div>
            </div>
            <Loader></Loader>
            <AppSnackbar></AppSnackbar>
        </BrowserRouter>
    </div>);
}

export default AppRouter;
