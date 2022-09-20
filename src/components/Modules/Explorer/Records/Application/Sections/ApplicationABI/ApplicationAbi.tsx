import './ApplicationAbi.scss';
import React, {useState} from "react";
import {Alert, Button, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {handleException} from "../../../../../../../redux/common/actions/exception";
import ABIEditor from "../../../../../ABI/ABIEditor/ABIEditor";
import {CoreApplication} from "../../../../../../../packages/core-sdk/classes/core/CoreApplication";
import ImportABI from "../../../../../ABI/ImportABI/ImportABI";
import {RootState} from "../../../../../../../redux/store";
import {CoreNode} from "../../../../../../../packages/core-sdk/classes/core/CoreNode";
import {ApplicationABI} from "../../../../../../../packages/abi/classes/ApplicationABI";

interface ApplicationABIState{
    showImport: boolean,
}
const initialState: ApplicationABIState = {
    showImport: false,
};

function ApplicationAbi(props): JSX.Element {
    

    const dispatch = useDispatch();

    const [
        {showImport},
        setState
    ] = useState({
        ...initialState
    });

    const clearState = () => {
        setState({ ...initialState });
    };

    const {application} = props;
    const node = useSelector((state: RootState) => state.node);
    const {status, versionsCheck, genesis, health} = node;
    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);

    return (<div className={"application-abi-wrapper"}>
        <div className={"application-abi-container"}>

            <div className="props">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="property">
                            <div className="key">
                                Application binary interface (ABI)

                                {application.abiDetails.loaded && !application.abiDetails.present ? <Button color={"primary"}
                                                                                                            variant={"outlined"}
                                                                                                            size="small"
                                                                                                            onClick={() => {
                                                                                                                setState(prevState => ({...prevState, showImport: true}));
                                                                                                            }}
                                                                                                            style={{marginLeft: '10px'}}
                                >Attach ABI</Button> : ''}

                                {application.abiDetails.loaded && application.abiDetails.present ? <Button color={"primary"}
                                                                                                           variant={"outlined"}
                                                                                                           size="small"
                                                                                                           onClick={() => {
                                                                                                               setState(prevState => ({...prevState, showImport: true}));
                                                                                                           }}
                                                                                                           style={{marginLeft: '10px'}}
                                >Update ABI</Button> : ''}

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
                                                                                                           style={{marginLeft: '10px'}}
                                >Delete ABI</Button> : ''}

                            </div>
                            <div className="value">



                                {application.abiDetails.loaded && application.abiDetails.present ? <div>
                                    <ABIEditor abi={application.abiDetails.abi} hideNetworks={true}></ABIEditor>
                                </div> : ''}

                                {application.abiDetails.loaded && !application.abiDetails.present ? <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                                        <Alert icon={false} color={"warning"} sx={{marginTop: '20px'}}>
                                            ABI is not attached to this application.
                                            <br/>
                                            Application arguments on app call transactions will be automatically decoded if ABI is attached.
                                        </Alert>
                                    </Grid>
                                </Grid> : ''}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <ImportABI show={showImport} onImport={async (abi) => {
                clearState();

                try {
                    await new ApplicationABI().save({
                        abi,
                        app: new CoreApplication(application.information).getId(),
                        network: coreNodeInstance.getGenesisId()
                    });
                    window.location.reload();
                }
                catch(e: any) {
                    dispatch(handleException(e));
                }


            }} onClose={() => {
                clearState();
            }}></ImportABI>

        </div>
    </div>);
}

export default ApplicationAbi;
