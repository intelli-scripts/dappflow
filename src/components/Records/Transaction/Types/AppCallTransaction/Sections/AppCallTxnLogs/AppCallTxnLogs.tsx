import './AppCallTxnLogs.scss';
import React, {useState} from "react";
import {shadedClr} from "../../../../../../../utils/common";
import {Button, ButtonGroup} from "@mui/material";
import {NOTE_ENCRYPTIONS} from "../../../../../../../packages/core-sdk/constants";
import atob from 'atob';


interface AppCallTxnLogsState{
    noteEncryption: string,
}
const initialState: AppCallTxnLogsState = {
    noteEncryption: NOTE_ENCRYPTIONS.BASE64
};

function AppCallTxnLogs(props): JSX.Element {

    let logs: string[] = props.logs;

    const [
        {noteEncryption},
        setState
    ] = useState(initialState);

    function setNoteEncryption(encryption: string) {
        setState(prevState => ({...prevState, noteEncryption: encryption}));
    }

    return (<div className={"app-call-txn-logs-wrapper"}>
        <div className={"app-call-txn-logs-container"}>



            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Logs
                        <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                            <Button variant={noteEncryption === NOTE_ENCRYPTIONS.TEXT ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.TEXT)}}>Text</Button>
                            <Button variant={noteEncryption === NOTE_ENCRYPTIONS.BASE64 ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.BASE64)}}>Base 64</Button>
                        </ButtonGroup>
                    </div>
                    <div className="value small">
                        {logs.map((log, index) => {
                            return <div key={index} className="item">
                                {noteEncryption === NOTE_ENCRYPTIONS.BASE64 ? log : atob(log)}
                            </div>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnLogs;
