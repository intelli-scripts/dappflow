import './ABIMethods.scss';
import React, {} from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ABIMethod from "../ABIMethod/ABIMethod";
import {ABIContract, ABIContractParams} from "algosdk";
import {theme} from "../../../../theme";


function ABIMethods(props): JSX.Element {
    let abi: ABIContractParams = props.abi;

    const abiInstance = new ABIContract(abi);

    return (<div className={"abi-methods-wrapper"}>
        <div className={"abi-methods-container"}>

            <div className={"abi-methods-header"}>
                <IntegrationInstructionsOutlinedIcon color={"primary"}></IntegrationInstructionsOutlinedIcon>
                <span style={{color: theme.palette.primary.main}}>Methods</span>
            </div>
            <div className={"abi-methods-body"}>
                {abiInstance.methods.map((method, index) => {
                    return <div key={"method_" + index}>
                        <ABIMethod method={method.toJSON()}></ABIMethod>
                    </div>;
                })}
            </div>

        </div>
    </div>);
}

export default ABIMethods;
