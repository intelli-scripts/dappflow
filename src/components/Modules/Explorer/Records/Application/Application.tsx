import './Application.scss';
import React, {useEffect} from "react";
import {matchPath, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {Grid, Tab, Tabs} from "@mui/material";
import {loadApplication} from "../../../../../redux/explorer/actions/application";
import {CoreApplication} from "../../../../../packages/core-sdk/classes/CoreApplication";
import ApplicationGlobalState from "./Sections/ApplicationGlobalState/ApplicationGlobalState";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";
import ApplicationProgram from "./Sections/ApplicationProgram/ApplicationProgram";
import CustomError from "../../Common/CustomError/CustomError";
import ApplicationActions from "./Sections/ApplicationActions/ApplicationActions";


function Application(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    let tabValue = 'transactions';
    const { pathname } = useLocation();

    if (matchPath("/application/:id/transactions", pathname)) {
        tabValue = 'transactions';
    }
    else if (matchPath("/application/:id/global-state", pathname)) {
        tabValue = 'global-state';
    }

    const application = useSelector((state: RootState) => state.application);
    const applicationInstance = new CoreApplication(application.information);


    useEffect(() => {
        dispatch(loadApplication(Number(id)));
    }, [dispatch, id]);

    return (<div className={"application-wrapper"}>
        <div className={"application-container"}>

            {application.error ? <CustomError></CustomError> : <div>
                <div className="application-header">
                    <div>
                        Application overview
                    </div>
                    <div>
                        <ApplicationActions application={application}></ApplicationActions>
                    </div>
                </div>

                {application.loading ? <LoadingTile></LoadingTile> : <div className="application-body">
                    <div className="id">
                        #{applicationInstance.getId()}
                    </div>

                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Creator
                                    </div>
                                    <div className="value small">
                                        <LinkToAccount address={applicationInstance.getCreator()}></LinkToAccount>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Application address
                                    </div>
                                    <div className="value small">
                                        <LinkToAccount address={applicationInstance.getApplicationAddress()}></LinkToAccount>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <ApplicationProgram name="Approval program" program={applicationInstance.getApprovalProgram()}></ApplicationProgram>
                    <ApplicationProgram name="Clear state program" program={applicationInstance.getClearProgram()}></ApplicationProgram>



                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property center">
                                    <div className="key">
                                        Global state byte
                                    </div>
                                    <div className="value">
                                        {applicationInstance.getGlobalSchemaByte()}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property center">
                                    <div className="key">
                                        Global state uint
                                    </div>
                                    <div className="value">
                                        {applicationInstance.getGlobalSchemaUint()}
                                    </div>
                                </div>
                            </Grid>



                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property center">
                                    <div className="key">
                                        Local state byte
                                    </div>
                                    <div className="value">
                                        {applicationInstance.getLocalSchemaByte()}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property center">
                                    <div className="key">
                                        Local state uint
                                    </div>
                                    <div className="value">
                                        {applicationInstance.getLocalSchemaUint()}
                                    </div>
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}></Grid>
                        </Grid>
                    </div>


                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ApplicationGlobalState></ApplicationGlobalState>
                            </Grid>
                        </Grid>
                    </div>



                    <div className="application-tabs">

                        <Tabs value={tabValue} className="related-list">
                            <Tab label="Transactions" value="transactions" onClick={() => {
                                navigate('/explorer/application/' + id + '/transactions');
                            }}/>
                        </Tabs>

                        <Outlet />


                    </div>
                </div>}
            </div>}




        </div>
    </div>);
}

export default Application;
