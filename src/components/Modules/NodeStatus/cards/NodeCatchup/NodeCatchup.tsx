import './NodeCatchup.scss';
import React from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {A_Status} from "../../../../../packages/core-sdk/types";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {shadedClr} from "../../../../../utils/common";
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import humanizeDuration from 'humanize-duration';


function NodeCatchup(props): JSX.Element {

    const loading: boolean = props.loading ? true : false;
    const status: A_Status = props.status;
    console.log(status);
    let catchupTime = status["catchup-time"];
    const caughtUp = catchupTime === 0;

    return (<div className={"node-catchup-wrapper"}>
        <div className={"node-catchup-container"}>

            <React.Fragment>
                <Card variant="outlined" sx={{background: shadedClr}} className="card">
                    <CardContent>
                        <div className="card-header">
                            <div className="card-title">
                                Node catchup
                            </div>
                        </div>

                        <div className="card-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>
                                {caughtUp ? <div className="caught-up-completed">
                                    <CheckCircleOutlinedIcon fontSize={"large"} color={"warning"}></CheckCircleOutlinedIcon>
                                    <span>Completed</span>
                                </div> : <div className="caught-up-completed">
                                    <DownloadingOutlinedIcon fontSize={"large"} color={"warning"}></DownloadingOutlinedIcon>
                                    <span>{humanizeDuration(catchupTime, { largest: 2 })}</span>
                                </div>
                                }
                            </div>
                            }
                        </div>


                    </CardContent>
                    <CardActions sx={{textAlign: 'right'}}>
                        <Button size="small" color={"warning"} onClick={() => {
                            window.open("https://developer.algorand.org/docs/run-a-node/setup/install/#sync-node-network-using-fast-catchup", "_blank");
                        }}>Learn More</Button>
                    </CardActions>
                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default NodeCatchup;
