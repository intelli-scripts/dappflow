import './CreateApp.scss';
import React, {Fragment, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel, Grid,
    InputBase,
    InputBaseProps,
    styled
} from "@mui/material";
import {FileUploadOutlined} from "@mui/icons-material";
import {theme} from "../../../../theme";
import {useDispatch} from "react-redux";
import {getFileContent} from "../../../../packages/core-sdk/utils/fileUtils";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {handleException} from "../../../../redux/common/actions/exception";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import dappflow from "../../../../utils/dappflow";
import {CompileResponse} from "algosdk/dist/types/src/client/v2/algod/models/types";
import {ABIContractParams} from "algosdk";
import {ABIMethodParams} from "algosdk/dist/types/src/abi/method";
import CloseIcon from "@mui/icons-material/Close";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {isNumber} from "../../../../utils/common";
import {ApplicationTransaction} from "../../../../packages/core-sdk/transactions/applicationTransaction";


const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        border: '1px solid ' + theme.palette.grey[200]
    };
});

const formLabelStyle = {
    marginLeft: '5px',
    fontSize: '13px',
    fontWeight: 'bold',
    color: theme.palette.grey[600]
};

interface CreateAppProps{
    show: boolean,
    handleClose?: Function,
    abi?: ABIContractParams,
}

const defaultProps: CreateAppProps = {
    show: false
};

interface CreateAppState{
    params: {
        id: string,
        approvalProgram: string,
        clearProgram: string,
        globalBytes: string,
        localBytes: string,
        globalInts: string,
        localInts: string,
        note: string,
        foreignAssets: string,
        foreignApps: string,
        accounts: string
    },
    abiMethod: ABIMethodParams
}

const initialState: CreateAppState = {
    params: {
        id: '',
        approvalProgram: '',
        clearProgram: '',
        globalBytes: '',
        localBytes: '',
        globalInts: '',
        localInts: '',
        note: '',
        foreignApps: '',
        foreignAssets: '',
        accounts: ''
    },
    abiMethod: {
        name: '',
        desc: '',
        args: [],
        returns: {
            type: '',
            desc: ''
        }
    }
};


