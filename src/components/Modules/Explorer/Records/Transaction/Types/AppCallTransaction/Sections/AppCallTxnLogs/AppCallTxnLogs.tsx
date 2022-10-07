import './AppCallTxnLogs.scss';
import React, {useState} from "react";
import {Button, ButtonGroup} from "@mui/material";
import {TEXT_ENCODING} from "../../../../../../../../../packages/core-sdk/constants";
import atob from 'atob';


interface AppCallTxnLogsState{
    textEncoding: string,
}
const initialState: AppCallTxnLogsState = {
    textEncoding: TEXT_ENCODING.BASE64
};

function AppCallTxnLogs(props): JSX.Element {

    let logs: string[] = props.logs;

    const [
        {textEncoding},
        setState
    ] = useState(initialState);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"app-call-txn-logs-wrapper"}>
        <div className={"app-call-txn-logs-container"}>



            <div className="props">
                <div className="property">
                    <div className="key">
                        Logs
                        <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                            <Button variant={textEncoding === TEXT_ENCODING.TEXT ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.TEXT)}}>Text</Button>
                            <Button variant={textEncoding === TEXT_ENCODING.BASE64 ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.BASE64)}}>Base 64</Button>
                        </ButtonGroup>
                    </div>
                    <div className="value small">
                        {logs.map((log, index) => {
                            return <div key={index} className="item">
                                {textEncoding === TEXT_ENCODING.BASE64 ? log : atob(log)}
                            </div>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnLogs;
