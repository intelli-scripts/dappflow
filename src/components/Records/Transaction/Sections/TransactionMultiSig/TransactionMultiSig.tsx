import './TransactionMultiSig.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {shadedClr} from "../../../../../utils/common";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";


function TransactionMultiSig(props): JSX.Element {

    const {transaction} = props;
    const txnInstance = new CoreTransaction(transaction);
    const sig = txnInstance.getSig();
    console.log(txnInstance.getMultiSigSubSignatures());

    return (<div className={"transaction-multi-sig-wrapper"}>
        <div className={"transaction-multi-sig-container"}>

            {txnInstance.isMultiSig() ? <div>
                <div className="transaction-multi-sig-header">
                    MultiSig
                </div>
                <div className="transaction-multi-sig-body">
                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Version
                                    </div>
                                    <div className="value">
                                        {sig.multisig.version}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Threshold
                                    </div>
                                    <div className="value">
                                        {sig.multisig.threshold}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Subsignatures
                                    </div>
                                    <div className="value">
                                        {txnInstance.getMultiSigSubSignatures().map((addr) => {
                                            return <div className="sub-sig" key={addr}><LinkToAccount address={addr}></LinkToAccount></div>;
                                        })}
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

export default TransactionMultiSig;
