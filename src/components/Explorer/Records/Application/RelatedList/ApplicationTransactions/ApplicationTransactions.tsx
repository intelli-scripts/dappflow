import './ApplicationTransactions.scss';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";
import {loadApplicationTransactions} from "../../../../../../redux/actions/application";


function ApplicationTransactions(): JSX.Element {

    const application = useSelector((state: RootState) => state.application);
    const {transactions} = application.transactionsDetails;
    const dispatch = useDispatch();

    function reachedLastPage() {
        dispatch(loadApplicationTransactions(application.information.id));
    }

    return (<div className={"application-transactions-wrapper"}>
        <div className={"application-transactions-container"}>
            <div className="application-transactions-body">
                <TransactionsList transactions={transactions} reachedLastPage={reachedLastPage} loading={application.transactionsDetails.loading}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default ApplicationTransactions;
