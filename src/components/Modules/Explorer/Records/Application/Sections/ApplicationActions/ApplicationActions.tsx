import './ApplicationActions.scss';
import React, {useState} from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import ImportABI from "../../../../../ABI/ImportABI/ImportABI";
import JsonViewer from "../../../../../../Common/JsonViewer/JsonViewer";
import {ApplicationABI} from "../../../../../../../packages/abi/classes/ApplicationABI";
import {CoreApplication} from "../../../../../../../packages/core-sdk/classes/core/CoreApplication";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";
import {handleException} from "../../../../../../../redux/common/actions/exception";
import {showSnack} from "../../../../../../../redux/common/actions/snackbar";
import {CoreVersionsCheck} from "../../../../../../../packages/core-sdk/classes/core/CoreVersionsCheck";
import {CancelOutlined} from "@mui/icons-material";
import ABIEditor from "../../../../../ABI/ABIEditor/ABIEditor";

interface ApplicationActionsState{
    showImport: boolean,
    showABIEditor: boolean
}
const initialState: ApplicationActionsState = {
    showImport: false,
    showABIEditor: false
};

function ApplicationActions(props): JSX.Element {

    const dispatch = useDispatch();

    const {application} = props;
    const node = useSelector((state: RootState) => state.node);

    const [
        {showImport, showABIEditor},
        setState
    ] = useState({
        ...initialState
    });

    const clearState = () => {
        setState({ ...initialState });
    };

    return (<div className={"application-actions-wrapper"}>
        <div className={"application-actions-container"}>

            {application.abiDetails.loaded && !application.abiDetails.present ? <Button color={"primary"}
                                                                                        variant={"outlined"}
                                                                                        size="small"
                                                                                        onClick={() => {
                                                                                            setState(prevState => ({...prevState, showImport: true}));
                                                                                        }}
                                                                                        style={{marginRight: '10px'}}
            >Attach ABI</Button> : ''}

            {application.abiDetails.loaded && application.abiDetails.present ? <Button color={"primary"}
                                                                                        variant={"outlined"}
                                                                                        size="small"
                                                                                        onClick={() => {
                                                                                            setState(prevState => ({...prevState, showImport: true}));
                                                                                        }}
                                                                                        style={{marginRight: '10px'}}
            >Update ABI</Button> : ''}

            {application.abiDetails.loaded && application.abiDetails.present ? <Button color={"primary"}
                                                                                       variant={"outlined"}
                                                                                       size="small"
                                                                                       onClick={() => {
                                                                                           setState(prevState => ({...prevState, showABIEditor: true}));
                                                                                       }}
                                                                                       style={{marginRight: '10px'}}
            >View ABI</Button> : ''}

            {application.abiDetails.loaded && application.abiDetails.present ? <Button color={"secondary"}
                                                                                       variant={"outlined"}
                                                                                       size="small"
                                                                                       onClick={async () => {
                                                                                           try {
                                                                                               await new ApplicationABI().delete(new CoreApplication(application.information).getId());
                                                                                               window.location.reload();
                                                                                           }
                                                                                           catch (e: any) {
                                                                                               dispatch(handleException(e));
                                                                                           }
                                                                                       }}
                                                                                       style={{marginRight: '10px'}}
            >Delete ABI</Button> : ''}


            <JsonViewer obj={application.information} title="Application"></JsonViewer>

            <ImportABI show={showImport} onImport={async (abi) => {
                clearState();

                try {
                    await new ApplicationABI().save({
                        abi,
                        app: new CoreApplication(application.information).getId(),
                        network: new CoreVersionsCheck(node.versionsCheck).getGenesisId()
                    });

                    dispatch(showSnack({
                        severity: 'success',
                        message: 'ABI attached successfully. Now all transaction params related to this Application are decoded automatically'
                    }));
                    window.location.reload();
                }
                catch(e: any) {
                    dispatch(handleException(e));
                }


            }} onClose={() => {
                clearState();
            }}></ImportABI>










            {showABIEditor ? <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={showABIEditor}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Application ABI</div>
                        </div>
                        <IconButton color="primary" onClick={() => {
                            clearState();
                        }}>
                            <CancelOutlined />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <ABIEditor abi={application.abiDetails.abi} hideNetworks={true}></ABIEditor>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}










        </div>
    </div>);
}

export default ApplicationActions;
