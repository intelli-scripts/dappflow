import './JsonViewer.scss';
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import ReactJson from 'react-json-view'
import {CancelOutlined} from "@mui/icons-material";
import {copyContent, exportData} from "../../../../../utils/common";
import {useDispatch} from "react-redux";

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

    let {obj} = props;
    if (!obj) {
        obj = {};
    }

    return (<div className={"json-viewer-wrapper"}>
        <div className={"json-viewer-container"}>

            <Button
                variant={"contained"}
                size={"small"}
                color={"primary"}
                onClick={() => {
                    setState(prevState => ({...prevState, show: true}));
                }}
            >View raw JSON</Button>

            {show ? <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Raw JSON</div>
                        </div>
                        <div>
                            <IconButton color="primary" onClick={() => {
                                setState(prevState => ({...prevState, show: false}));
                            }}>
                                <CancelOutlined />
                            </IconButton>
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
