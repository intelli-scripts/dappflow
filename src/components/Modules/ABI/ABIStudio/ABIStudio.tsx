import './ABIStudio.scss';
import React, {useState} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {A_ABI} from "../../../../packages/abi/types";

interface ABIStudioState{
    imported: boolean,
    abi: A_ABI
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
                <ABIActions onImport={(abi) => {
                    console.log(abi);
                    setState(prevState => ({...prevState, abi, imported: true}));
                }}></ABIActions>
            </div>
            <div className={"abi-studio-body"}>
                {imported ? <ABIEditor abi={abi}></ABIEditor> : ''}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
