import './Transactions.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {loadTransactions} from "../../../redux/actions/transactions";
import TransactionsList from "../TransactionsList/TransactionsList";


function Transactions(): JSX.Element {
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactions);
    const {list} = transactions;


    useEffect(() => {
        dispatch(loadTransactions());
    }, [dispatch]);

    return (<div className={"transactions-wrapper"}>
        <div className={"transactions-container"}>
            <div className="transactions-body">
                <TransactionsList transactions={list}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default Transactions;
