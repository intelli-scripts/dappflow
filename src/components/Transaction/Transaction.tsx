import './Transaction.scss';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup,
    Grid,
    Typography
} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {loadTransaction} from "../../redux/actions/transaction";
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../AlgoIcon/AlgoIcon";
import {NOTE_ENCRYPTIONS, TXN_TYPES} from "../../packages/core-sdk/constants";
import PaymentTransaction from '../PaymentTransaction/PaymentTransaction';
import NumberFormat from "react-number-format";
import {ExpandMore} from "@mui/icons-material";
import AssetTransferTransaction from "../AssetTransferTransaction/AssetTransferTransaction";
import AssetConfigTransaction from "../AssetConfigTransaction/AssetConfigTransaction";
import KeyRegTransaction from "../KeyRegTransaction/KeyRegTransaction";
import AppCallTransaction from "../AppCallTransaction/AppCallTransaction";
import LinkToBlock from "../Links/LinkToBlock";


interface TransactionState{
    noteEncryption: string,
}
const initialState: TransactionState = {
    noteEncryption: NOTE_ENCRYPTIONS.BASE64
};

function Transaction(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const {id} = params;

    const transaction = useSelector((state: RootState) => state.transaction);
    const shadedClr = pSBC(0.95, theme.palette.primary.main);

    const txnInstance = new CoreTransaction(transaction.information);
    console.log(transaction.information);

    const [
        {noteEncryption},
        setState
    ] = useState(initialState);

    function setNoteEncryption(encryption: string) {
        setState(prevState => ({...prevState, noteEncryption: encryption}));
    }

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
                                    <LinkToBlock id={txnInstance.getBlock()}></LinkToBlock>
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
                {txnInstance.getType() === TXN_TYPES.ASSET_TRANSFER ? <AssetTransferTransaction transaction={transaction}></AssetTransferTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.ASSET_CONFIG ? <AssetConfigTransaction transaction={transaction}></AssetConfigTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.KEY_REGISTRATION ? <KeyRegTransaction transaction={transaction}></KeyRegTransaction> : ''}
                {txnInstance.getType() === TXN_TYPES.APP_CALL ? <AppCallTransaction transaction={transaction}></AppCallTransaction> : ''}


                {txnInstance.getNote() ? <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="property">
                                <div className="key">
                                    Note
                                    <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                                        <Button variant={noteEncryption === NOTE_ENCRYPTIONS.TEXT ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.TEXT)}}>Text</Button>
                                        <Button variant={noteEncryption === NOTE_ENCRYPTIONS.BASE64 ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.BASE64)}}>Base 64</Button>
                                        <Button variant={noteEncryption === NOTE_ENCRYPTIONS.MSG_PACK ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.MSG_PACK)}}>Message pack</Button>
                                    </ButtonGroup>

                                </div>
                                <div className="value small">
                                    <div style={{marginTop: 30}}>
                                        {txnInstance.getNote(noteEncryption)}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> : ''}





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
