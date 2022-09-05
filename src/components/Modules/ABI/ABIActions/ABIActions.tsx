import './ABIActions.scss';
import React, {useState} from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel,
    IconButton, InputBase, InputBaseProps, styled, Tab, Tabs, Typography
} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {shadedClr} from "../../../../utils/common";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import axios from "axios";
import {handleException} from "../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";


export const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        background: shadedClr,
        border: '1px solid ' + theme.palette.grey["400"],
        fontSize: 14
    };
});


interface ABIActionsState{
    show: boolean,
    tab: string,
    url: string
}

const initialState: ABIActionsState = {
    show: false,
    tab: "file",
    url: ''
};

function ABIActions(props): JSX.Element {


    const dispatch = useDispatch();

    const [
        {show, tab, url},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    return (<div className={"abi-actions-wrapper"}>
        <div className={"abi-actions-container"}>

            <Button color={"primary"}
                    variant={"contained"}
                    onClick={() => {
                        setState(prevState => ({...prevState, show: true}));
                    }}
                    startIcon={<FileDownloadIcon></FileDownloadIcon>}
            >Import ABI</Button>



            {show ? <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Import ABI</div>
                        </div>
                        <IconButton color="primary" onClick={() => {
                            setState(prevState => ({...prevState, show: false}));
                            clearState();
                        }}>
                            <CancelOutlined />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="import-abi-json-wrapper">
                        <div className="import-abi-json-container">

                            <div className="import-abi-json-header">
                                <Tabs value={tab} className="tabs-wrapper">
                                    <Tab label="File" value="file" onClick={() => {
                                        setState(prevState => ({...prevState, tab: "file"}));
                                    }}/>
                                    <Tab label="Link" value="link" onClick={() => {
                                        setState(prevState => ({...prevState, tab: "link"}));
                                    }}/>
                                </Tabs>
                            </div>


                            <div className="import-abi-json-body">
                                {tab === 'file' ? <div className="file-wrapper">
                                    <div className="file-container">
                                        <div className="upload-container">
                                            <Typography sx={{color: 'grey.600', marginBottom: '20px', fontSize: 14}}>only .json files are allowed</Typography>
                                            <Button
                                                component="label"
                                                startIcon={<FileUploadIcon></FileUploadIcon>}>
                                                Upload file
                                                <input
                                                    type="file"
                                                    accept=".json,.txt"
                                                    hidden
                                                    multiple={false}
                                                    onChange={(ev) =>{
                                                        const file = ev.target.files[0];

                                                        const reader = new FileReader();
                                                        reader.addEventListener("load", function () {
                                                            const abi = JSON.parse(reader.result.toString());
                                                            props.onImport(abi);
                                                            clearState();
                                                        }, false);

                                                        if (file) {
                                                            reader.readAsText(file);
                                                        }
                                                    }
                                                    }
                                                />
                                            </Button>
                                        </div>

                                    </div>
                                </div> : ''}

                                {tab === 'link' ? <div className="link-wrapper">
                                    <div className="link-container">
                                        <FormLabel sx={{color: 'grey.900', fontWeight: 'bold', marginBottom: '15px'}}>Enter a URL</FormLabel>
                                        <ShadedInput
                                            placeholder="http://localhost/abi.json"
                                            value={url}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, url: ev.target.value}));
                                            }}
                                            fullWidth/>

                                        <div>
                                            <Chip onClick={() => {
                                                setState(prevState => ({...prevState, url: "https://raw.githubusercontent.com/algorandlabs/smart-asa/develop/smart_asa_abi.json"}));
                                            }} label="Smart ASA ABI example" size="small" color={"primary"} variant={"outlined"}
                                                  sx={{marginTop: '10px', marginBottom: '10px'}}
                                            ></Chip>
                                        </div>


                                        <Button color={"primary"}
                                                variant={"contained"}
                                                sx={{marginTop: '15px'}}
                                                onClick={async () => {
                                                    if (!url) {
                                                        dispatch(showSnack({
                                                            severity: 'error',
                                                            message: 'Invalid url'
                                                        }));
                                                        return;
                                                    }
                                                    try {
                                                        dispatch(showLoader("Loading ABI JSON from the url"))
                                                        const response = await axios.get(url);
                                                        props.onImport(response.data);
                                                        dispatch(hideLoader());
                                                        clearState();
                                                    }
                                                    catch (e: any) {
                                                        dispatch(hideLoader());
                                                        dispatch(handleException(e));
                                                    }

                                                }}
                                        >Import</Button>
                                    </div>
                                </div> : ''}



                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}

        </div>
    </div>);
}

export default ABIActions;
