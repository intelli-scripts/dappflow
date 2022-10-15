import './BlockTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";


function BlockTransactions(): JSX.Element {

    const block = useSelector((state: RootState) => state.block);
    const {transactions} = block.information;

    return (<div className={"block-transactions-wrapper"}>
        <div className={"block-transactions-container"}>
            <div className="block-transactions-body">
                <TransactionsList transactions={transactions} fields={['id', 'age', 'from', 'to', 'fee', 'amount', 'type']}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default BlockTransactions;
