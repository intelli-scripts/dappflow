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
                    <div className="value small">
                        {accounts.map((account) => {
                            return <span key={account}><LinkToAccount address={account}></LinkToAccount></span>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignAccounts;
