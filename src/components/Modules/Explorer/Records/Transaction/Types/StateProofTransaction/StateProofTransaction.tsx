import './StateProofTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../../../packages/core-sdk/classes/core/CoreTransaction";
import LinkToAccount from "../../../../Common/Links/LinkToAccount";
import {shadedClr} from "../../../../../../../utils/common";
import ReactJson from "react-json-view";


function StateProofTransaction(props): JSX.Element {
    const {transaction} = props;
    const txnInstance = new CoreTransaction(transaction);
    const stateProofPayload = txnInstance.getStateProofPayload();


    return (<div className={"state-proof-transaction-wrapper"}>
        <div className={"state-proof-transaction-container"}>
            <div className="state-proof-transaction-header">
                State proof
            </div>
            <div className="state-proof-transaction-body">

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Sender
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getFrom()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid>


                    </Grid>
                </div>


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Message
                                </div>
                                <div className="value small">
                                    <ReactJson src={stateProofPayload.message} name={false} displayObjectSize={false} displayDataTypes={false} enableClipboard={false} iconStyle={"square"}/>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>

                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Proof
                                </div>
                                <div className="value small">
                                    <ReactJson src={stateProofPayload["state-proof"]} name={false} collapsed={1} displayObjectSize={false} displayDataTypes={false} enableClipboard={false} iconStyle={"square"}/>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default StateProofTransaction;
