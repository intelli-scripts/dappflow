import './ImportABI.scss';
import React, {useState} from "react";
import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel, InputBase, InputBaseProps, styled, Tab, Tabs, Typography
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import axios from "axios";
import {handleException} from "../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {ABIContract} from "algosdk";
import {theme} from "../../../../theme";
import CloseIcon from "@mui/icons-material/Close";


export const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        border: '1px solid ' + theme.palette.grey[200],
        fontSize: 14
    };
});


interface ImportABIState{
    tab: string,
    url: string
}

const initialState: ImportABIState = {
    tab: "url",
    url: ''
};

function ImportABI(props): JSX.Element {


    const {show} = props;
    const dispatch = useDispatch();

    const [
        {tab, url},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    function handleClose() {
        props.onClose();
        clearState();
    }

    return (<div>
        {show ? <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"md"}
            open={show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <div style={{fontWeight: "bold", fontSize: 18}}>Import ABI</div>
                    </div>
                    <CloseIcon className="modal-close-button" onClick={handleClose}/>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="import-abi-json-wrapper">
                    <div className="import-abi-json-container">

                        <div className="import-abi-json-header">
                            <Tabs value={tab} className="tabs-wrapper" TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}}>
                                <Tab label="URL" value="url" onClick={() => {
                                    setState(prevState => ({...prevState, tab: "url"}));
                                }}/>
                                <Tab label="File" value="file" onClick={() => {
                                    setState(prevState => ({...prevState, tab: "file"}));
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
                                                        try {
                                                            const abi = JSON.parse(reader.result.toString());
                                                            new ABIContract(abi);
                                                            props.onImport(abi);
                                                            clearState();
                                                        }
                                                        catch (e: any) {
                                                            dispatch(handleException(e));
                                                        }

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

                            {tab === 'url' ? <div className="url-wrapper">
                                <div className="url-container">
                                    <FormLabel sx={{color: 'grey.900', fontWeight: 'bold', marginBottom: '15px'}}>Enter a URL</FormLabel>
                                    <ShadedInput
                                        placeholder="https://google.com/abi.json"
                                        value={url}
                                        multiline={true}
                                        rows={3}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, url: ev.target.value}));
                                        }}
                                        fullWidth/>

                                    <div style={{color: theme.palette.grey[600], marginTop: '20px', marginBottom: '10px'}}>
                                        <span style={{fontSize: '13px'}}>Example: &nbsp;</span>
                                        <Chip onClick={() => {
                                            setState(prevState => ({...prevState, url: "https://raw.githubusercontent.com/algorandlabs/smart-asa/develop/smart_asa_abi.json"}));
                                        }} label="Smart ASA ABI" size="small" color={"warning"} variant={"outlined"}
                                        ></Chip>

                                        <Chip onClick={() => {
                                            setState(prevState => ({...prevState, url: "https://raw.githubusercontent.com/algorand-devrel/coin-flipper/master/contracts/artifacts/contract.json"}));
                                        }} label="Coin Flipper ABI" size="small" color={"warning"} variant={"outlined"}
                                              sx={{marginLeft: '10px'}}
                                        ></Chip>

                                        <Chip onClick={() => {
                                            setState(prevState => ({...prevState, url: "https://raw.githubusercontent.com/algorand-devrel/ExtendableDAO/main/src/contracts/dao_abi.json"}));
                                        }} label="DAO ABI" size="small" color={"warning"} variant={"outlined"}
                                              sx={{marginLeft: '10px'}}
                                        ></Chip>

                                        <Chip onClick={() => {
                                            setState(prevState => ({...prevState, url: "https://raw.githubusercontent.com/AlgoPoaP/algopoap-smartcontracts/main/algopoap-contract.json"}));
                                        }} label="AlgoPoaP ABI" size="small" color={"warning"} variant={"outlined"}
                                              sx={{marginLeft: '10px'}}
                                        ></Chip>

                                    </div>


                                    <Button color={"primary"}
                                            variant={"contained"}
                                            sx={{marginTop: '15px'}}
                                            className="black-button"
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
                                                    new ABIContract(response.data);
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
    </div>);
}

export default ImportABI;
