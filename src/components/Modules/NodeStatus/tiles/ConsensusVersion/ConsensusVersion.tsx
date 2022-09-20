import './ConsensusVersion.scss';
import React from "react";
import {Card, CardActions, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";
import {CoreNode} from "../../../../../packages/core-sdk/classes/core/CoreNode";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



function ConsensusVersion(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    const {status, versionsCheck, genesis, loading, health} = node;

    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);
    const hasLatestConsensus = coreNodeInstance.hasLatestConsensusVersion();
    const isSandbox = coreNodeInstance.isSandbox();
    const sandboxValidation = coreNodeInstance.sandboxConsensusValidation();


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
                                {!isSandbox ? <div>
                                    {hasLatestConsensus ? <div className="tile-status">
                                        <CheckCircleOutlinedIcon fontSize={"large"} color={"primary"}></CheckCircleOutlinedIcon>
                                        <span>Node has latest version</span>
                                    </div> : <div className="tile-status">
                                        <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                        <span>Node has outdated version</span>
                                    </div>}
                                </div> : <div>
                                    {sandboxValidation.valid ? <div className="tile-status">
                                        <CheckCircleOutlinedIcon fontSize={"large"} color={"primary"}></CheckCircleOutlinedIcon>
                                        <span>{sandboxValidation.message}</span>
                                    </div> : <div className="tile-status">
                                        <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                        <span>{sandboxValidation.message}</span>
                                    </div>}
                                </div>}


                                <div className="tile-details">
                                    <div className="tile-detail">
                                        <div className="key">Current version</div>
                                        <div className="value clickable" onClick={() => {
                                            window.open(coreNodeInstance.getConsensusVersion(), '_blank');
                                        }}>{coreNodeInstance.getConsensusVersion()}</div>
                                    </div>
                                    {isSandbox ? '' : <div className="tile-detail">
                                        <div className="key">Latest version</div>
                                        <div className="value clickable" onClick={() => {
                                            window.open(coreNodeInstance.getLatestConsensusVersion(), '_blank');
                                        }}>{coreNodeInstance.getLatestConsensusVersion()}</div>
                                    </div>}

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
