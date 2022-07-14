import './AssetTransactions.scss';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import TransactionsList from "../../../../Lists/TransactionsList/TransactionsList";
import {loadAssetTransactions} from "../../../../../redux/actions/asset";


function AssetTransactions(): JSX.Element {

    const asset = useSelector((state: RootState) => state.asset);
    const {transactions} = asset.transactionsDetails;
    const dispatch = useDispatch();

    function reachedLastPage() {
        dispatch(loadAssetTransactions(asset.information.index));
    }

    return (<div className={"asset-transactions-wrapper"}>
        <div className={"asset-transactions-container"}>
            <div className="asset-transactions-body">
                <TransactionsList transactions={transactions} reachedLastPage={reachedLastPage} loading={asset.transactionsDetails.loading}></TransactionsList>
            </div>
        </div>
    </div>);
}

export default AssetTransactions;
