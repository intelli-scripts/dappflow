import './NodeStatus.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import NodeCatchup from "./tiles/NodeCatchup/NodeCatchup";
import {Grid} from "@mui/material";
import ConsensusVersion from "./tiles/ConsensusVersion/ConsensusVersion";
import AlgodVersion from "./tiles/AlgodVersion/AlgodVersion";
import IndexerVersion from "./tiles/IndexerVersion/IndexerVersion";
import IndexerCatchup from "./tiles/IndexerCatchup/IndexerCatchup";


function NodeStatus(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);

    return (<div className={"node-status-wrapper"}>
        <div className={"node-status-container"}>

            <div className={"node-status-header"}>
                <div>
                    Node status
                </div>
            </div>
            <div className={"node-status-body"}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ConsensusVersion loading={node.loading} status={node.status} versions={node.versionsCheck}></ConsensusVersion>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <NodeCatchup loading={node.loading} status={node.status}></NodeCatchup>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <IndexerCatchup loading={node.loading}></IndexerCatchup>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <AlgodVersion loading={node.loading}></AlgodVersion>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <IndexerVersion loading={node.loading}></IndexerVersion>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </div>
        </div>
    </div>);
}

export default NodeStatus;
