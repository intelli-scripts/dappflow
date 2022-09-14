import './Dispenser.scss';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";
import {Alert, Box, Button, FormLabel, Grid, TextField} from "@mui/material";
import {CoreNode} from "../../../packages/core-sdk/classes/core/CoreNode";
import {KmdClient} from "../../../packages/core-sdk/clients/kmdClient";
import {showSnack} from "../../../redux/common/actions/snackbar";
import algosdk, {isValidAddress, SuggestedParams, waitForConfirmation} from "algosdk";
import {hideLoader, showLoader} from "../../../redux/common/actions/loader";
import dappflow from "../../../utils/dappflow";
import LinkToTransaction from "../Explorer/Common/Links/LinkToTransaction";
import {isNumber} from "../../../utils/common";
import KMDConfiguration from "../../LeftBar/KMDConfiguration/KMDConfiguration";
import {getKMDConfig} from "../../../utils/nodeConfig";
import {KMDConnectionParams} from "../../../packages/core-sdk/types";


interface DispenserState{
    address: string,
    success: boolean
    error: boolean,
    txId: string,
    errMsg: string,
    amount: string,
    showKmdConfig: boolean
}

const initialState: DispenserState = {
    address: "",
    success: false,
    error: false,
    txId: "",
    errMsg: "",
    amount: "",
    showKmdConfig: false
};

function Dispenser(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    const {loadingVersions, versionsCheck} = node;
    const isSandbox = new CoreNode().isSandbox(versionsCheck);
    const dispenerLinks = new CoreNode().getDispenserLinks(versionsCheck);
    const dispatch = useDispatch();

    const [
        {address, success, error, txId, errMsg, amount, showKmdConfig},
        setState
    ] = useState(initialState);

    function resetAttempt() {
        setState(prevState => ({...prevState, success: false, error: false, txId: "", errMsg: ""}));
    }

    function setSuccess(txId: string) {
        setState(prevState => ({...prevState, success: true, error: false, txId, errMsg: "", address: ""}));
    }

    function setError(message: string) {
        setState(prevState => ({...prevState, success: false, error: true, txId: "", errMsg: message}));
    }

    async function dispense() {
        const params: KMDConnectionParams = getKMDConfig();

        if (!address) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid address'
            }));
            return;
        }
        if (!isValidAddress(address)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid address'
            }));
            return;
        }
        if (!amount) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid amount'
            }));
            return;
        }
        if (!isNumber(amount)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid amount'
            }));
            return;
        }

        try {
            resetAttempt();
            dispatch(showLoader("Checking KMD configuration"));
            const dispenserAccount = await new KmdClient(params).getDispenserAccount();
            dispatch(hideLoader());

            dispatch(showLoader("Loading suggested params"));
            const client = dappflow.network.getClient();
            const suggestedParams: SuggestedParams = await client.getTransactionParams().do();
            dispatch(hideLoader());

            dispatch(showLoader(""));
            const amountInMicros = algosdk.algosToMicroalgos(Number(amount));
            const enc = new TextEncoder();
            const note = enc.encode("Dispencing algos from dappflow dispenser");

            const unsignedTxn = algosdk.makePaymentTxnWithSuggestedParams(dispenserAccount.addr, address, amountInMicros, undefined, note, suggestedParams, undefined);
            const signedTxn = unsignedTxn.signTxn(dispenserAccount.sk);

            dispatch(hideLoader());

            dispatch(showLoader("Submitting transaction"));
            const {txId} = await client.sendRawTransaction(signedTxn).do();
            dispatch(hideLoader());

            dispatch(showLoader("Waiting for confirmation"));
            await waitForConfirmation(client, txId, 10);
            dispatch(hideLoader());

            setSuccess(txId);

        }
        catch (e: any) {
            dispatch(hideLoader());
            setError(e.message);
        }

    }

    return (<div className={"dispenser-wrapper"}>
        <div className={"dispenser-container"}>

            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div className={"dispenser-header"}>
                        <div>
                            Dispenser
                        </div>
                        <div>
                            {isSandbox ? <Button
                                size="small"
                                color={"primary"}
                                variant={"outlined"} onClick={() => {
                                setState(prevState => ({...prevState, showKmdConfig: true}));
                            }
                            }>KMD config</Button> : ''}

                        </div>
                    </div>
                    <div className={"dispenser-body"}>
                        {loadingVersions ? <div>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <LoadingTile></LoadingTile>
                                </Grid>
                            </Grid>
                        </div> : <div>
                            {isSandbox ? <div className="sandbox-dispenser">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div>
                                            <FormLabel>Target address</FormLabel>
                                            <div>
                                                <TextField
                                                    multiline={true}
                                                    placeholder="Enter your address"
                                                    type={"text"}
                                                    required
                                                    value={address}
                                                    onChange={(ev) => {
                                                        setState(prevState => ({...prevState, address: ev.target.value + ""}));
                                                    }}
                                                    fullWidth
                                                    sx={{marginTop: '10px', marginBottom: '10px', fieldset: {borderRadius: '10px'}}}
                                                    rows={4}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <FormLabel>Amount</FormLabel>
                                            <div>

                                            </div>
                                            <TextField
                                                type={"number"}
                                                required
                                                size={"medium"}
                                                value={amount}
                                                sx={{marginTop: '5px', marginBottom: '10px', fieldset: {borderRadius: '10px'}}}
                                                onChange={(ev) => {
                                                    setState(prevState => ({...prevState, amount: ev.target.value + ""}));
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: <Box sx={{color: 'grey.500'}}>
                                                        Algos
                                                    </Box>
                                                }}
                                            />
                                        </div>

                                        <div style={{marginTop: '15px', textAlign: "right"}}>
                                            <Button color={"primary"}
                                                    fullWidth
                                                    variant={"contained"} onClick={() => {
                                                dispense();
                                            }
                                            }>Dispense</Button>
                                        </div>

                                        <div style={{marginTop: '30px', wordBreak: "break-all"}}>
                                            {success ? <div>
                                                <Alert icon={false} color={"success"}>
                                                    <div>
                                                        Transaction successful :
                                                    </div>
                                                    <LinkToTransaction id={txId} sx={{color: 'common.black', marginTop: 15}}></LinkToTransaction>
                                                </Alert>

                                            </div> : ''}

                                            {error ? <div>
                                                <Alert icon={false} color={"error"}>
                                                    {errMsg}
                                                </Alert>

                                            </div> : ''}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div> : <div>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Alert icon={false} color={"warning"}>
                                            Dispenser is available only for sandbox environment.
                                            <br/>
                                            {dispenerLinks.length > 0 ? 'Please try below dispensers by community.' : ''}

                                        </Alert>
                                        {dispenerLinks.map((link, index) => {
                                            return <Button color={"warning"} variant={"outlined"} sx={{marginTop: '15px', marginLeft: '10px'}} onClick={() => {
                                                window.open(link, "_blank")
                                            }
                                            }>
                                                Dispenser {index + 1}
                                            </Button>
                                        })}
                                    </Grid>
                                </Grid>

                            </div>}
                        </div>}
                    </div>
                </Grid>
            </Grid>



        <KMDConfiguration show={showKmdConfig} onClose={() => {
            setState(prevState => ({...prevState, showKmdConfig: false}));
        }}></KMDConfiguration>
        </div>
    </div>);
}

export default Dispenser;
