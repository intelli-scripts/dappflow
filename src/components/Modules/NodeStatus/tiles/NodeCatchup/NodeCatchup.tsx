import './NodeCatchup.scss';
import React from "react";
import {Card, CardContent, Link} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {shadedClr} from "../../../../../utils/common";
import humanizeDuration from 'humanize-duration';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


function NodeCatchup(): JSX.Element {


    const node = useSelector((state: RootState) => state.node);
    const {status, loading} = node;

    let catchupTime = status["catchup-time"];
    const caughtUp = catchupTime === 0;

    return (<div className={"node-catchup-wrapper"}>
        <div className={"node-catchup-container"}>

            <React.Fragment>
                <Card variant="outlined" sx={{background: shadedClr}} className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Node catchup
                            </div>
                            <Link fontSize={"small"} sx={{color: 'warning.main'}} href="https://developer.algorand.org/docs/run-a-node/setup/install/#sync-node-network-using-fast-catchup" target="_blank">Learn More</Link>
                        </div>

                        <div className="tile-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>
                                {caughtUp ? <div className="tile-status">
                                    <CheckCircleOutlinedIcon fontSize={"large"} color={"primary"}></CheckCircleOutlinedIcon>
                                    <span>Completed</span>
                                </div> : <div className="tile-status">
                                    <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                    <span>In progress</span>
                                </div>}

                                {caughtUp ? '' : <div className="tile-details">
                                    <div className="tile-detail">
                                        <div className="key">Catchup time : </div>
                                        <div className="value">{humanizeDuration(catchupTime, { largest: 2 })}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Catch point : </div>
                                        <div className="value">{status.catchpoint}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Catch point total blocks : </div>
                                        <div className="value">{status["catchpoint-total-blocks"]}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Catch point acquired blocks : </div>
                                        <div className="value">{status["catchpoint-acquired-blocks"]}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Catch point total accounts : </div>
                                        <div className="value">{status["catchpoint-total-accounts"]}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Catch point processed accounts : </div>
                                        <div className="value">{status["catchpoint-processed-accounts"]}</div>
                                    </div>
                                </div>}


                            </div>
                            }
                        </div>


                    </CardContent>

                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default NodeCatchup;
