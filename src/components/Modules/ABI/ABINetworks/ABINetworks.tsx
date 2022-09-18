import './ABINetworks.scss';
import React, {} from "react";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import {Box, Chip, Grid} from "@mui/material";
import {shadedClr2} from "../../../../utils/common";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {ABIContractNetworks} from "algosdk";
import {CoreNode} from "../../../../packages/core-sdk/classes/core/CoreNode";


function ABINetworks(props): JSX.Element {
    let networks: ABIContractNetworks = props.networks;

    if (!networks) {
        networks = {};
    }

    const hasNetworks = Object.keys(networks).length > 0;

    const node = useSelector((state: RootState) => state.node);
    const {versionsCheck, status} = node;

    return (<div className={"abi-networks-wrapper"}>
        <div className={"abi-networks-container"}>

            <Box className="networks" sx={{borderColor: shadedClr2 + ' !important'}}>
                <div className={"abi-networks-header"}>
                    <PodcastsIcon color={"primary"}></PodcastsIcon>
                    Networks
                </div>

                <div className="abi-networks-body">
                    {!hasNetworks ? <Box sx={{ color: 'warning.main', fontSize: 14}}>
                        No networks are configured
                    </Box> : <div>
                        <div className="network-table-header">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                    Genesis hash b64
                                </Grid>
                                <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                                    Application ID
                                </Grid>
                            </Grid>
                        </div>

                        {Object.keys(networks).map((name) => {
                            return <div className="network" key={name}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                        <div className="network-name">
                                            <Box sx={{color: 'primary.main'}}>
                                                {name}
                                            </Box>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                                        <div className="app-id">
                                            {new CoreNode(status, versionsCheck).getGenesisHash() === name ? <div>
                                                <span>{networks[name].appID}</span>
                                                <Chip label="Open App" className="app-link" variant={"outlined"} size={"small"} color={"primary"} onClick={() => {
                                                    window.open("/explorer/application/" + networks[name].appID , "_blank");
                                                }}></Chip>
                                            </div> : networks[name].appID}
                                        </div>
                                    </Grid>
                                </Grid>


                            </div>;
                        })}
                    </div>}
                </div>
            </Box>


        </div>
    </div>);
}

export default ABINetworks;
