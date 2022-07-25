import './Arc.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Button, Tab, Tabs} from "@mui/material";
import {loadArc} from "../../../../redux/arcPortal/actions/arc";
import LaunchIcon from '@mui/icons-material/Launch';
import LoadingTile from "../../../Common/LoadingTile/LoadingTile";
import {ARC} from "../../../../packages/arc-portal/classes/ARC";

function Arc(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const arc = useSelector((state: RootState) => state.arc);
    const params = useParams();
    const {id} = params;

    useEffect(() => {
        dispatch(loadArc(Number(id)));
    }, [dispatch, id]);

    return (<div className={"arc-wrapper"}>
        <div className={"arc-container"}>

            {arc.loading ? <LoadingTile></LoadingTile> : <div>
                <div>
                    <Button variant={"contained"}
                            size={"large"}
                            startIcon={<LaunchIcon></LaunchIcon>}
                            onClick={() => {
                                const arcInstance = new ARC(arc.information);
                                window.open(arcInstance.getGithubUrl(), "_blank");
                            }}
                    >View on Github</Button>
                </div>
                <div className="arc-tabs">

                    <Tabs value="overview" className="related-list">
                        <Tab label="Overview" value="overview" onClick={() => {
                            navigate('/arc-portal/src/' + id + '/overview');
                        }}/>
                    </Tabs>

                    <Outlet />


                </div>
            </div>}


        </div>
    </div>);
}

export default Arc;
