import './Settings.scss';

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import React, {useState} from "react";
import {hideSettings} from "../../../redux/settings/actions/settings";
import {CancelOutlined} from "@mui/icons-material";
import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel, Grid,
    IconButton,
    InputBase, InputBaseProps, styled
} from "@mui/material";
import {theme} from "../../../theme";
import {getNodeConfig, getNodes} from "../../../utils/nodeConfig";
import {showSnack} from "../../../redux/common/actions/snackbar";
import {isNumber, shadedClr} from "../../../utils/common";
import {Network} from "../../../packages/core-sdk/network";
import {hideLoader, showLoader} from "../../../redux/common/actions/loader";
import {isBrave} from "../../../packages/core-sdk/utils";
import {NodeConnectionParams} from "../../../packages/core-sdk/types";

const nodeConfig = getNodeConfig();

const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        background: shadedClr
    };
});


interface SettingsState{
    algodUrl: string,
    algodPort: string,
    algodToken: string,
    indexerUrl: string,
    indexerPort: string,
    indexerToken: string
}

const initialState: SettingsState = {
    algodPort: nodeConfig.algod.port,
    algodToken: nodeConfig.algod.token as string,
    algodUrl: nodeConfig.algod.url,
    indexerPort: nodeConfig.indexer.port,
    indexerToken: nodeConfig.indexer.token as string,
    indexerUrl: nodeConfig.indexer.url
};

function Settings(): JSX.Element {

    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);
    const {show} = settings;
    const primaryClr = theme.palette.primary.main;
    const nodes = getNodes();


    const [
        {algodToken, algodUrl, indexerToken, indexerUrl, indexerPort, algodPort},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    async function saveConfig() {
        let message = '';
        let failed = false;

        if (!algodUrl) {
            message = 'Invalid Algod url';
        } else if (algodPort && !isNumber(algodPort)) {
            message = 'Invalid Algod port';
        } else if (!indexerUrl) {
            message = 'Invalid Indexer url';
        } else if (indexerPort && !isNumber(indexerPort)) {
            message = 'Invalid Indexer port';
        }

        if (message) {
            dispatch(showSnack({
                severity: 'error',
                message
            }));
            return;
        }

        const connectionParams: NodeConnectionParams = {
            id: 'test',
            label: 'Test',
            algod: {
                url: algodUrl,
                port: algodPort,
                token: algodToken
            },
            indexer: {
                url: indexerUrl,
                port: indexerPort,
                token: indexerToken
            }
        }

        try {
            dispatch(showLoader('Connecting to node ...'));
            const network = new Network(connectionParams);
            const client = network.getClient();
            await client.status().do();
            dispatch(hideLoader());
        } catch (e) {
            dispatch(hideLoader());
            failed = true;
            message = 'Node connection failed - Invalid Algod configuration.';
        }

        if (!failed) {
            try {
                dispatch(showLoader('Connecting to node ...'));
                const network = new Network(connectionParams);
                const indexer = network.getIndexer();
                await indexer.makeHealthCheck().do();
                dispatch(hideLoader());
            } catch (e) {
                dispatch(hideLoader());
                failed = true;
                message = 'Node connection failed - Invalid Indexer configuration.';
            }
        }


        if (failed) {
            if (isBrave()) {
                message += ' If you are using Brave browser, localhost connections are shielded by default. Please turnoff shields and try again. <a href="https://support.brave.com/hc/en-us/articles/360023646212-How-do-I-configure-global-and-site-specific-Shields-settings" target="_blank">Click here</a> to know more.';
            }

            dispatch(showSnack({
                severity: 'error',
                message
            }));

            return;
        }
        dispatch(showLoader('Saving node configuration ...'));
        localStorage.setItem('algodUrl', algodUrl);
        localStorage.setItem('algodPort', algodPort || '');
        localStorage.setItem('algodToken', algodToken || '');
        localStorage.setItem('indexerUrl', indexerUrl);
        localStorage.setItem('indexerPort', indexerPort || '');
        localStorage.setItem('indexerToken', indexerToken || '');
        dispatch(hideSettings());
        dispatch(hideLoader());
        window.location.reload();
    }

    return (<div>
        {show ? <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <div style={{fontWeight: "bold", fontSize: 18}}>Node Settings</div>
                    </div>
                    <IconButton color="primary" onClick={() => {
                        dispatch(hideSettings());
                        clearState();
                    }}>
                        <CancelOutlined />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="settings-wrapper">
                    <div className="settings-container">
                        <div className="settings-header">
                            {nodes.map((node) => {
                                return <Chip
                                    key={node.id}
                                    label={node.label}
                                    color={"primary"}
                                    className="node"
                                    onClick={() => {
                                        const {algod, indexer} = node;
                                        setState(prevState => ({...prevState,
                                            algodUrl: algod.url,
                                            algodToken: algod.token as string,
                                            algodPort: algod.port,
                                            indexerUrl: indexer.url,
                                            indexerToken: indexer.token as string,
                                            indexerPort: indexer.port
                                        }));
                                    }
                                    }
                                    size={"small"}></Chip>
                            })}
                        </div>
                        <div className="settings-body">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod url</FormLabel>
                                    <ShadedInput
                                        placeholder="http://localhost"
                                        value={algodUrl}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, algodUrl: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod port</FormLabel>
                                    <ShadedInput
                                        placeholder="4001"
                                        value={algodPort}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, algodPort: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod token</FormLabel>
                                    <ShadedInput
                                        placeholder="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                        value={algodToken}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, algodToken: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>





                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer url</FormLabel>
                                    <ShadedInput
                                        placeholder="http://localhost"
                                        value={indexerUrl}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, indexerUrl: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer port</FormLabel>
                                    <ShadedInput
                                        placeholder="8980"
                                        value={indexerPort}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, indexerPort: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer token</FormLabel>
                                    <ShadedInput
                                        placeholder=""
                                        value={indexerToken}
                                        onChange={(ev) => {
                                            setState(prevState => ({...prevState, indexerToken: ev.target.value}));
                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div style={{textAlign: "center", marginTop: 10}}>
                                        <Button
                                            variant={"outlined"}
                                            size={"large"}
                                            color={"primary"}
                                            onClick={() => {
                                                dispatch(hideSettings());
                                                clearState();
                                            }}
                                        >Cancel</Button>

                                        <Button
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            style={{marginLeft: 15}}
                                            onClick={() => {
                                                saveConfig();
                                            }}
                                        >Save</Button>
                                    </div>

                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog> : ''}
    </div>);
}

export default Settings;
