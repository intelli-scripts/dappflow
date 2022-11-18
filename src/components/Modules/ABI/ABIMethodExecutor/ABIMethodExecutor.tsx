import './ABIMethodExecutor.scss';
import React, {useEffect, useState} from "react";
import {
    ABIMethod,
    ABIMethodParams
} from "algosdk";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel,
    Grid, InputBase, InputBaseProps, styled
} from "@mui/material";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {theme} from "../../../../theme";
import {useDispatch, useSelector} from "react-redux";
import ABIConfig from "../../../../packages/abi/classes/ABIConfig";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {handleException} from "../../../../redux/common/actions/exception";
import ABIMethodExecutorCls from "../../../../packages/abi/classes/ABIMethodExecutor";
import {A_ABI_METHOD_EXECUTOR_ARG} from "../../../../packages/abi/types";
import CloseIcon from "@mui/icons-material/Close";
import {RootState} from "../../../../redux/store";
import dappflow from "../../../../utils/dappflow";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {TransactionClient} from "../../../../packages/core-sdk/clients/transactionClient";
import {BaseTransaction} from "../../../../packages/core-sdk/transactions/baseTransaction";


const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        border: '1px solid ' + theme.palette.grey[200]
    };
});

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

interface ABIMethodExecutorState{
    appId: string,
    executorArgs: A_ABI_METHOD_EXECUTOR_ARG[]
}

const initialState: ABIMethodExecutorState = {
    appId: '',
    executorArgs: []
};

function ABIMethodExecutor({show = defaultProps.show, method = defaultProps.method, handleClose}: ABIMethodExecutorProps): JSX.Element {

    const wallet = useSelector((state: RootState) => state.wallet);
    const dispatch = useDispatch();
    const [
        {appId, executorArgs},
        setState
    ] = useState({
        ...initialState
    });


    const abiMethodInstance = new ABIMethod(method);
    const args = abiMethodInstance.args;


    const clearState = () => {
        setState({ ...initialState });
    };

    useEffect(() => {
        const processedArgs: A_ABI_METHOD_EXECUTOR_ARG[] = [];
        args.forEach((arg) => {
            processedArgs.push({
                ...arg,
                value: ''
            });
            setState(prevState => ({...prevState, executorArgs: processedArgs, appId: new ABIConfig().getAppId()}));
        });
    }, [show]);



    function onClose(ev) {
        handleClose();
        clearState();
        ev.preventDefault();
        ev.stopPropagation();
    }

    async function execute() {
        if (!appId) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid Application ID.'
            }));
            return;
        }

        try {
            dispatch(showLoader('Signing transaction'));
            const abiMethodExecutorInstance = new ABIMethodExecutorCls(method);
            const unsignedTxns = await abiMethodExecutorInstance.getUnsignedTxns(Number(appId), wallet.information.address, executorArgs);

            const signedTxns = await dappflow.signer.signGroupTxns(unsignedTxns.map((unsignedTxn) => {
                return unsignedTxn.txn;
            }));
            dispatch(hideLoader());

            const txnInstance = new BaseTransaction(dappflow.network);
            dispatch(showLoader('Broadcasting transaction to network'));
            const {txId} = await txnInstance.send(signedTxns);
            dispatch(hideLoader());

            dispatch(showLoader('Waiting for confirmation'));
            await txnInstance.waitForConfirmation(txId);
            await new TransactionClient(dappflow.network).get(txId);
            dispatch(hideLoader());

            handleClose();
            dispatch(showSnack({
                severity: 'success',
                message: 'Method executed successfully: ' + txId
            }));
        }
        catch (e: any) {
            dispatch(hideLoader());
            dispatch(handleException(e));
        }
    }

    return (<div className={"abi-method-executor-wrapper"}>
        <div className={"abi-method-executor-container"}>

            {show ? <Dialog
                onClose={onClose}
                fullWidth={true}
                maxWidth={"md"}
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
                            <CloseIcon className="modal-close-button" onClick={onClose}/>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="abi-method-executor-modal-content">
                        <div className="abi-method-executor-header">
                            <div className="abi-method-name">
                                {abiMethodInstance.name}
                            </div>
                        </div>
                        <div className="abi-method-executor-body">

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
                                    <div className="abi-method-executor-panel-wrapper">
                                        <div className="abi-method-executor-panel-container">
                                            <div className="abi-method-metadata">
                                                <div className="metadata-item">
                                                    Application ID : {appId}
                                                </div>
                                            </div>
                                            <div className="abi-method-args-form-wrapper">
                                                <div className="abi-method-args-form-container">
                                                    <div className="abi-method-args-form-title">Arguments</div>
                                                    {executorArgs.map((arg, index) => {
                                                        return <div className="abi-method-arg" key={arg.name}>
                                                            <FormLabel sx={{marginLeft: '5px', fontSize: '13px', fontWeight: 'bold', color: theme.palette.grey[600]}}>{`${arg.name} (${arg.type.toString()})`}</FormLabel>
                                                            <ShadedInput
                                                                placeholder={arg.type.toString()}
                                                                value={arg.value}
                                                                onChange={(ev) => {
                                                                    const processedArgs = executorArgs;
                                                                    processedArgs[index] = {
                                                                        ...arg,
                                                                        value: ev.target.value
                                                                    };

                                                                    setState(prevState => ({...prevState, executorArgs: processedArgs}));
                                                                }}
                                                                fullWidth/>
                                                        </div>
                                                    })}
                                                    <div className="abi-method-execute">
                                                        <Button
                                                            style={{marginRight: '10px'}}
                                                            variant={"outlined"}
                                                            className="black-button"
                                                            onClick={onClose}
                                                        >Close</Button>
                                                        <Button
                                                            startIcon={<OfflineBoltIcon></OfflineBoltIcon>}
                                                            variant={"contained"}
                                                            className="black-button"
                                                            onClick={execute}
                                                        >Execute</Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
                                    <div className="abi-method-result-wrapper">
                                        <div className="abi-method-result-container">
                                            <div className="abi-method-result-title">
                                                Result
                                            </div>
                                        </div>
                                    </div>
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
