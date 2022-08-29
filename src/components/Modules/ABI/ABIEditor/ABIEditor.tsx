import './ABIEditor.scss';
import React, {} from "react";
import {A_ABI} from "../../../../packages/abi/types";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import ABIMethod from "../ABIMethod/ABIMethod";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {ABI} from "../../../../packages/abi/classes/ABI";
import {Box} from "@mui/material";

function ABIEditor(props): JSX.Element {
    let abi: A_ABI = props.abi;

    if (!abi) {
        abi = {methods: [], name: ""};
    }

    const abiInstance = new ABI(abi);
    const methods = abiInstance.getMethods();
    const networks = abiInstance.getNetworks();
    const hasNetworks = abiInstance.hasNetworks();

    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>
            <div className={"abi-editor-body"}>
                <div className="abi" style={{backgroundColor: shadedClr}}>
                    <Box className="abi-header" sx={{borderColor: shadedClr2 + ' !important'}}>
                        <div>
                            <div className="abi-name">
                                ABI: {abiInstance.getName()}
                            </div>
                            <div className="abi-desc">
                                Description: {abiInstance.getDesc() ? abiInstance.getDesc() : '--Empty--'}
                            </div>
                        </div>
                        <div>
                            <JsonViewer obj={abi} variant="outlined" title="ABI JSON" name="ABI JSON"></JsonViewer>
                        </div>
                    </Box>
                    <div className="abi-body">
                        <Box className="networks" sx={{borderColor: shadedClr2 + ' !important'}}>
                            <div className="networks-header">
                                Networks
                            </div>
                            <div className="networks-body">
                                {!hasNetworks ? <Box sx={{ color: 'warning.main', fontSize: 14}}>
                                    No networks are configured
                                </Box> : <div>
                                    {Object.keys(networks).map((name) => {
                                        return <div className="network">
                                            <div className="network-name">
                                                <Box sx={{color: 'primary.main'}}>
                                                    {name}
                                                </Box>
                                            </div>
                                            <div className="app-id">
                                                {networks[name].appID}
                                            </div>
                                        </div>;
                                    })}
                                </div>}
                            </div>
                        </Box>

                        <div className="methods">
                            <div className="methods-header">
                                Methods
                            </div>
                            <div className="methods-body">
                                {methods.map((method) => {
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
