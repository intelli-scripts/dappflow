import './ABIConfig.scss';
import React, {Fragment, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel,
    IconButton,
    InputBase,
    InputBaseProps,
    styled
} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import {theme} from "../../../../theme";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {isNumber} from "../../../../utils/common";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import dappflow from "../../../../utils/dappflow";
import {handleException} from "../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";


const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        border: '1px solid ' + theme.palette.grey[200]
    };
});


interface ABIConfigProps{
    show: boolean,
    handleClose?: Function
}

const defaultProps: ABIConfigProps = {
    show: false
};

interface ABIConfigState{
    appId: string
}

const initialState: ABIConfigState = {
    appId: ''
};


function ABIConfig({show = defaultProps.show, handleClose}: ABIConfigProps): JSX.Element {

    const dispatch = useDispatch();

    const [
        {appId},
        setState
    ] = useState({
        ...initialState
    });

    useEffect(() => {
        const savedAppId = localStorage.getItem('abi_app_id');
        setState(prevState => ({...prevState, appId: savedAppId}));
    }, [show]);

    function onClose(ev) {
        handleClose();
        ev.preventDefault();
        ev.stopPropagation();
    }

    return (<div className={"abi-config-wrapper"}>
        <div className={"abi-config-container"}>

            {show ? <Dialog
                onClose={onClose}
                fullWidth
                maxWidth={"xs"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>ABI Config</div>
                        </div>
                        <div>
                            <IconButton color="warning" onClick={onClose}>
                                <CancelOutlined />
                            </IconButton>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <Fragment>
                        <div className="abi-config-content">
                            <div className="abi-config-content-header">
                                <div>
                                    <FormLabel sx={{marginLeft: '5px', fontSize: '13px', fontWeight: 'bold', color: theme.palette.grey[600]}}>App ID</FormLabel>
                                    <ShadedInput
                                        value={appId}
                                        placeholder="4983274"
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, appId: ev.target.value}));
                                        }
                                        }
                                        fullWidth/>

                                    <Button
                                        sx={{marginTop: '20px'}}
                                        fullWidth
                                        size={"large"}
                                        variant={"contained"}
                                        className="black-button"
                                        onClick={async (ev) => {
                                            if (!appId) {
                                                dispatch(showSnack({
                                                    severity: 'error',
                                                    message: 'Invalid App ID'
                                                }));
                                                return;
                                            }
                                            if (!isNumber(appId)) {
                                                dispatch(showSnack({
                                                    severity: 'error',
                                                    message: 'Invalid App ID'
                                                }));
                                                return;
                                            }

                                            try {
                                                dispatch(showLoader('Validating App ID'));
                                                await new ApplicationClient(dappflow.network).get(Number(appId));
                                                dispatch(hideLoader());
                                            } catch (e: any) {
                                                dispatch(handleException(e));
                                                dispatch(hideLoader());
                                                return;
                                            }

                                            localStorage.setItem('abi_app_id', appId);
                                            dispatch(showSnack({
                                                severity: 'success',
                                                message: 'Saved successfully.'
                                            }));
                                            onClose(ev);

                                        }
                                        }
                                    >Save</Button>
                                </div>
                            </div>


                        </div>
                    </Fragment>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}


        </div>
    </div>);
}

export default ABIConfig;
