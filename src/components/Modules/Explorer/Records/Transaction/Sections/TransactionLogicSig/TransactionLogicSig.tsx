import './TransactionLogicSig.scss';
import React from "react";
import {CoreTransaction} from "../../../../../../../packages/core-sdk/classes/core/CoreTransaction";
import ApplicationProgram from "../../../Application/Sections/ApplicationProgram/ApplicationProgram";


function TransactionLogicSig(props): JSX.Element {

    const {transaction} = props;
    const txnInstance = new CoreTransaction(transaction);
    const sig = txnInstance.getSig();

    return (<div className={"transaction-logic-sig-wrapper"}>
        <div className={"transaction-logic-sig-container"}>

            {txnInstance.isLogicSig() ? <div>
                <div className="transaction-logic-sig-header">
                    LogicSig
                </div>
                <div className="transaction-logic-sig-body">

                    <ApplicationProgram name="Logic program" program={sig.logicsig.logic}></ApplicationProgram>

                </div>

            </div> : ''}




        </div>
    </div>);
}

export default TransactionLogicSig;
