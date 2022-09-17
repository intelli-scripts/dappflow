import './ConsensusVersion.scss';
import React from "react";
import {Card, CardActions, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";
import {CoreNode} from "../../../../../packages/core-sdk/classes/core/CoreNode";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';



function ConsensusVersion(props): JSX.Element {

    const {status, versions} = props;
    const loading: boolean = props.loading ? true : false;
    const hasLatestConsensus = new CoreNode().hasLatestConsensusVersion(status, versions);


    return (<div className={"consensus-version-wrapper"}>
        <div className={"consensus-version-container"}>

            <React.Fragment>
                <Card variant="outlined" sx={{background: shadedClr}} className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Consensus version
                            </div>
                        </div>

                        <div className="tile-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>
                                {hasLatestConsensus ? <div className="tile-status">
                                    <CheckCircleOutlinedIcon fontSize={"large"} color={"primary"}></CheckCircleOutlinedIcon>
                                    <span>Node has latest version</span>
                                </div> : <div className="tile-status">
                                    <DangerousOutlinedIcon fontSize={"large"} color={"warning"}></DangerousOutlinedIcon>
                                    <span>Node had outdated version</span>
                                </div>}

                                <div className="tile-details">
                                    <div className="tile-detail">
                                        <div className="key">Current version</div>
                                        <div className="value clickable" onClick={() => {
                                            window.open(new CoreNode().getConsensusVersion(status), '_blank');
                                        }}>{new CoreNode().getConsensusVersion(status)}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Latest version</div>
                                        <div className="value clickable" onClick={() => {
                                            window.open(new CoreNode().getLatestConsensusVersion(versions, status), '_blank');
                                        }}>{new CoreNode().getLatestConsensusVersion(versions, status)}</div>
                                    </div>
                                </div>




                            </div>}
                        </div>


                    </CardContent>
                    <CardActions sx={{textAlign: 'right'}}>

                    </CardActions>
                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default ConsensusVersion;
