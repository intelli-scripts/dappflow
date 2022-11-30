import './ABIStudio.scss';
import React, {useEffect, useState} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {ABIContractParams} from "algosdk";
import ABIConfig from "../../../../packages/abi/classes/ABIConfig";

interface ABIStudioState{
    imported: boolean,
    abi: ABIContractParams
}

const initialState: ABIStudioState = {
    imported: false,
    abi: {methods: [], name: ""}
};

function ABIStudio(): JSX.Element {


    useEffect(() => {
        const storedAbi = localStorage.getItem('abi');
        if (storedAbi) {
            setState(prevState => ({...prevState, abi: JSON.parse(storedAbi), imported: true}));
        }

    }, []);

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
                    new ABIConfig().setAppId("");
                    localStorage.setItem('abi', JSON.stringify(abi));
                }}></ABIActions>
                {imported ? <ABIEditor abi={abi} supportExecutor={true} supportCreateApp={true} supportConfig={true}></ABIEditor> : ''}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
