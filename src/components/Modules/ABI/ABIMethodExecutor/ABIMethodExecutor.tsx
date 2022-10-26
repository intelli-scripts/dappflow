import './ABIMethodExecutor.scss';
import React from "react";
import {ABIMethod, ABIMethodParams} from "algosdk";
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import ABIMethodExecutorCls from '../../../../packages/abi/classes/ABIMethodExecutor';
import {ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES} from "../../../../packages/abi/types";
import ABIMethodSignature from "../ABIMethodSignature/ABIMethodSignature";
import {shadedClr} from "../../../../utils/common";

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

    const abiMethodExecutorInstance = new ABIMethodExecutorCls(method);
    const canExecute = abiMethodExecutorInstance.canExecute();

    return (<div className={"abi-method-executor-wrapper"}>
        <div className={"abi-method-executor-container"}>

            {show ? <Dialog
                onClose={onClose}
                fullWidth={true}
                maxWidth={"lg"}
                open={show}

                PaperProps={{
                    sx: {
                        height: '80vh'
                    }
                }}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Execute ABI Method</div>
                        </div>
                        <div>
                            <IconButton color="warning" onClick={onClose}>
                                <CancelOutlined />
                            </IconButton>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="abi-method-executor-modal-content">
                        <div className="abi-method-executor-header">
                            <div className="abi-method-name">
                                {new ABIMethod(method).name}
                            </div>
                        </div>
                        <div className="abi-method-executor-body">

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                                    <div className="abi-method-executor-panel-wrapper">
                                        <div className="abi-method-executor-panel-container">
                                            {canExecute ? '' : <div>
                                                <Alert icon={false} color={"warning"}>
                                                    This method cannot be executed. Only below transaction types are supported.
                                                    <div style={{marginTop: '20px'}}>
                                                        <Typography variant={"subtitle2"}>
                                                            Supported : {ABI_METHOD_EXECUTOR_SUPPORTED_TXN_TYPES.join(', ')}
                                                        </Typography>
                                                        <Typography variant={"subtitle2"}>
                                                            Current : {abiMethodExecutorInstance.getTxnTypes().join(', ')}
                                                        </Typography>
                                                    </div>
                                                </Alert>
                                            </div>}
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                    <ABIMethodSignature color={"warning"} method={method} sx={{background: shadedClr}} fields ={['sig', 'count', 'selector']}></ABIMethodSignature>
                                </Grid>
                            </Grid>



                        </div>
                    </div>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}

        </div>
    </div>);
}

export default ABIMethodExecutor;
