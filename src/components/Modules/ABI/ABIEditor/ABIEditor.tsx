import './ABIEditor.scss';
import React, {useState} from "react";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {Box, Button, Grid} from "@mui/material";
import ABIMethods from "../ABIMethods/ABIMethods";
import ABINetworks from "../ABINetworks/ABINetworks";
import {ABIContract, ABIContractParams} from "algosdk";
import ABIConfig from "../ABIConfig/ABIConfig";
import CreateApp from "../../AppManager/CreateApp/CreateApp";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

type ABIEditorProps = {
    abi: ABIContractParams,
    hideNetworks?: boolean,
    supportExecutor?: boolean,
    supportCreateApp?: boolean
};

interface ABIEditorState{
    showConfig: boolean,
    showCreateApp: boolean,
}

const initialState: ABIEditorState = {
    showConfig: false,
    showCreateApp: false
};

function ABIEditor({abi = {methods: [], name: ""}, hideNetworks = false, supportExecutor = false, supportCreateApp = false}: ABIEditorProps): JSX.Element {

    const abiInstance = new ABIContract(abi);
    const networks = abiInstance.networks;
    const wallet = useSelector((state: RootState) => state.wallet);
    const dispatch = useDispatch();

    const [
        {showConfig, showCreateApp},
        setState
    ] = useState(initialState);

    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>
            <div className={"abi-editor-body"}>
                <div className="abi" style={{backgroundColor: shadedClr}}>
                    <Box className="abi-header" sx={{borderColor: shadedClr2 + ' !important'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <div>
                                    <div className="abi-name">
                                        ABI: {abiInstance.name}
                                    </div>
                                    <div className="abi-desc">
                                        Description: {abiInstance.description ? abiInstance.description : '--Empty--'}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <div style={{display: "flex", justifyContent: "end"}}>
                                    <JsonViewer obj={abi} variant="outlined" title="ABI JSON" name="ABI JSON"></JsonViewer>
                                    {supportExecutor ? <div style={{marginLeft: '10px'}}>
                                        <Button color={"primary"}
                                                variant={"outlined"}
                                                size={"small"}
                                                onClick={() => {
                                                    setState(prevState => ({...prevState, showConfig: true}));
                                                }}
                                        >Config</Button>
                                        <ABIConfig show={showConfig} handleClose={() => {setState(prevState => ({...prevState, showConfig: false}));}}></ABIConfig>
                                    </div> : ''}

                                    {supportCreateApp ? <div style={{marginLeft: '10px'}}>
                                        <Button color={"primary"}
                                                variant={"outlined"}
                                                size={"small"}
                                                onClick={() => {
                                                    if (!wallet.information.address) {
                                                        dispatch(showSnack({
                                                            severity: 'error',
                                                            message: 'Please connect your wallet'
                                                        }));
                                                        return;
                                                    }

                                                    setState(prevState => ({...prevState, showCreateApp: true}));
                                                }}
                                        >Create App</Button>
                                        <CreateApp abi={abi} show={showCreateApp} handleClose={() => {setState(prevState => ({...prevState, showCreateApp: false}));}}></CreateApp>
                                    </div> : ''}

                                </div>
                            </Grid>
                        </Grid>


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
