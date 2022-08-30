import './ABIEditor.scss';
import React, {} from "react";
import {A_ABI} from "../../../../packages/abi/types";
import {shadedClr, shadedClr2} from "../../../../utils/common";
import ABIMethod from "../ABIMethod/ABIMethod";
import JsonViewer from "../../../Common/JsonViewer/JsonViewer";
import {ABI} from "../../../../packages/abi/classes/ABI";
import {Box, Chip, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {CoreVersionsCheck} from "../../../../packages/core-sdk/classes/CoreVersionsCheck";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

function ABIEditor(props): JSX.Element {
    let abi: A_ABI = props.abi;

    if (!abi) {
        abi = {methods: [], name: ""};
    }

    const network = useSelector((state: RootState) => state.network);
    const {versionsCheck} = network;
    const versionsCheckInstance = new CoreVersionsCheck(versionsCheck);

    const abiInstance = new ABI(abi);
    const methods = abiInstance.getMethods();
    const networks = abiInstance.getNetworks();
    const hasNetworks = abiInstance.hasNetworks();

    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>
            <div className={"abi-editor-body"}>
                <div className="abi" style={{backgroundColor: shadedClr}}>
                    <Box className="abi-header" sx={{borderColor: shadedClr2 + ' !important'}}>
                        <div>
                            <div className="abi-name">
                                ABI: {abiInstance.getName()}
                            </div>
                            <div className="abi-desc">
                                Description: {abiInstance.getDesc() ? abiInstance.getDesc() : '--Empty--'}
                            </div>
                        </div>
                        <div>
                            <JsonViewer obj={abi} variant="outlined" title="ABI JSON" name="ABI JSON"></JsonViewer>
                        </div>
                    </Box>
                    <div className="abi-body">
                        <Box className="networks" sx={{borderColor: shadedClr2 + ' !important'}}>
                            <div className="networks-header">
                                <PodcastsIcon color={"primary"}></PodcastsIcon>
                                Networks
                            </div>
                            <div className="networks-body">
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
                                        return <div className="network">
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
                                                        {versionsCheckInstance.getGenesisHashB64() === name ? <div>
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

                        <div className="methods">
                            <div className="methods-header">
                                <IntegrationInstructionsOutlinedIcon color={"primary"}></IntegrationInstructionsOutlinedIcon>
                                Methods
                            </div>
                            <div className="methods-body">
                                {methods.map((method) => {
                                    return <ABIMethod method={method}></ABIMethod>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ABIEditor;
