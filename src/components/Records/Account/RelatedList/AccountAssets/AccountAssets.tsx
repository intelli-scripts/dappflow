import './AccountAssets.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import OptedAssetsList from "../../../../Lists/OptedAssetsList/OptedAssetsList";

function AccountAssets(): JSX.Element {
    const account = useSelector((state: RootState) => state.account);
    const {optedAssets} = account;

    return (<div className={"account-assets-wrapper"}>
        <div className={"account-assets-container"}>
            <div className="account-assets-body">
                <OptedAssetsList assets={optedAssets} accountInfo={account.information}></OptedAssetsList>
            </div>
        </div>
    </div>);
}

export default AccountAssets;
