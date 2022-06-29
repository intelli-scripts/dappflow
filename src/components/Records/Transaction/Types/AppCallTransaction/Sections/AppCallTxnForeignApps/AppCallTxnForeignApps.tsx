import './AppCallTxnForeignApps.scss';
import React from "react";
import {shadedClr} from "../../../../../../../utils/common";
import LinkToApplication from "../../../../../../Common/Links/LinkToApplication";



function AppCallTxnForeignApps(props): JSX.Element {

    let apps: number[] = props.apps;

    return (<div className={"app-call-txn-foreign-apps-wrapper"}>
        <div className={"app-call-txn-foreign-apps-container"}>

            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Foreign apps
                    </div>
                    <div className="value">
                        {apps.map((app) => {
                            return <span key={app}><LinkToApplication id={app}></LinkToApplication></span>
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignApps;
