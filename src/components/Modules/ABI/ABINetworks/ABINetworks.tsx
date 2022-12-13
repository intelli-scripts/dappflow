import './ABINetworks.scss';
import React, {} from "react";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import {Box, Grid} from "@mui/material";
import {shadedClr2} from "../../../../utils/common";
import {ABIContractNetworks} from "algosdk";
import {theme} from "../../../../theme";


function ABINetworks(props): JSX.Element {
    let networks: ABIContractNetworks = props.networks;

    if (!networks) {
        networks = {};
    }

    const hasNetworks = Object.keys(networks).length > 0;

    return (<div className={"abi-networks-wrapper"}>
        <div className={"abi-networks-container"}>

            <Box className="networks" sx={{borderColor: shadedClr2 + ' !important'}}>
                <div className={"abi-networks-header"}>
                    <PodcastsIcon color={"primary"}></PodcastsIcon>
                    <span style={{color: theme.palette.primary.main}}>Networks</span>
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
                                            {networks[name].appID}
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
