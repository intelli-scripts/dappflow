import './AppCallTxnForeignAssets.scss';
import React from "react";
import {shadedClr} from "../../../../../../../../utils/common";
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
                    {assets.map((asset) => {
                        return <div className="value" key={asset}><LinkToAsset id={asset}></LinkToAsset></div>;
                    })}
                </div>
            </div>

        </div>
    </div>);
}

export default AppCallTxnForeignAssets;
