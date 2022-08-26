import './Arc19Workspace.scss';
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import {A_Asset} from "../../../../../../../packages/core-sdk/types";
import {AssetClient} from "../../../../../../../packages/core-sdk/clients/assetClient";
import dappflow from "../../../../../../../utils/dappflow";
import {handleException} from "../../../../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../../../../redux/common/actions/loader";
import {A_Arc_Validation} from "../../../../../../../packages/arc-portal/types";
import {Alert} from "@mui/lab";
import CallMadeIcon from '@mui/icons-material/CallMade';
import {ARC19} from "../../../../../../../packages/arc-portal/classes/ARC19/ARC19";
import {useSearchParams} from "react-router-dom";
import LinkToAsset from "../../../../../Explorer/Common/Links/LinkToAsset";
import JsonViewer from "../../../../../../Common/JsonViewer/JsonViewer";
import Arc16Alert from "../Arc16/Arc16Alert/Arc16Alert";

interface Arc19WorkspaceState{
    validateUsing: string,
    assetId: string,
    asset: A_Asset,
    disabled: boolean,
    validation: A_Arc_Validation,
    metadata: any
}
const initialState: Arc19WorkspaceState = {
    validateUsing: "asset_id",
    assetId: "",
    disabled: true,
    asset: {
        index: 0,
        params: {
            clawback: "",
            creator: "",
            decimals: 0,
            "default-frozen": false,
            freeze: "",
            manager: "",
            name: "",
            "name-b64": "",
            reserve: "",
            total: 0,
            "unit-name": "",
            "unit-name-b64": "",
            url: "",
            "url-b64": "",
            "metadata-hash": "",
        }
    },
    validation: {
        valid: false,
        errors:[],
        warnings: []
    },
    metadata: {}
};

const inputSx = {
    fieldset: {
        borderRadius: "10px"
    },
    ".Mui-disabled": {
        background: "#f9f9f9"
    }
};

