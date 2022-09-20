import './NodeCatchup.scss';
import React from "react";
import {Card, CardContent, Link} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {shadedClr} from "../../../../../utils/common";
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import humanizeDuration from 'humanize-duration';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";


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
                                    <DownloadingOutlinedIcon fontSize={"large"} color={"warning"}></DownloadingOutlinedIcon>
                                    <span>{humanizeDuration(catchupTime, { largest: 2 })}</span>
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
