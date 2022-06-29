import './AppCallTxnForeignAssets.scss';
import React from "react";
import {shadedClr} from "../../../../../../../utils/common";
import LinkToAsset from "../../../../../../Common/Links/LinkToAsset";



function AppCallTxnForeignAssets(props): JSX.Element {

    let assets: number[] = props.assets;

    return (<div className={"app-call-txn-foreign-assets-wrapper"}>
        <div className={"app-call-txn-foreign-assets-container"}>

            <div className="props" style={{background: shadedClr}}>
                <div className="property">
                    <div className="key">
                        Foreign assets
                    </div>
                    <div className="value">
                        {assets.map((asset) => {
                            return <span key={asset}><LinkToAsset id={asset}></LinkToAsset></span>;
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignAssets;
