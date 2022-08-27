import './ABIEditor.scss';
import React, {} from "react";
import {A_ABI} from "../../../../packages/core-sdk/types";
import {shadedClr} from "../../../../utils/common";
import ABIMethod from "../ABIMethod/ABIMethod";

function ABIEditor(props): JSX.Element {
    let abi: A_ABI = props.abi;

    if (!abi) {
        abi = {methods: [], name: ""};
    }

    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>
            <div className={"abi-editor-body"}>
                <div className="abi" style={{backgroundColor: shadedClr}}>
                    <div className="abi-header">
                        <div className="abi-name">
                            ABI: {abi.name}
                        </div>
                        <div className="abi-desc">
                            Description: {abi.desc ? abi.desc : '--Empty--'}
                        </div>
                    </div>
                    <div className="abi-body">
                        <div className="methods">
                            <div className="methods-header">
                                Methods
                            </div>
                            <div className="methods-body">
                                {abi.methods.map((method) => {
                                    return <ABIMethod method={method}></ABIMethod>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
