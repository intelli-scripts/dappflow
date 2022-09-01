import './ABIMethods.scss';
import React, {} from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ABIMethod from "../ABIMethod/ABIMethod";
import {A_ABI_Method} from "../../../../packages/abi/types";


function ABIMethods(props): JSX.Element {
    let methods: A_ABI_Method[] = props.methods;

    if (!methods) {
        methods = [];
    }

    return (<div className={"abi-methods-wrapper"}>
        <div className={"abi-methods-container"}>

            <div className={"abi-methods-header"}>
                <IntegrationInstructionsOutlinedIcon color={"primary"}></IntegrationInstructionsOutlinedIcon>
                Methods
            </div>
            <div className={"abi-methods-body"}>
                {methods.map((method, index) => {
                    return <div key={"method_" + index}>
                        <ABIMethod method={method}></ABIMethod>
                    </div>;
                })}
            </div>

        </div>
    </div>);
}

export default ABIMethods;
