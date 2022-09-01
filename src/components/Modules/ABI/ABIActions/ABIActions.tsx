import './ABIActions.scss';
import React, {useState} from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, Tab, Tabs
} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';


interface ABIActionsState{
    show: boolean,
    tab: string
}

const initialState: ABIActionsState = {
    show: false,
    tab: "file"
};

function ABIActions(props): JSX.Element {


    const [
        {show, tab},
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
                                <Tabs value={tab} className="related-list">
                                    <Tab label="File" value="file" onClick={() => {
                                        setState(prevState => ({...prevState, tab: "file"}));
                                    }}/>
                                    <Tab label="Link" value="link" onClick={() => {
                                        setState(prevState => ({...prevState, tab: "link"}));
                                    }}/>
                                    <Tab label="Raw text" value="raw-text" onClick={() => {
                                        setState(prevState => ({...prevState, tab: "raw-text"}));
                                    }}/>
                                </Tabs>
                            </div>


                            <div className="import-abi-json-body">
                                {tab === 'file' ? <div className="file-wrapper">
                                    <div className="file-container">
                                        <div className="upload-container">
                                            <Button
                                                component="label"
                                                startIcon={<FileUploadIcon></FileUploadIcon>}>
                                                Upload file
                                                <input
                                                    type="file"
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
