import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Lists/Accounts/Accounts";
import Transactions from "../Lists/Transactions/Transactions";
import DeveloperApi from '../../DeveloperApi/DeveloperApi';
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
import Settings from "../../Settings/Settings";
import Group from "../Records/Group/Group";
import GroupTransactions from "../Records/Group/RelatedList/GroupTransactions/GroupTransactions";
import AccountAssets from "../Records/Account/RelatedList/AccountAssets/AccountAssets";
import AccountOptedApplications
    from "../Records/Account/RelatedList/AccountOptedApplications.tsx/AccountOptedApplications";

function ExplorerRouter(): JSX.Element {


    return (<div>

        <BrowserRouter>
            <Header></Header>
            <Routes>

            </Routes>
            <Settings></Settings>
        </BrowserRouter>
    </div>);
}

export default ExplorerRouter;
