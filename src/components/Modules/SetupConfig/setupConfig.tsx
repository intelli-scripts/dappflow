import './setupConfig.scss';
import {Button, FormLabel, Grid, InputBase, InputBaseProps, styled} from "@mui/material";
import React, {useEffect, useState} from "react";
import {theme} from "../../../theme";
import {useSearchParams} from "react-router-dom";
import {isNumber} from "../../../utils/common";
import {showSnack} from "../../../redux/common/actions/snackbar";
import {NodeConnectionParams} from "../../../packages/core-sdk/types";
import {hideLoader, showLoader} from "../../../redux/common/actions/loader";
import {Network} from "../../../packages/core-sdk/network";
import {isBrave} from "../../../packages/core-sdk/utils";
import {useDispatch} from "react-redux";


const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        border: '1px solid ' + theme.palette.grey[200]
    };
});

const formLabelStyle = {
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.grey[600]
};

interface SetupConfigState{
    algodUrl: string,
    algodPort: string,
    algodToken: string,
    indexerUrl: string,
    indexerPort: string,
    indexerToken: string
}

const initialState: SetupConfigState = {
    algodPort: "",
    algodToken: "",
    algodUrl: "",
    indexerPort: "",
    indexerToken: "",
    indexerUrl: ""
};

function SetupConfig(): JSX.Element {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();


    const [
        {algodToken, algodUrl, indexerToken, indexerUrl, indexerPort, algodPort},
        setState
    ] = useState(initialState);

    useEffect(() => {
        const algodUrl = searchParams.get("algod_url") || '';
        const algodPort = searchParams.get("algod_port") || '';
        const algodToken = searchParams.get("algod_token") || '';

        const indexerUrl = searchParams.get("indexer_url") || '';
        const indexerPort = searchParams.get("indexer_port") || '';
        const indexerToken = searchParams.get("indexer_token") || '';

        setState(prevState => ({...prevState, algodUrl, algodPort, algodToken, indexerUrl, indexerPort, indexerToken}));

        saveConfig(algodUrl, algodPort, algodToken, indexerUrl, indexerPort, indexerToken);
    }, []);



    async function saveConfig(algodUrl: string, algodPort: string, algodToken: string, indexerUrl: string, indexerPort: string, indexerToken: string) {
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
        dispatch(hideLoader());

        const redirect = searchParams.get("redirect") || '/explorer';
        window.open(redirect,"_self");
    }

  return (
      <div className="setup-config-wrapper">
          <div className="setup-config-container">
              <div className={"setup-config-header"}>
                  <div>
                      Setup Config
                  </div>
              </div>

              <div className="setup-config-body">
                  <Grid container spacing={2}>
                      <Grid item xs={8} sm={8} md={6} lg={6} xl={6}>
                          <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Algod url</FormLabel>
                                  <ShadedInput
                                      placeholder="http://localhost"
                                      value={algodUrl}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, algodUrl: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Algod port</FormLabel>
                                  <ShadedInput
                                      placeholder="4001"
                                      value={algodPort}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, algodPort: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Algod token</FormLabel>
                                  <ShadedInput
                                      placeholder="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                      value={algodToken}
                                      multiline
                                      rows={4}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, algodToken: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>





                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Indexer url</FormLabel>
                                  <ShadedInput
                                      placeholder="http://localhost"
                                      value={indexerUrl}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, indexerUrl: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Indexer port</FormLabel>
                                  <ShadedInput
                                      placeholder="8980"
                                      value={indexerPort}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, indexerPort: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <FormLabel sx={formLabelStyle}>Indexer token</FormLabel>
                                  <ShadedInput
                                      placeholder=""
                                      value={indexerToken}
                                      multiline
                                      rows={4}
                                      onChange={(ev) => {
                                          setState(prevState => ({...prevState, indexerToken: ev.target.value}));
                                      }}
                                      fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <div style={{textAlign: "right", marginTop: 10}}>
                                      <Button
                                          variant={"contained"}
                                          size={"large"}
                                          color={"primary"}
                                          style={{marginLeft: 15}}
                                          className="black-button"
                                          onClick={() => {
                                              saveConfig(algodUrl, algodPort, algodToken, indexerUrl, indexerPort, indexerToken);
                                          }}
                                      >Continue</Button>
                                  </div>

                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>


              </div>
          </div>
      </div>
  );
}

export default SetupConfig;
