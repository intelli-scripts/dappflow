import './AccountTransactions.scss';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";
import {loadAccountTransactions} from "../../../../../../../redux/explorer/actions/account";


function AccountTransactions(): JSX.Element {

    const account = useSelector((state: RootState) => state.account);
    const {transactions} = account.transactionsDetails;
    const dispatch = useDispatch();

    function reachedLastPage(value) {
        dispatch(loadAccountTransactions(account.information));
    }

    return (<div className={"account-transactions-wrapper"}>
        <div className={"account-transactions-container"}>
            <div className="account-transactions-body">
                <TransactionsList transactions={transactions} reachedLastPage={reachedLastPage} loading={account.transactionsDetails.loading} record="account" recordId={account.information.address}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default AccountTransactions;
