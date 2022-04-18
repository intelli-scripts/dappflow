import './Transaction.scss';
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Link, Typography} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {loadTransaction} from "../../redux/actions/transaction";
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../AlgoIcon/AlgoIcon";
import {TXN_TYPES} from "../../packages/core-sdk/constants";
import PaymentTransaction from '../PaymentTransaction/PaymentTransaction';
import NumberFormat from "react-number-format";
import {ExpandMore} from "@mui/icons-material";


function Transaction(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const {id} = params;

    const transaction = useSelector((state: RootState) => state.transaction);
    const shadedClr = pSBC(0.95, theme.palette.primary.main);

    const txnInstance = new CoreTransaction(transaction.information);
    console.log(transaction.information);

    useEffect(() => {
        dispatch(loadTransaction(id));
    }, [dispatch, id]);

    return (<div className={"transaction-wrapper"}>
        <div className={"transaction-container"}>
            <div className="transaction-header">
                Transaction overview
            </div>
            <div className="transaction-body">
                <div className="index">
                    #{txnInstance.getId()}
                </div>


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Type
                                </div>
                                <div className="value">
                                    {txnInstance.getTypeDisplayValue()}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Block
                                </div>
                                <div className="value">
                                    <Link href={"/block/" + txnInstance.getBlock()}>{txnInstance.getBlock()}</Link>
                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Fee
                                </div>
                                <div className="value">
                                    {microalgosToAlgos(txnInstance.getFee())}
                                    <span style={{marginLeft: 5}}><AlgoIcon></AlgoIcon></span>

                                </div>
                            </div>
                        </Grid>



                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Timestamp
                                </div>
                                <div className="value">
                                    {txnInstance.getTimestamp()}
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>


                {txnInstance.getType() === TXN_TYPES.PAYMENT ? <PaymentTransaction transaction={transaction}></PaymentTransaction> : ''}


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Note
                                </div>
                                <div className="value small">
                                    {txnInstance.getNote()}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>




                <div className="props" style={{background: shadedClr}}>

                    <Accordion className="rounded">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            id="additional-information"
                        >
                            <Typography>Additional information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="property">
                                        <div className="key">
                                            First round
                                        </div>
                                        <div className="value">
                                            {txnInstance.getFirstRound()}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="property">
                                        <div className="key">
                                            Last round
                                        </div>
                                        <div className="value">
                                            {txnInstance.getLastRound()}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="property">
                                        <div className="key">
                                            Sender rewards
                                        </div>
                                        <div className="value">
                                            <NumberFormat
                                                value={microalgosToAlgos(txnInstance.getSenderRewards())}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                style={{marginRight: 5}}
                                            ></NumberFormat>
                                            <AlgoIcon></AlgoIcon>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                    <div className="property">
                                        <div className="key">
                                            Receiver rewards
                                        </div>
                                        <div className="value">
                                            <NumberFormat
                                                value={microalgosToAlgos(txnInstance.getReceiverRewards())}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                style={{marginRight: 5}}
                                            ></NumberFormat>
                                            <AlgoIcon></AlgoIcon>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </AccordionDetails>
                    </Accordion>



                </div>





            </div>
        </div>
    </div>);
}

export default Transaction;
