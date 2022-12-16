import './ABIActions.scss';
import React, {useState} from "react";
import {
    Button
} from "@mui/material";
import ImportABI from "../ImportABI/ImportABI";
import AddIcon from '@mui/icons-material/Add';


interface ABIActionsState{
    show: boolean
}

const initialState: ABIActionsState = {
    show: false
};

function ABIActions(props): JSX.Element {

    const [
        {show},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    return (<div className={"abi-actions-wrapper"}>
        <div className={"abi-actions-container"}>

            <Button color={"primary"}
                    className="black-button"
                    variant={"contained"}
                    onClick={() => {
                        setState(prevState => ({...prevState, show: true}));
                    }}
                    startIcon={<AddIcon></AddIcon>}
            >Import ABI</Button>

            <ImportABI show={show} onImport={(abi) => {
                props.onImport(abi);
                clearState();
            }} onClose={() => {
                clearState();
            }}></ImportABI>

        </div>
    </div>);
}

export default ABIActions;
