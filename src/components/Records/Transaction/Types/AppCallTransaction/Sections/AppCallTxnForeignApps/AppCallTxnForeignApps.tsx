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
                    {apps.map((app) => {
                        return <div className="value" key={app}><LinkToApplication id={app}></LinkToApplication></div>
                    })}
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignApps;
