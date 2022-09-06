import './ABIActions.scss';
import React, {useState} from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
    Button
} from "@mui/material";
import ImportABI from "../ImportABI/ImportABI";


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
                    variant={"contained"}
                    onClick={() => {
                        setState(prevState => ({...prevState, show: true}));
                    }}
                    startIcon={<FileDownloadIcon></FileDownloadIcon>}
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
