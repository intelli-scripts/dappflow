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
    console.log(node);

    return (<div className={"node-status-wrapper"}>
        <div className={"node-status-container"}>

            <div className={"node-status-header"}>
                <div>
                    Node status
                </div>
            </div>
            <div className={"node-status-body"}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <NodeCatchup loading={node.loadingStatus} status={node.status}></NodeCatchup>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <ConsensusVersion loading={node.loadingStatus}></ConsensusVersion>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{marginTop: '10px'}}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <AlgodVersion loading={node.loadingStatus}></AlgodVersion>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <IndexerVersion loading={node.loadingStatus}></IndexerVersion>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{marginTop: '10px'}}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <IndexerCatchup loading={node.loadingStatus}></IndexerCatchup>
                    </Grid>
                </Grid>

            </div>
        </div>
    </div>);
}

export default NodeStatus;
