import './AccountTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";


function AccountTransactions(): JSX.Element {

    const account = useSelector((state: RootState) => state.account);
    const {transactions} = account;
    return (<div className={"account-transactions-wrapper"}>
        <div className={"account-transactions-container"}>
            <div className="account-transactions-body">
                <TransactionsList transactions={transactions}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default AccountTransactions;
