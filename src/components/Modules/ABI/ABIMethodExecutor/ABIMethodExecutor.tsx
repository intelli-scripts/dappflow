import './ABIMethodExecutor.scss';
import React, {useEffect, useState} from "react";
import {
    ABIMethod,
    ABIMethodParams,
    mnemonicToSecretKey
} from "algosdk";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel,
    Grid,
    IconButton, InputBase, InputBaseProps, styled
} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {theme} from "../../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import ABIConfig from "../../../../packages/abi/classes/ABIConfig";
import {CoreNode} from "../../../../packages/core-sdk/classes/core/CoreNode";
import {ellipseString} from "../../../../packages/core-sdk/utils";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {handleException} from "../../../../redux/common/actions/exception";
import ABIMethodExecutorCls from "../../../../packages/abi/classes/ABIMethodExecutor";
import {A_ABI_METHOD_EXECUTOR_ARG} from "../../../../packages/abi/types";


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
    signer: string,
    executorArgs: A_ABI_METHOD_EXECUTOR_ARG[]
}

const initialState: ABIMethodExecutorState = {
    appId: '',
    signer: '',
    executorArgs: []
};

function ABIMethodExecutor({show = defaultProps.show, method = defaultProps.method, handleClose}: ABIMethodExecutorProps): JSX.Element {

    const dispatch = useDispatch();
    const [
        {appId, signer, executorArgs},
        setState
    ] = useState({
        ...initialState
    });


    const abiMethodInstance = new ABIMethod(method);
    const args = abiMethodInstance.args;



    const node = useSelector((state: RootState) => state.node);
    const {status, versionsCheck, genesis, health} = node;
    const kmd = useSelector((state: RootState) => state.kmd);
    const {mnemonics} = kmd;


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


    useEffect(() => {
        const isSandbox = new CoreNode(status, versionsCheck, genesis, health).isSandbox();
        if (isSandbox) {
            if (mnemonics.length > 0) {
                const accounts = mnemonics.map((mnemonic) => {
                    return mnemonicToSecretKey(mnemonic);
                })
                setState(prevState => ({...prevState, signer: accounts[0].addr}));
            }
        }
    }, [show, status, versionsCheck, genesis, health]);


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
        if (!signer) {
            dispatch(showSnack({
                severity: 'error',
                message: 'Invalid Signer.'
            }));
            return;
        }

        try {
            const abiMethodExecutorInstance = new ABIMethodExecutorCls(method);
            const unsignedTxns = await abiMethodExecutorInstance.getUnsignedTxns(Number(appId), signer, executorArgs);
            const signedTxns = await abiMethodExecutorInstance.signMethodTxns(unsignedTxns, mnemonicToSecretKey(mnemonics[0]));
            await abiMethodExecutorInstance.execute(signedTxns);
        }
        catch (e: any) {
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
                                                <div className="metadata-item">
                                                    Signer : {signer ? ellipseString(signer, 30) : ''}
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
