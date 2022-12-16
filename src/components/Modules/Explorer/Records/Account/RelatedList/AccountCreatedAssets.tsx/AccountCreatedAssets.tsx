import './AccountCreatedAssets.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";
import AssetsList from "../../../../Lists/AssetsList/AssetsList";

function AccountCreatedAssets(): JSX.Element {
    const account = useSelector((state: RootState) => state.account);
    const {createdAssets} = account;

    return (<div className={"account-created-assets-wrapper"}>
        <div className={"account-created-assets-container"}>
            <div className="account-created-assets-body">
                <AssetsList assets={createdAssets}></AssetsList>
            </div>
        </div>
    </div>);
}

export default AccountCreatedAssets;
