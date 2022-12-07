import './ABIEditor.scss';
import React, {useState} from "react";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {Box, Button, Grid, ListItemText, Menu, MenuItem} from "@mui/material";
import ABIMethods from "../ABIMethods/ABIMethods";
import ABINetworks from "../ABINetworks/ABINetworks";
import {ABIContract, ABIContractParams, ABIMethodParams} from "algosdk";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {useDispatch} from "react-redux";
import {A_AccountInformation} from "../../../../packages/core-sdk/types";
import {defaultAccount} from "../../../../redux/wallet/actions/wallet";
import ABIMethodExecutor from "../ABIMethodExecutor/ABIMethodExecutor";
import {KeyboardArrowDown} from "@mui/icons-material";

type ABIEditorProps = {
    abi: ABIContractParams,
    hideNetworks?: boolean,
    supportExecutor?: boolean,
    supportCreateApp?: boolean,
    account?: A_AccountInformation,
    appId?: string
};

interface ABIEditorState{
    showConfig: boolean,
    showCreateApp: boolean,
    method: ABIMethodParams
}

const defaultMethod = {
    name: '',
    desc: '',
    args: [],
    returns: {
        type: 'void',
        desc: ''
    }
};

const initialState: ABIEditorState = {
    showConfig: false,
    showCreateApp: false,
    method: defaultMethod
};

function ABIEditor({abi = {methods: [], name: ""}, hideNetworks = false, supportExecutor = false, supportCreateApp = false, appId = '', account = defaultAccount}: ABIEditorProps): JSX.Element {

    const abiInstance = new ABIContract(abi);
    const networks = abiInstance.networks;
    const dispatch = useDispatch();
    const [menuAnchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const closeCreateAppMenu = () => {
        setAnchorEl(null);
    };
    
    const [
        {showCreateApp, method},
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
                                    {supportCreateApp ? <div style={{marginLeft: '10px'}}>
                                        <Button color={"primary"}
                                                variant={"outlined"}
                                                size={"small"}
                                                endIcon={<KeyboardArrowDown />}
                                                onClick={(ev) => {
                                                    if (!account.address) {
                                                        dispatch(showSnack({
                                                            severity: 'error',
                                                            message: 'Please connect your wallet'
                                                        }));
                                                        return;
                                                    }

                                                    setAnchorEl(ev.currentTarget);
                                                }}
                                        >Create App</Button>
                                    </div> : ''}
                                </div>


                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    disableAutoFocusItem={true}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    MenuListProps={{

                                    }}
                                    onClose={closeCreateAppMenu}>

                                    {abi.methods.map((method) => {
                                        return <MenuItem
                                            key={method.name}
                                            selected={false}
                                            onClick={(e) => {
                                                setState(prevState => ({...prevState, method: method, showCreateApp: true}));
                                                closeCreateAppMenu();
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }
                                            }>
                                            <ListItemText sx={{fontSize: '13px'}} disableTypography>{method.name}</ListItemText>
                                        </MenuItem>;
                                    })}

                                </Menu>

                                <ABIMethodExecutor creation={true} appId={appId} show={showCreateApp} method={method} handleClose={() => {
                                    setState(prevState => ({...prevState, method: defaultMethod, showCreateApp: false}));
                                }} account={account}></ABIMethodExecutor>
                                
                            </Grid>
                        </Grid>


                    </Box>
                    <div className="abi-body">
                        {!hideNetworks ? <ABINetworks networks={networks}></ABINetworks> : ''}
                        <ABIMethods abi={abi} supportExecutor={supportExecutor} account={account} appId={appId}></ABIMethods>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
