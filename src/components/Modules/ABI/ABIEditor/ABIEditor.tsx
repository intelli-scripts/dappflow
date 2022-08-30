import './ABIEditor.scss';
import React, {} from "react";
import {A_ABI} from "../../../../packages/abi/types";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {ABI} from "../../../../packages/abi/classes/ABI";
import {Box} from "@mui/material";
import ABIMethods from "../ABIMethods/ABIMethods";
import ABINetworks from "../ABINetworks/ABINetworks";

function ABIEditor(props): JSX.Element {
    let abi: A_ABI = props.abi;

    if (!abi) {
        abi = {methods: [], name: ""};
    }

    const abiInstance = new ABI(abi);
    const methods = abiInstance.getMethods();
    const networks = abiInstance.getNetworks();


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
                        <ABINetworks networks={networks}></ABINetworks>
                        <ABIMethods methods={methods}></ABIMethods>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
