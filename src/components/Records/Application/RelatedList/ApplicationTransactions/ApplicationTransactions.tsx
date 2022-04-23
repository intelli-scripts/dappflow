import './ApplicationTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";


function ApplicationTransactions(): JSX.Element {

    const application = useSelector((state: RootState) => state.application);
    const {transactions} = application;

    return (<div className={"application-transactions-wrapper"}>
        <div className={"application-transactions-container"}>
            <div className="application-transactions-body">
                <TransactionsList transactions={transactions}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default ApplicationTransactions;
