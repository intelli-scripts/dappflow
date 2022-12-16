import './IndexerStatus.scss';
import React from "react";
import {Card, CardContent, Link} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import LinkToBlock from "../../../Explorer/Common/Links/LinkToBlock";
import {CoreNode} from "../../../../../packages/core-sdk/classes/core/CoreNode";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";



function IndexerStatus(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    const {loading, health, status, versionsCheck, genesis} = node;

    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);
    const caughtUp = coreNodeInstance.hasIndexerCaughtUp();

    return (<div className={"indexer-status-wrapper"}>
        <div className={"indexer-status-container"}>

            <React.Fragment>
                <Card variant="outlined" className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Indexer status
                            </div>
                            <Link fontSize={"small"} sx={{color: 'warning.main'}} href="https://developer.algorand.org/docs/run-a-node/setup/indexer" target="_blank">Learn More</Link>
                        </div>

                        <div className="tile-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>

                                {caughtUp ? <div className="tile-status">
                                    <CheckCircleOutlinedIcon fontSize={"large"} color={"primary"}></CheckCircleOutlinedIcon>
                                    <span>Indexer caught up</span>
                                </div> : <div className="tile-status">
                                    <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                    <span>Indexer catchup is in progress ({coreNodeInstance.getIndexerBehindBlocks()} blocks behind)</span>
                                </div>}

                                <div className="tile-details">
                                    <div className="tile-detail">
                                        <div className="key">Version : </div>
                                        <div className="value">{health.version}</div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Current round : </div>
                                        <div className="value">
                                            <LinkToBlock id={health.round}></LinkToBlock>
                                        </div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Migrating : </div>
                                        <div className="value">
                                            {health["is-migrating"] ? 'True' : 'False'}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            }
                        </div>


                    </CardContent>
                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default IndexerStatus;
