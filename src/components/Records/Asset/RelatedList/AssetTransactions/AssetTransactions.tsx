import './AssetTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";


function AssetTransactions(): JSX.Element {

    const asset = useSelector((state: RootState) => state.asset);
    const {transactions} = asset;
    return (<div className={"asset-transactions-wrapper"}>
        <div className={"asset-transactions-container"}>
            <div className="asset-transactions-body">
                <TransactionsList transactions={transactions}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default AssetTransactions;