function CreateApp({show = defaultProps.show, handleClose, abi = {methods: [], name: ""}}: CreateAppProps): JSX.Element {

    const dispatch = useDispatch();

    const [
        {params},
        setState
    ] = useState({
        ...initialState
    });

    useEffect(() => {
        setState(prevState => ({...initialState}));
    }, [show]);

    function onClose(ev) {
        handleClose();
        ev.preventDefault();
        ev.stopPropagation();
    }

    async function validateProgram(event): Promise<CompileResponse> {
        let file = event.target.files[0];
        const target = event.target;

        try {
            dispatch(showLoader('Reading TEAL program'));
            const content = await getFileContent(file);
            dispatch(hideLoader());

            dispatch(showLoader('Compiling program'));
            const compileResp = await new ApplicationClient(dappflow.network).compileProgram(content);
            dispatch(hideLoader());

            target.value = null;
            return compileResp;
        }
        catch (e: any) {
            dispatch(hideLoader());
            dispatch(handleException(e));
        }
    }

    async function create() {
        const {globalBytes, globalInts, localBytes, localInts, approvalProgram, clearProgram, note, foreignAssets, foreignApps, accounts} = params;
        if (!globalBytes || !isNumber(globalBytes)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid global bytes'
            }));
            return;
        }
        if (!globalInts || !isNumber(globalInts)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid global ints'
            }));
            return;
        }
        if (!localBytes || !isNumber(localBytes)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid local bytes'
            }));
            return;
        }
        if (!localInts || !isNumber(localInts)) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid local ints'
            }));
            return;
        }
        if (!approvalProgram) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid approval program'
            }));
            return;
        }
        if (!clearProgram) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid clear program'
            }));
            return;
        }

        try {
            const txnInstance = new ApplicationTransaction(dappflow.network);
            const unsignedTxn = await txnInstance.prepareCreateTxn({
                appApprovalProgram: txnInstance.toUint8Array(approvalProgram),
                appArgs: [],
                appClearProgram: txnInstance.toUint8Array(clearProgram),
                appForeignApps: foreignApps ? foreignApps.split(',').map(app => Number(app)): [],
                appForeignAssets: foreignAssets ? foreignAssets.split(',').map(asset => Number(asset)): [],
                appGlobalByteSlices: Number(globalBytes),
                appGlobalInts: Number(globalInts),
                appIndex: 0,
                appLocalByteSlices: Number(localBytes),
                appLocalInts: Number(localInts),
                appOnComplete: undefined,
                boxes: [],
                extraPages: 0,
                fee: 0,
                firstRound: 0,
                flatFee: false,
                from: "CESUKTCKPQZQJ2ZOP5K6M6557S327ZNIWYSIGD7BMLAPFWDJDQWFCHZNMI",
                genesisHash: "",
                genesisID: "",
                lastRound: 0,
                lease: undefined,
                reKeyTo: "",
                suggestedParams: undefined,
                type: undefined,
                appAccounts: accounts ? accounts.split(','): [],
                note: txnInstance.toUint8Array(note)
            });

            console.log(unsignedTxn);
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }

    return (<div className={"create-app-wrapper"}>
        <div className={"create-app-container"}>

            {show ? <Dialog
                onClose={onClose}
                fullWidth
                maxWidth={"sm"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Create Application</div>
                        </div>
                        <div>
                            <CloseIcon className="modal-close-button" onClick={onClose}/>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <Fragment>
                        <div className="create-app-content">
                            <div>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Global bytes</FormLabel>
                                        <ShadedInput
                                            value={params.globalBytes}
                                            placeholder="20"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        globalBytes: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Global ints</FormLabel>
                                        <ShadedInput
                                            value={params.globalInts}
                                            placeholder="20"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        globalInts: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Local bytes</FormLabel>
                                        <ShadedInput
                                            value={params.localBytes}
                                            placeholder="10"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        localBytes: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Local ints</FormLabel>
                                        <ShadedInput
                                            value={params.localInts}
                                            placeholder="10"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        localInts: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Approval program</FormLabel>
                                        <div style={{marginTop: '10px'}}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                size={"small"}
                                                color={"warning"}>
                                                <FileUploadOutlined fontSize={"small"} sx={{marginRight: '5px'}}></FileUploadOutlined>
                                                Upload
                                                <input
                                                    type="file"
                                                    // accept=".teal"
                                                    style={{ display: "none" }}
                                                    onChange={async (event) => {
                                                        const compileResponse = await validateProgram(event);
                                                        setState(prevState => ({...prevState, params: {
                                                                ...params,
                                                                approvalProgram: compileResponse.result
                                                            }}));
                                                    }} />

                                            </Button>
                                            {params.approvalProgram ? <div className="teal-program">
                                                {params.approvalProgram}
                                            </div> : ''}

                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Clear program</FormLabel>
                                        <div style={{marginTop: '10px'}}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                size={"small"}
                                                color={"warning"}>
                                                <FileUploadOutlined fontSize={"small"} sx={{marginRight: '5px'}}></FileUploadOutlined>
                                                Upload
                                                <input
                                                    type="file"
                                                    // accept=".teal"
                                                    style={{ display: "none" }}
                                                    onChange={async (event) => {
                                                        const compileResponse = await validateProgram(event);
                                                        setState(prevState => ({...prevState, params: {
                                                                ...params,
                                                                clearProgram: compileResponse.result
                                                            }}));
                                                    }} />
                                            </Button>
                                            {params.clearProgram ? <div className="teal-program">
                                                {params.clearProgram}
                                            </div> : ''}

                                        </div>
                                    </Grid>



                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Foreign assets</FormLabel>
                                        <ShadedInput
                                            multiline
                                            rows={3}
                                            value={params.foreignAssets}
                                            placeholder="Note"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        foreignAssets: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Foreign apps</FormLabel>
                                        <ShadedInput
                                            multiline
                                            rows={3}
                                            value={params.foreignApps}
                                            placeholder="Note"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        foreignApps: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Accounts</FormLabel>
                                        <ShadedInput
                                            multiline
                                            rows={3}
                                            value={params.accounts}
                                            placeholder="Note"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        accounts: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormLabel sx={formLabelStyle}>Note</FormLabel>
                                        <ShadedInput
                                            multiline
                                            rows={3}
                                            value={params.note}
                                            placeholder="Note"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, params: {
                                                        ...params,
                                                        note: ev.target.value
                                                    }}));
                                            }
                                            }
                                            fullWidth/>
                                    </Grid>

                                    {/*<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>*/}
                                    {/*    <FormLabel sx={formLabelStyle}>ABI Method</FormLabel>*/}
                                    {/*    <div style={{marginTop: '10px'}}>*/}

                                    {/*        <Select*/}
                                    {/*            size={"small"}*/}
                                    {/*            value={abiMethod.name}*/}
                                    {/*            onChange={(ev) => {*/}
                                    {/*                const methodInstance = getMethodByName(new ABIContract(abi).methods, ev.target.value);*/}
                                    {/*                setState(prevState => ({...prevState, abiMethod: {*/}
                                    {/*                        ...methodInstance.toJSON()*/}
                                    {/*                    }}));*/}
                                    {/*            }}*/}
                                    {/*            fullWidth*/}
                                    {/*            color={"primary"}*/}
                                    {/*        >*/}
                                    {/*            {abi.methods.map((method) => {*/}
                                    {/*                return <MenuItem value={method.name} key={method.name}>{method.name}</MenuItem>;*/}
                                    {/*            })}*/}
                                    {/*        </Select>*/}

                                    {/*    </div>*/}
                                    {/*</Grid>*/}

                                </Grid>

                                <Grid sx={{marginTop: '40px', textAlign: 'center'}}>
                                    <Button
                                        variant={"outlined"}
                                        className="black-button"
                                        sx={{marginRight: '10px'}}
                                        onClick={onClose}
                                    >Close</Button>

                                    <Button
                                        variant={"contained"}
                                        className="black-button"
                                        onClick={create}
                                    >Create</Button>
                                </Grid>

                            </div>


                        </div>
                    </Fragment>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}


        </div>
    </div>);
}

export default CreateApp;