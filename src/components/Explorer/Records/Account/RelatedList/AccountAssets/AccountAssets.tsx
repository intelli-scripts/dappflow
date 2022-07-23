import './AccountAssets.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import AssetsList from "../../../../Lists/AssetsList/AssetsList";

function AccountAssets(): JSX.Element {
    const account = useSelector((state: RootState) => state.account);
    const {optedAssets} = account;

    return (<div className={"account-assets-wrapper"}>
        <div className={"account-assets-container"}>
            <div className="account-assets-body">
                <AssetsList assets={optedAssets} accountInfo={account.information} fields={['name', 'index', 'balance']}></AssetsList>
            </div>
        </div>
    </div>);
}

export default AccountAssets;
