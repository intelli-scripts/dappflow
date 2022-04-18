import './Transaction.scss';
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Grid, Link} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {loadTransaction} from "../../redux/actions/transaction";
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../AlgoIcon/AlgoIcon";


function Transaction(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const {id} = params;

    const transaction = useSelector((state: RootState) => state.transaction);
    const shadedClr = pSBC(0.95, theme.palette.primary.main);

    console.log(transaction.information);
    const txnInstance = new CoreTransaction(transaction.information);

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

            </div>
        </div>
    </div>);
}

export default Transaction;
