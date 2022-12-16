import './JsonViewer.scss';
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import ReactJson from 'react-json-view'
import {copyContent, exportData} from "../../../utils/common";
import {useDispatch} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

interface JsonViewerState{
    show: boolean,
}
const initialState: JsonViewerState = {
    show: false
};

function JsonViewer(props): JSX.Element {

    const [
        {show},
        setState
    ] = useState(initialState);
    const dispatch = useDispatch();

    let {obj, name, title, size, fullWidth, variant} = props;
    if (!obj) {
        obj = {};
    }
    if (!name) {
        name = 'View Raw JSON';
    }
    if (!title) {
        title = 'Raw JSON';
    }
    if (!size) {
        size = 'small';
    }
    if (!fullWidth) {
        fullWidth = false;
    }
    if (!variant) {
        variant = 'contained';
    }

    function handleClose() {
        setState(prevState => ({...prevState, show: false}));
    }

    return (<div className={"json-viewer-wrapper"}>
        <div className={"json-viewer-container"}>

            <Button
                variant={variant}
                size={size}
                color={"primary"}
                fullWidth={fullWidth}
                onClick={() => {
                    setState(prevState => ({...prevState, show: true}));
                }}
            >{name}</Button>

            {show ? <Dialog
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"md"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>{title}</div>
                        </div>
                        <div>
                            <CloseIcon className="modal-close-button" onClick={handleClose}/>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="json-viewer-content">
                        <div className="json-viewer-content-header">
                            <div>
                                <Button
                                    variant={"outlined"}
                                    size={"small"}
                                    color={"primary"}
                                    onClick={(ev) => {
                                        copyContent(ev, dispatch, JSON.stringify(obj), 'JSON Copied');
                                    }}
                                >Copy</Button>

                                <Button
                                    variant={"outlined"}
                                    size={"small"}
                                    style={{marginLeft: 10}}
                                    color={"primary"}
                                    onClick={() => {
                                        exportData(obj);
                                    }}
                                >Download</Button>

                            </div>
                        </div>

                        <ReactJson src={obj} name={false} displayObjectSize={false} displayDataTypes={false} enableClipboard={false} iconStyle={"square"}/>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}


        </div>
    </div>);
}

export default JsonViewer;
