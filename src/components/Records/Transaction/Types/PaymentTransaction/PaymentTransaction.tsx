import './PaymentTransaction.scss';
import React from "react";
import {Grid} from "@mui/material";
import {theme} from "../../../../../theme";
import pSBC from 'shade-blend-color';
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import AlgoIcon from "../../../../AlgoIcon/AlgoIcon";
import NumberFormat from "react-number-format";
import {microalgosToAlgos} from "algosdk";
import LinkToAccount from "../../../../Links/LinkToAccount";


function PaymentTransaction(props): JSX.Element {
    const transaction = props.transaction;

    const shadedClr = pSBC(0.95, theme.palette.primary.main);
    const txnInstance = new CoreTransaction(transaction.information);


    return (<div className={"payment-transaction-wrapper"}>
        <div className={"payment-transaction-container"}>
            <div className="payment-transaction-header">
                Payment
            </div>
            <div className="payment-transaction-body">

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


                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Receiver
                                </div>
                                <div className="value small">
                                    <LinkToAccount address={txnInstance.getTo()}></LinkToAccount>
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Amount
                                </div>
                                <div className="value">
                                    <NumberFormat
                                        value={microalgosToAlgos(txnInstance.getAmount())}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        style={{marginRight: 5}}
                                    ></NumberFormat>
                                    <AlgoIcon></AlgoIcon>
                                </div>
                            </div>
                        </Grid>




                    </Grid>
                </div>

            </div>
        </div>
    </div>);
}

export default PaymentTransaction;
