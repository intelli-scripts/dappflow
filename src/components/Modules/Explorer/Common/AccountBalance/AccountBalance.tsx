import './AccountBalance.scss';
import React, {useEffect, useState} from "react";
import dappflow from "../../../../../utils/dappflow";
import {A_AccountInformation} from "../../../../../packages/core-sdk/types";
import NumberFormat from "react-number-format";
import {defaultAccount} from "../../../../../redux/wallet/actions/wallet";
import {AccountClient} from "../../../../../packages/core-sdk/clients/accountClient";
import {CoreAccount} from "../../../../../packages/core-sdk/classes/core/CoreAccount";
import {microalgosToAlgos} from "algosdk";


interface AccountBalanceProps {
    address: string
}

interface AssetBalanceState{
    account: A_AccountInformation
}

const initialState: AssetBalanceState = {
    account: {
        ...defaultAccount
    },
};

function AccountBalance({address}: AccountBalanceProps): JSX.Element {


    const [
        {account},
        setState
    ] = useState(initialState);

    async function getAccountDetails() {
        const accountClient = new AccountClient(dappflow.network);
        const account = await accountClient.getAccountInformation(address);
        setState(prevState => ({...prevState, account}));
    }

    useEffect(() => {
        getAccountDetails();
    }, []);

    return (<div className={"account-balance-wrapper"}>
        <div className={"account-balance-container"}>

            <NumberFormat
                value={microalgosToAlgos(new CoreAccount(account).getBalance())}
                displayType={'text'}
                thousandSeparator={true}
            ></NumberFormat>
            <span style={{marginLeft: '5px'}}>Algo</span>

        </div>
    </div>);
}

export default AccountBalance;
