import './AssetBalance.scss';
import React, {useEffect, useState} from "react";
import {AssetClient} from "../../../../../packages/core-sdk/clients/assetClient";
import dappflow from "../../../../../utils/dappflow";
import {A_Asset} from "../../../../../packages/core-sdk/types";
import {CoreAsset} from "../../../../../packages/core-sdk/classes/core/CoreAsset";
import NumberFormat from "react-number-format";
import LinkToAsset from "../Links/LinkToAsset";


interface AssetBalanceProps {
    id: number,
    balance: number,
    by?: string
    assetDef?: A_Asset
}

interface AssetBalanceState{
    asset: A_Asset
}

const initialState: AssetBalanceState = {
    asset: {
        index: 0,
        params: {
            clawback: "",
            creator: "",
            decimals: 0,
            "default-frozen": false,
            freeze: "",
            manager: "",
            name: "",
            "name-b64": "",
            reserve: "",
            total: 0,
            "unit-name": "",
            "unit-name-b64": "",
            url: "",
            "url-b64": "",
            "metadata-hash": "",
        }
    },
};

function AssetBalance({id, balance = 0, by = 'id', assetDef}: AssetBalanceProps): JSX.Element {


    const [
        {asset},
        setState
    ] = useState(initialState);

    async function getAssetDetails() {
        if (by === 'id') {
            const assetClient = new AssetClient(dappflow.network);
            const asset = await assetClient.get(id);
            setState(prevState => ({...prevState, asset}));
        }
        else if (by === 'asset') {
            setState(prevState => ({...prevState, asset: assetDef}));
        }
    }

    useEffect(() => {
        getAssetDetails();
    }, []);

    return (<div className={"asset-balance-wrapper"}>
        <div className={"asset-balance-container"}>

            <NumberFormat
                value={new CoreAsset(asset).getAmountInDecimals(balance)}
                displayType={'text'}
                thousandSeparator={true}
            ></NumberFormat>

            <span style={{marginLeft: '5px'}}>
                <LinkToAsset id={new CoreAsset(asset).getIndex()} name={new CoreAsset(asset).getUnitName()}></LinkToAsset>
            </span>


        </div>
    </div>);
}

export default AssetBalance;
