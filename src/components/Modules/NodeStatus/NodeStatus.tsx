import './NodeStatus.scss';
import React from "react";
import NodeCatchup from "./tiles/NodeCatchup/NodeCatchup";
import {Grid} from "@mui/material";
import ConsensusVersion from "./tiles/ConsensusVersion/ConsensusVersion";
import IndexerStatus from "./tiles/IndexerVersion/IndexerStatus";
import NetworkDetails from "./tiles/NetworkDetails/NetworkDetails";


function NodeStatus(): JSX.Element {


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
                                <ConsensusVersion></ConsensusVersion>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <NodeCatchup></NodeCatchup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <IndexerStatus></IndexerStatus>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <NetworkDetails></NetworkDetails>
                    </Grid>
                </Grid>


            </div>
        </div>
    </div>);
}

export default NodeStatus;
