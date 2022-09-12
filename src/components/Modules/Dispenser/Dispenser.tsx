import './Dispenser.scss';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";
import {Alert, Button, FormLabel, Grid, TextField} from "@mui/material";
import {CoreNode} from "../../../packages/core-sdk/classes/CoreNode";
import {KmdClient, kmdParams} from "../../../packages/core-sdk/clients/kmdClient";
import {showSnack} from "../../../redux/common/actions/snackbar";
import {isValidAddress} from "algosdk";
import {handleException} from "../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../redux/common/actions/loader";


interface DispenserState{
    address: string
}

const initialState: DispenserState = {
    address: ""
};

function Dispenser(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    const {loadingVersions, versionsCheck} = node;
    const isSandbox = new CoreNode().isSandbox(versionsCheck);
    const dispenerLinks = new CoreNode().getDispenserLinks(versionsCheck);
    const dispatch = useDispatch();

    const [
        {address},
        setState
    ] = useState(initialState);


    async function dispense() {
        const params: kmdParams = {
            port: "4002",
            token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            url: "http://localhost"
        };

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

        try {
            dispatch(showLoader("Checking KMD configuration"));
            const dispenserAccount = await new KmdClient(params).getDispenserAccount();
            dispatch(hideLoader());
            console.log(dispenserAccount);
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }

    }

    return (<div className={"dispenser-wrapper"}>
        <div className={"dispenser-container"}>

            <div className={"dispenser-header"}>
                Dispenser
            </div>
            <div className={"dispenser-body"}>
                {loadingVersions ? <div>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <LoadingTile></LoadingTile>
                        </Grid>
                    </Grid>
                </div> : <div>
                    {isSandbox ? <div className="sandbox-dispenser">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormLabel sx={{color: 'common.black'}}>Target address</FormLabel>
                                <div>
                                    <TextField
                                        multiline={true}
                                        type={"text"}
                                        required
                                        value={address}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, address: ev.target.value + ""}));
                                        }}
                                        sx={{borderRadius: '10px', marginTop: '10px', width: '400px'}}
                                        rows={4}
                                        variant="outlined"
                                    />
                                </div>
                                <div style={{marginTop: '15px'}}>
                                    <Button color={"primary"} variant={"contained"} onClick={() => {
                                        dispense();
                                    }
                                    }>Dispense</Button>
                                </div>

                            </Grid>
                        </Grid>
                    </div> : <div>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
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



        </div>
    </div>);
}

export default Dispenser;
