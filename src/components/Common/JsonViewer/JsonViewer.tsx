import './JsonViewer.scss';
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import ReactJson from 'react-json-view'
import {CancelOutlined} from "@mui/icons-material";

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
                        <IconButton color="primary" onClick={() => {
                            setState(prevState => ({...prevState, show: false}));
                        }}>
                            <CancelOutlined />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="json-viewer-content">
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