function Arc19Workspace(): JSX.Element {

    const dispatch = useDispatch();

    const [
        {validateUsing, assetId, asset, disabled, validation, metadata},
        setState
    ] = useState(initialState);

    const [searchParams, setSearchParams] = useSearchParams();
    const assetIdInUrl = searchParams.get("asset_id");

    useEffect(() => {
        if (assetIdInUrl) {
            setState(prevState => ({...prevState, assetId: assetIdInUrl}));
            fetchAsset(assetIdInUrl);
        }

    }, []);

    async function validate(asset: A_Asset) {
        try {
            dispatch(showLoader("Validating ARC19 specs."));
            setState(prevState => ({...prevState, validation: initialState.validation}));
            const arc19Instance = new ARC19(asset);
            const validation = await arc19Instance.validate();
            if (validation.valid) {
                const metadata = await arc19Instance.getMetadata();
                setState(prevState => ({...prevState, validation: validation, metadata: metadata}));
            }
            else {
                setState(prevState => ({...prevState, validation: validation}));
            }
            dispatch(hideLoader());
        }
        catch (e: any) {
            dispatch(hideLoader());
            dispatch(handleException(e));
        }
    }

    async function fetchAsset(assetId: string) {
        try {
            dispatch(showLoader("Fetching asset metadata"));
            const assetInstance = new AssetClient(dappflow.network);
            const asset = await assetInstance.get(Number(assetId));

            if (!asset.params.url) {
                asset.params.url = '';
            }
            if (!asset.params["metadata-hash"]) {
                asset.params["metadata-hash"] = '';
            }

            setState(prevState => ({...prevState, asset, validation: initialState.validation}));
            dispatch(hideLoader());
            validate(asset);
        }
        catch (e: any) {
            dispatch(hideLoader());
            dispatch(handleException(e));
            setState(prevState => ({...prevState, asset: initialState.asset, validation: initialState.validation}));
        }
    }

    return (<div className={"arc19-workspace-wrapper"}>
        <div className={"arc19-workspace-container"}>

            <div className="arc19-workspace-header">

            </div>

                <div className="arc19-workspace-body">

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="validation-form">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <RadioGroup name="validate_using"
                                                    row
                                                    value={validateUsing}
                                                    onChange={(ev) => {
                                                        const val = ev.target.value;
                                                        let disabled = val === 'asset_id';

                                                        setState(prevState => ({...prevState, validateUsing: val, disabled}));
                                                    }}>
                                            <FormControlLabel value={"manual_metadata"} control={<Radio color={"primary"}/>} label="Manual Metadata" />
                                            <FormControlLabel value={"asset_id"} control={<Radio color={"primary"}/>} label="Asset ID" />

                                        </RadioGroup>
                                    </Grid>
                                    {validateUsing === 'asset_id' ? <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <TextField
                                            type={"number"}
                                            required
                                            size={"medium"}
                                            sx={inputSx}
                                            value={assetId}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, assetId: ev.target.value + ""}));
                                            }}
                                            style={{marginTop: -10}}
                                            label="Asset ID"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <Button disabled={!assetId} color={"primary"} size={"small"} variant={"contained"} onClick={async () => {
                                                        await fetchAsset(assetId);
                                                        setSearchParams({
                                                            asset_id: assetId
                                                        });
                                                    }}>Fetch</Button>
                                                    {assetId ? <span style={{marginLeft: 5, marginTop: 5}}>
                                                        <LinkToAsset id={assetId} name="View"></LinkToAsset>
                                                    </span> : ''}
                                                </div>
                                            }}
                                        />

                                    </Grid> : ''}











                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            required
                                            value={asset.params.name}
                                            sx={inputSx}
                                            placeholder="US Dollar"
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            name: ev.target.value
                                                        }
                                                    }}));
                                            }}
                                            disabled={disabled}
                                            label="Name" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            required
                                            placeholder="USDT"
                                            sx={inputSx}
                                            value={asset.params["unit-name"]}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            "unit-name": ev.target.value
                                                        }
                                                    }}));
                                            }}
                                            disabled={disabled}
                                            label="Unit name" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            required
                                            value={asset.params.total}
                                            placeholder="1000000"
                                            sx={inputSx}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            total: Number(ev.target.value)
                                                        }
                                                    }}));
                                            }}
                                            type="number"
                                            disabled={disabled}
                                            label="Total supply" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            value={asset.params.url}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            url: ev.target.value
                                                        }
                                                    }}));
                                            }}
                                            multiline
                                            sx={inputSx}
                                            rows={2}
                                            disabled={disabled}
                                            placeholder="https://www.algorand.com"
                                            label="Url" variant="outlined" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            value={asset.params.reserve}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            reserve: ev.target.value
                                                        }
                                                    }}));
                                            }}
                                            multiline
                                            sx={inputSx}
                                            rows={2}
                                            disabled={disabled}
                                            placeholder="Reserve address"
                                            label="Reserve address" variant="outlined" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            value={asset.params["metadata-hash"]}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            "metadata-hash": ev.target.value
                                                        }
                                                    }}));
                                            }}
                                            multiline
                                            sx={inputSx}
                                            rows={2}
                                            disabled={disabled}
                                            placeholder="32 characters | 32 base64 characters | 64 Hex characters"
                                            label="Metadata hash" variant="outlined" fullWidth/>
                                    </Grid>




                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Button
                                            fullWidth
                                            size={"large"}
                                            color={"primary"}
                                            variant={"contained"} onClick={async () => {
                                            await validate(asset);
                                        }}>Validate</Button>
                                    </Grid>







                                </Grid>
                            </div>


                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="validation-result">

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        {validation.valid ? <div>
                                            <Alert color={"success"} sx={{marginBottom: '15px'}}>
                                                Valid ARC19 Asset.
                                            </Alert>

                                            <div style={{marginTop: 10}}>
                                                <JsonViewer obj={metadata} name="View metadata" title="ARC19 metadata" size="large" fullWidth={true} variant="outlined"></JsonViewer>
                                            </div>


                                            <Button
                                                variant={"outlined"}
                                                endIcon={<CallMadeIcon></CallMadeIcon>}
                                                fullWidth
                                                size={"large"}
                                                style={{marginTop: 10}}
                                                onClick={() => {
                                                        const assetInstance = new ARC19(asset);
                                                        const url = assetInstance.getMetadataUrl();
                                                        window.open(url, "_blank");
                                                    }
                                                }
                                            >Open metadata</Button>


                                            <div style={{marginTop: 10}}>
                                                <Arc16Alert metadata={metadata}></Arc16Alert>
                                            </div>

                                        </div> : ''}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        {validation.valid ? <div style={{marginBottom: 15}}>




                                        </div> : ''}
                                    </Grid>
                                </Grid>


                                {validation.errors.map((error, index)=> {
                                    return <div key={"error_" + index}>
                                        <Alert icon={false} color={"warning"}>
                                            <Typography style={{ whiteSpace: "pre-line" }}>
                                                {error}
                                            </Typography>
                                        </Alert>
                                    </div>;
                                })}
                            </div>

                        </Grid>
                    </Grid>




                </div>



        </div>
    </div>);
}

export default Arc19Workspace;
