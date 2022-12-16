import './ABIConfig.scss';
import React, {Fragment, useRef} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel,
    InputBase,
    InputBaseProps,
    styled
} from "@mui/material";
import {theme} from "../../../../theme";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {isNumber} from "../../../../utils/common";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import dappflow from "../../../../utils/dappflow";
import {handleException} from "../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import CloseIcon from "@mui/icons-material/Close";
import {updateAppId} from "../../../../redux/abi/actions/abiStudio";


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
    handleClose?: Function,
    appId: string
}


function ABIConfig({show = false, handleClose, appId = ''}: ABIConfigProps): JSX.Element {

    const dispatch = useDispatch();
    const appIdRef = useRef();

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
                            <div style={{fontWeight: "bold", fontSize: 18}}></div>
                        </div>
                        <div>
                            <CloseIcon className="modal-close-button" onClick={onClose}/>
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
                                        defaultValue={appId}
                                        placeholder="4983274"
                                        inputRef={appIdRef}
                                        fullWidth/>


                                    <div style={{marginTop: '40px', textAlign: 'center'}}>

                                        <Button
                                            size={"large"}
                                            fullWidth
                                            variant={"contained"}
                                            className="black-button"
                                            onClick={async (ev) => {



                                                // @ts-ignore
                                                const appId = appIdRef.current.value;

                                                if (appId) {
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
                                                }


                                                dispatch(updateAppId(appId))

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
