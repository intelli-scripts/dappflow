import './AssetARCValidator.scss';
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import {ARC3} from "../../../../../../../packages/arc-portal/classes/ARC3/ARC3";
import {ARC19} from "../../../../../../../packages/arc-portal/classes/ARC19/ARC19";
import {ARC69} from "../../../../../../../packages/arc-portal/classes/ARC69/ARC69";
import dappflow from "../../../../../../../utils/dappflow";
import {A_Arc_Validation} from "../../../../../../../packages/arc-portal/types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    CircularProgress
} from "@mui/material";

interface AssetArcValidatorState{
    show: boolean,
    arc3Validation: A_Arc_Validation & {
        phase: number,
        arcNumber: number
    },
    arc19Validation: A_Arc_Validation & {
        phase: number,
        arcNumber: number
    },
    arc69Validation: A_Arc_Validation & {
        phase: number,
        arcNumber: number
    }
}
const initialState: AssetArcValidatorState = {
    arc3Validation: {
        phase: 0,
        valid: false,
        errors: [],
        warnings: [],
        arcNumber: 3
    },
    arc19Validation: {
        phase: 0,
        valid: false,
        errors: [],
        warnings: [],
        arcNumber: 19
    },
    arc69Validation: {
        phase: 0,
        valid: false,
        errors: [],
        warnings: [],
        arcNumber: 69
    },
    show: false
};

function AssetARCValidator(props): JSX.Element {

    const [
        {show, arc3Validation, arc19Validation, arc69Validation},
        setState
    ] = useState(initialState);

    let {asset} = props;


    async function validate() {
        setState(prevState => ({...prevState, arc3Validation: {...prevState.arc3Validation, phase: 1}}));
        const arc3Instance = new ARC3(asset);
        const arc3Validation = await arc3Instance.validate();
        setState(prevState => ({...prevState, arc3Validation: {...prevState.arc3Validation, ...arc3Validation, phase: 2}}));

        setState(prevState => ({...prevState, arc19Validation: {...prevState.arc19Validation, phase: 1}}));
        const arc19Instance = new ARC19(asset);
        const arc19Validation = await arc19Instance.validate();
        setState(prevState => ({...prevState, arc19Validation: {...prevState.arc19Validation, ...arc19Validation, phase: 2}}));

        setState(prevState => ({...prevState, arc69Validation: {...prevState.arc69Validation, phase: 1}}));
        const arc69Instance = new ARC69(asset);
        const arc69Validation = await arc69Instance.validate(dappflow.network.getIndexer());
        setState(prevState => ({...prevState, arc69Validation: {...prevState.arc69Validation, ...arc69Validation, phase: 2}}));
    }


    function handleClose() {
        setState(prevState => ({...prevState, show: false}));
    }

    return (<div className={"asset-arc-validator-wrapper"}>
        <div className={"asset-arc-validator-container"}>

            <Button
                variant={"outlined"}
                size={"small"}
                color={"primary"}
                onClick={() => {
                    setState(prevState => ({...prevState, show: true}));
                    validate();
                }}
            >Validate ARC's</Button>

            {show ? <Dialog
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
                open={show}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>ARC Validator</div>
                        </div>
                        <div>
                            <IconButton color="primary" onClick={handleClose}>
                                <CancelOutlined />
                            </IconButton>
                        </div>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="asset-arc-validator-content">
                        {[arc3Validation, arc19Validation, arc69Validation].map((validation) => {
                            return <div className="arc">
                                <div className="name">
                                    {validation.phase === 1 ? <CircularProgress size={20}></CircularProgress> : ''}
                                    {validation.phase === 2 ? <span className="result">
                                    {validation.valid ? <CheckCircleIcon color={"primary"}></CheckCircleIcon> : <CancelIcon style={{color: '#aaa'}}></CancelIcon>}
                                </span> : ''}
                                    <span className="number">
                                        ARC{validation.arcNumber}
                                    </span>

                                </div>
                                <div className="more">
                                    {validation.phase === 2 ? <div>
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            onClick={() => {
                                            window.open("/arc-portal/arc/" + validation.arcNumber + "/workspace?asset_id=" + asset.index, "_blank");
                                        }
                                        }>View more</Button>
                                    </div> : ''}
                                </div>
                            </div>;
                        })}


                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}


        </div>
    </div>);
}

export default AssetARCValidator;
