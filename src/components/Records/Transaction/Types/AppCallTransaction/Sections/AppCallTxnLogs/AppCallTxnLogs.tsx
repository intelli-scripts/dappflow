import './AppCallTxnLogs.scss';
import React from "react";
import {shadedClr} from "../../../../../../../utils/common";


function AppCallTxnLogs(props): JSX.Element {

    let logs: string[] = props.logs;

    return (<div className={"app-call-txn-logs-wrapper"}>
        <div className={"app-call-txn-logs-container"}>



            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Logs
                    </div>
                    <div className="value small">
                        {logs.map((log, index) => {
                            return <div key={index} className="item">{log}</div>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnLogs;
