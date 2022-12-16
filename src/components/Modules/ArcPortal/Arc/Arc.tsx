import './Arc.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Tab, Tabs} from "@mui/material";
import {loadArc} from "../../../../redux/arcPortal/actions/arc";
import LoadingTile from "../../../Common/LoadingTile/LoadingTile";
import {ARC} from "../../../../packages/arc-portal/classes/ARC";
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Arc(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);
    const params = useParams();
    const {id} = params;

    const location = useLocation();

    let route = location.pathname;
    route = route.substring(1);
    route = route.split('/')[3];

    useEffect(() => {
        dispatch(loadArc(Number(id)));
    }, [dispatch, id]);

    return (<div className={"arc-wrapper"}>
        <div className={"arc-container"}>

            {arc.loading ? <LoadingTile></LoadingTile> : <div>
                <div className="arc-header">
                    <div className="arc-name">
                        <Button variant={"text"}
                                style={{marginTop: '-32px'}}
                                size={"small"}
                                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                                onClick={() => {
                                    navigate('/arc-portal');
                                }}
                        >Back</Button>
                        <div>
                            {arcInstance.getName()}
                        </div>

                    </div>
                    <div>
                        <Button variant={"contained"}
                                startIcon={<GitHubIcon></GitHubIcon>}
                                onClick={() => {
                                    window.open(arcInstance.getGithubUrl(), "_blank");
                                }}
                        >Github</Button>
                    </div>

                </div>
                <div className="arc-tabs">

                    <Tabs TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}} value={route} className="related-list">
                        <Tab label="Overview" value="overview" onClick={() => {
                            navigate('/arc-portal/arc/' + id + '/overview');
                        }}/>
                        {arcInstance.hasWorkspace() ? <Tab label="Workspace" value="workspace" onClick={() => {
                            navigate('/arc-portal/arc/' + id + '/workspace');
                        }}/> : ''}

                    </Tabs>

                    <Outlet />


                </div>
            </div>}


        </div>
    </div>);
}

export default Arc;
