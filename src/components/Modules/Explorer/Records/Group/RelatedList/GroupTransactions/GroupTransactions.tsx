import './GroupTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";


function GroupTransactions(): JSX.Element {

    const group = useSelector((state: RootState) => state.group);
    const {transactions} = group.information;

    return (<div className={"group-transactions-wrapper"}>
        <div className={"group-transactions-container"}>
            <div className="group-transactions-body">
                <TransactionsList transactions={transactions} fields={['id', 'age', 'from', 'to', 'fee', 'amount', 'type']}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default GroupTransactions;
