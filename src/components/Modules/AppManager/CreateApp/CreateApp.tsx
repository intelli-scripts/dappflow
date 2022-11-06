import './CreateApp.scss';
import React, {Fragment, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel, Grid,
    IconButton,
    InputBase,
    InputBaseProps, MenuItem, Select,
    styled
} from "@mui/material";
import {CancelOutlined, FileUploadOutlined} from "@mui/icons-material";
import {theme} from "../../../../theme";
import {useDispatch} from "react-redux";
import {getFileContent} from "../../../../packages/core-sdk/utils/fileUtils";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {handleException} from "../../../../redux/common/actions/exception";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import dappflow from "../../../../utils/dappflow";
import {CompileResponse} from "algosdk/dist/types/src/client/v2/algod/models/types";
import {ABIContract, ABIContractParams, getMethodByName} from "algosdk";
import {ABIMethodParams} from "algosdk/dist/types/src/abi/method";


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
        localInts: ''
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
        {params, abiMethod},
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
            console.log(compileResp);

            target.value = null;
            return compileResp;
        }
        catch (e: any) {
            dispatch(hideLoader());
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
                            <IconButton color="warning" onClick={onClose}>
                                <CancelOutlined />
                            </IconButton>
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
                                                className="black-button"
                                                size={"small"}
                                                color={"primary"}>
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
                                                className="black-button"
                                                size={"small"}
                                                color={"primary"}>
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
                                        <FormLabel sx={formLabelStyle}>ABI Method</FormLabel>
                                        <div style={{marginTop: '10px'}}>

                                            <Select
                                                size={"small"}
                                                value={abiMethod.name}
                                                onChange={(ev) => {
                                                    const methodInstance = getMethodByName(new ABIContract(abi).methods, ev.target.value);
                                                    setState(prevState => ({...prevState, abiMethod: {
                                                            ...methodInstance.toJSON()
                                                        }}));
                                                }}
                                                fullWidth
                                                color={"primary"}
                                            >
                                                {abi.methods.map((method) => {
                                                    return <MenuItem value={method.name} key={method.name}>{method.name}</MenuItem>;
                                                })}
                                            </Select>

                                        </div>
                                    </Grid>

                                </Grid>
                                <Button
                                    sx={{marginTop: '20px'}}
                                    size={"large"}
                                    variant={"contained"}
                                    className="black-button"
                                    onClick={async (ev) => {
                                        }
                                    }
                                >Create</Button>
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
