import './Arc3Workspace.scss';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel, MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField, Typography
} from "@mui/material";
import {A_Asset} from "../../../../../packages/core-sdk/types";
import {AssetClient} from "../../../../../packages/core-sdk/clients/assetClient";
import dappflow from "../../../../../utils/dappflow";
import {handleException} from "../../../../../redux/common/actions/exception";
import {hideLoader, showLoader} from "../../../../../redux/common/actions/loader";
import {ARC3} from "../../../../../packages/arc-portal/classes/ARC3";
import {A_Arc_Validation} from "../../../../../packages/arc-portal/types";
import {Alert} from "@mui/lab";

interface Arc3WorkspaceState{
    validateUsing: string,
    assetId: string,
    asset: A_Asset,
    disabled: boolean,
    validation: A_Arc_Validation
}
const initialState: Arc3WorkspaceState = {
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
        errors: []
    }
};

const decimalsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const inputSx = {
    fieldset: {
        borderRadius: "10px"
    },
    ".Mui-disabled": {
        background: "#f9f9f9"
    }
};

function Arc3Workspace(): JSX.Element {

    const dispatch = useDispatch();

    const [
        {validateUsing, assetId, asset, disabled, validation},
        setState
    ] = useState(initialState);


    async function validate(asset: A_Asset) {
        try {
            dispatch(showLoader("Validating ARC3 metadata."));
            setState(prevState => ({...prevState, validation: {
                    valid: false,
                    errors: []
                }}));
            const arc3Instance = new ARC3(asset);
            const validation = await arc3Instance.validate();
            setState(prevState => ({...prevState, validation: validation}));
            dispatch(hideLoader());
        }
        catch (e: any) {
            dispatch(hideLoader());
            dispatch(handleException(e));
        }
    }

    return (<div className={"arc3-workspace-wrapper"}>
        <div className={"arc3-workspace-container"}>

            <div className="arc3-workspace-header">

            </div>

                <div className="arc3-workspace-body">

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                                            endAdornment: <div>
                                                <Button disabled={!assetId} color={"primary"} size={"small"} variant={"contained"} onClick={async () => {
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

                                                        setState(prevState => ({...prevState, asset}));
                                                        dispatch(hideLoader());
                                                    }
                                                    catch (e: any) {
                                                        dispatch(hideLoader());
                                                        dispatch(handleException(e));
                                                        setState(prevState => ({...prevState, asset: initialState.asset, validation: initialState.validation}));
                                                    }

                                                }}>Fetch</Button>
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
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="decimals-label">Decimals</InputLabel>
                                        <Select
                                            value={asset.params.decimals}
                                            onChange={(ev) => {
                                                setState(prevState => ({...prevState, asset: {
                                                        ...asset,
                                                        params: {
                                                            ...asset.params,
                                                            decimals: Number(ev.target.value)
                                                        }
                                                    }}));
                                            }}
                                            fullWidth
                                            labelId="decimals-label"
                                            color={"primary"}
                                            label="Decimals"
                                            disabled={disabled}
                                            sx={{
                                                fieldset: {
                                                    borderRadius: "10px"
                                                },
                                                ".Mui-disabled": {
                                                    background: "#f9f9f9"
                                                },
                                            }}
                                        >
                                            {decimalsList.map((dec) => {
                                                return <MenuItem value={dec} key={dec}>{dec}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
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
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div style={{marginTop: 60}}>
                                {validation.valid ? <div>
                                    <Alert color={"success"}>
                                        Valid ARC3 Asset.
                                    </Alert>
                                </div> : ''}
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

export default Arc3Workspace;
