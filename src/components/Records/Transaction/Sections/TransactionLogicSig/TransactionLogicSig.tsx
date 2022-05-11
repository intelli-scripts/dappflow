import './TransactionLogicSig.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {shadedClr} from "../../../../../utils/common";


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
                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Logic program
                                    </div>
                                    <div className="value small">
                                        {sig.logicsig.logic}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div> : ''}




        </div>
    </div>);
}

export default TransactionLogicSig;
