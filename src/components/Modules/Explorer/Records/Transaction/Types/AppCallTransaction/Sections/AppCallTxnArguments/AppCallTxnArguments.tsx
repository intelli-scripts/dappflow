import './AppCallTxnArguments.scss';
import React, {useEffect, useState} from "react";
import {A_SearchTransaction_App_Call_Payload} from "../../../../../../../../../packages/core-sdk/types";
import {Button, ButtonGroup, Grid} from "@mui/material";
import {ApplicationABI} from "../../../../../../../../../packages/abi/classes/ApplicationABI";
import {CoreAppCall} from "../../../../../../../../../packages/core-sdk/classes/CoreAppCall";
import {ABIContractParams} from "algosdk";


interface AppCallTxnArgumentsState{
    textEncoding: string,
    showEncoding: boolean,
    abi?: ABIContractParams
}

const initialState: AppCallTxnArgumentsState = {
    textEncoding: 'plain_text',
    showEncoding: false
};

function AppCallTxnArguments(props): JSX.Element {

    const appCallPayload: A_SearchTransaction_App_Call_Payload = props.appCallPayload;
    const callInstance = new CoreAppCall(appCallPayload);
    const args = callInstance.getAppCallArguments();
    const isCreate = callInstance.isCreate();

    useEffect(() => {
        async function loadABI() {
            const abiDetails = await new ApplicationABI().get(appCallPayload['application-id']);
            if (abiDetails) {
                setState(prevState => ({...prevState, abi: abiDetails.abi, showEncoding: true}));
            }
        }

        if (!isCreate) {
            loadABI();
        }
    }, []);
    const [
        {textEncoding, showEncoding, abi},
        setState
    ] = useState(initialState);

    const abiDecodedArgs = callInstance.getABIDecodedArgs(abi);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"app-call-txn-arguments-wrapper"}>
        <div className={"app-call-txn-arguments-container"}>

            <div className="props">
                <div className="property">
                    <div className="key">
                        Application args

                        {showEncoding ? <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                            <Button variant={textEncoding === 'plain_text' ? 'contained' : 'outlined'} onClick={() => {setTextEncoding("plain_text")}}>Plain text</Button>
                            <Button variant={textEncoding === 'abi_decoded' ? 'contained' : 'outlined'} onClick={() => {setTextEncoding("abi_decoded")}}>ABI decoded</Button>
                        </ButtonGroup> :''}


                    </div>
                    <div className="value">
                        {textEncoding === 'plain_text' ? <div className="plain-args">
                            {args.map((arg, index) => {
                                return <div key={index + '_' + arg} className="item">{arg}</div>;
                            })}
                        </div> : ''}


                        {textEncoding === 'abi_decoded' ? <div className="abi-decoded-args">
                            <div className="arguments">
                                <div className="arguments-header">
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            Name
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            Type
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={1} lg={1} xl={1}>
                                            Decoded
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={5} lg={5} xl={5}>
                                            Decoded value
                                        </Grid>

                                    </Grid>
                                </div>


                                {abiDecodedArgs.map((arg) => {
                                    return <div className="arg" key={arg.name}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                                <div className="arg-prop">{arg.name}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                                <div className="arg-prop">{arg.type.toString()}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={1} lg={1} xl={1}>
                                                <div className="arg-prop">{arg.decoded ? 'Yes' : 'No'}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={5} lg={5} xl={5}>
                                                <div className="arg-prop">{arg.decodedValue}</div>
                                            </Grid>

                                        </Grid>
                                    </div>;
                                })}

                            </div>
                        </div> : ''}



                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnArguments;
