import './ABIMethodExecutor.scss';
import React from "react";
import {ABIMethodParams} from "algosdk";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import ABIMethodSignature from "../ABIMethodSignature/ABIMethodSignature";

interface ABIMethodExecutorProps{
    show: boolean,
    method: ABIMethodParams,
    handleClose?: Function
}

const defaultProps: ABIMethodExecutorProps = {
    show: false,
    method: {
        args: [],
        name: '',
        returns: {
            type: '',
            desc: '',
        },
        desc: ''
    }
};

function ABIMethodExecutor({show = defaultProps.show, method = defaultProps.method, handleClose}: ABIMethodExecutorProps): JSX.Element {

    function onClose(ev) {
        handleClose();
        ev.preventDefault();
        ev.stopPropagation();
    }

    return (<div className={"abi-method-executor-wrapper"}>
        <div className={"abi-method-executor-container"}>

            {show ? <Dialog
                onClose={onClose}
                fullWidth={true}
                maxWidth={"md"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Execute ABI Method</div>
                        </div>
                        <div>
                            <IconButton color="primary" onClick={onClose}>
                                <CancelOutlined />
                            </IconButton>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <ABIMethodSignature method={method}></ABIMethodSignature>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}

        </div>
    </div>);
}

export default ABIMethodExecutor;
