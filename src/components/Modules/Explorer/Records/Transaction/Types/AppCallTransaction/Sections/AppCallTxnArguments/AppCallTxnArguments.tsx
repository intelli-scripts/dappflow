import './AppCallTxnArguments.scss';
import React, {useEffect, useState} from "react";
import {shadedClr} from "../../../../../../../../../utils/common";
import {A_SearchTransaction_App_Call_Payload} from "../../../../../../../../../packages/core-sdk/types";
import {Button, ButtonGroup} from "@mui/material";
import {ApplicationABI} from "../../../../../../../../../packages/abi/classes/ApplicationABI";
import {A_ABI} from "../../../../../../../../../packages/abi/types";


interface AppCallTxnArgumentsState{
    textEncoding: string,
    showEncoding: boolean,
    abi?: A_ABI
}
const initialState: AppCallTxnArgumentsState = {
    textEncoding: 'plain_text',
    showEncoding: false
};

function AppCallTxnArguments(props): JSX.Element {

    let args: string[] = props.args;
    const appCallPayload: A_SearchTransaction_App_Call_Payload = props.appCallPayload;
    const isCreate = appCallPayload["application-id"] ? false : true;

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
        {textEncoding, showEncoding},
        setState
    ] = useState(initialState);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"app-call-txn-arguments-wrapper"}>
        <div className={"app-call-txn-arguments-container"}>

            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Application args

                        {showEncoding ? <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                            <Button variant={textEncoding === 'plain_text' ? 'contained' : 'outlined'} onClick={() => {setTextEncoding("plain_text")}}>Plain text</Button>
                            <Button variant={textEncoding === 'abi_decoded' ? 'contained' : 'outlined'} onClick={() => {setTextEncoding("abi_decoded")}}>ABI decoded</Button>
                        </ButtonGroup> :''}


                    </div>
                    <div className="value small">
                        {args.map((arg, index) => {
                            return <div key={index + '_' + arg} className="item">{arg}</div>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnArguments;
