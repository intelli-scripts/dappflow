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
    InputBaseProps,
    styled, TextField, Tooltip
} from "@mui/material";
import {CancelOutlined, CloudUpload, CloudUploadOutlined, FileUploadOutlined} from "@mui/icons-material";
import {theme} from "../../../../theme";
import {useDispatch} from "react-redux";
import {getFileContent} from "../../../../packages/core-sdk/utils/fileUtils";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {handleException} from "../../../../redux/common/actions/exception";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import dappflow from "../../../../utils/dappflow";
import {ApplicationParams, CompileResponse} from "algosdk/dist/types/src/client/v2/algod/models/types";
import {TransactionApplication} from "algosdk/dist/types/src/client/v2/indexer/models/types";


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
    handleClose?: Function
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
    }
}

const initialState: CreateAppState = {
    params: {
        id: '',
        approvalProgram: '',
        clearProgram: '',
        globalBytes: '',
        localBytes: ''
    },
};


function CreateApp({show = defaultProps.show, handleClose}: CreateAppProps): JSX.Element {

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
                maxWidth={"xs"}
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
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
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
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
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
                                    <Grid item xs={12} sm={12} md={12} xl={12}>
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

                                    <Grid item xs={12} sm={12} md={12} xl={12}>
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

                                </Grid>
                                <Button
                                    sx={{marginTop: '20px'}}
                                    fullWidth
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
