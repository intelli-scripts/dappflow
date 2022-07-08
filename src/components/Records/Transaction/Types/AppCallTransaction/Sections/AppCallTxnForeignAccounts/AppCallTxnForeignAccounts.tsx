import './AppCallTxnForeignAccounts.scss';
import React from "react";
import {shadedClr} from "../../../../../../../utils/common";
import LinkToAccount from "../../../../../../Common/Links/LinkToAccount";



function AppCallTxnForeignAccounts(props): JSX.Element {

    let accounts: string[] = props.accounts;

    return (<div className={"app-call-txn-foreign-accounts-wrapper"}>
        <div className={"app-call-txn-foreign-accounts-container"}>

            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Foreign accounts
                    </div>
                    {accounts.map((account) => {
                        return <div className="value small" key={account}><LinkToAccount address={account}></LinkToAccount></div>;
                    })}
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignAccounts;
