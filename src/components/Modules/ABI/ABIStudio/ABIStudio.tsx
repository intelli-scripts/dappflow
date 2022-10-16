import './ABIStudio.scss';
import React, {useState} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {ABIContractParams} from "algosdk";

interface ABIStudioState{
    imported: boolean,
    abi: ABIContractParams
}

const initialState: ABIStudioState = {
    imported: false,
    abi: {methods: [], name: ""}
};

function ABIStudio(): JSX.Element {


    const [
        {imported, abi},
        setState
    ] = useState(initialState);

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>



            <div className={"abi-studio-header"}>
                <div>
                    ABI Studio
                </div>
            </div>

            <div className={"abi-studio-body"}>
                <ABIActions onImport={(abi) => {
                    setState(prevState => ({...prevState, abi, imported: true}));
                }}></ABIActions>
                {imported ? <ABIEditor abi={abi}></ABIEditor> : ''}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
