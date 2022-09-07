import './ABIEditor.scss';
import React, {} from "react";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {Box} from "@mui/material";
import ABIMethods from "../ABIMethods/ABIMethods";
import ABINetworks from "../ABINetworks/ABINetworks";
import {ABIContract, ABIContractParams} from "algosdk";

function ABIEditor(props): JSX.Element {
    let abi: ABIContractParams = props.abi;
    let hideNetworks: boolean = props.hideNetworks;

    if (!abi) {
        abi = {methods: [], name: ""};
    }
    if (!hideNetworks) {
        hideNetworks = false;
    }
    else {
        hideNetworks = true;
    }

    const abiInstance = new ABIContract(abi);
    const networks = abiInstance.networks;

    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>
            <div className={"abi-editor-body"}>
                <div className="abi" style={{backgroundColor: shadedClr}}>
                    <Box className="abi-header" sx={{borderColor: shadedClr2 + ' !important'}}>
                        <div>
                            <div className="abi-name">
                                ABI: {abiInstance.name}
                            </div>
                            <div className="abi-desc">
                                Description: {abiInstance.description ? abiInstance.description : '--Empty--'}
                            </div>
                        </div>
                        <div>
                            <JsonViewer obj={abi} variant="outlined" title="ABI JSON" name="ABI JSON"></JsonViewer>
                        </div>
                    </Box>
                    <div className="abi-body">
                        {!hideNetworks ? <ABINetworks networks={networks}></ABINetworks> : ''}
                        <ABIMethods abi={abi}></ABIMethods>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
