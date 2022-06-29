import './AppCallTxnArguments.scss';
import React from "react";
import {shadedClr} from "../../../../../../../utils/common";



function AppCallTxnArguments(props): JSX.Element {

    let args: string[] = props.args;

    return (<div className={"app-call-txn-arguments-wrapper"}>
        <div className={"app-call-txn-arguments-container"}>



            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Application args
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
