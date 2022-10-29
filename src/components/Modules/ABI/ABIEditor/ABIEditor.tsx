import './ABIEditor.scss';
import React, {useState} from "react";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {Box, Button} from "@mui/material";
import ABIMethods from "../ABIMethods/ABIMethods";
import ABINetworks from "../ABINetworks/ABINetworks";
import {ABIContract, ABIContractParams} from "algosdk";
import ABIConfig from "../ABIConfig/ABIConfig";
import SettingsIcon from '@mui/icons-material/Settings';

type ABIEditorProps = {
    abi: ABIContractParams,
    hideNetworks?: boolean,
    supportExecutor?: boolean
};

interface ABIEditorState{
    showConfig: boolean,
}

const initialState: ABIEditorState = {
    showConfig: false
};

function ABIEditor({abi = {methods: [], name: ""}, hideNetworks = false, supportExecutor = false}: ABIEditorProps): JSX.Element {

    const abiInstance = new ABIContract(abi);
    const networks = abiInstance.networks;

    const [
        {showConfig},
        setState
    ] = useState(initialState);

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
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <JsonViewer obj={abi} variant="outlined" title="ABI JSON" name="ABI JSON"></JsonViewer>
                            {supportExecutor ? <div style={{marginLeft: '10px'}}>
                                <Button color={"primary"}
                                        endIcon={<SettingsIcon fontSize={"small"}></SettingsIcon>}
                                        variant={"outlined"}
                                        size={"small"}
                                        onClick={() => {
                                            setState(prevState => ({...prevState, showConfig: true}));
                                        }}
                                >Config</Button>
                                <ABIConfig show={showConfig} handleClose={() => {setState(prevState => ({...prevState, showConfig: false}));}}></ABIConfig>
                            </div> : ''}
                        </div>
                    </Box>
                    <div className="abi-body">
                        {!hideNetworks ? <ABINetworks networks={networks}></ABINetworks> : ''}
                        <ABIMethods abi={abi} supportExecutor={supportExecutor}></ABIMethods>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
