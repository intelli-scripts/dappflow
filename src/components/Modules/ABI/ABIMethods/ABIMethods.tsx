import './ABIMethods.scss';
import React, {} from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ABIMethod from "../ABIMethod/ABIMethod";
import {ABIContract, ABIContractParams} from "algosdk";
import {theme} from "../../../../theme";
import ABIConfig from "../../../../packages/abi/classes/ABIConfig";
import LinkToApplication from "../../Explorer/Common/Links/LinkToApplication";

type ABIMethodsProps = {
    abi: ABIContractParams,
    supportExecutor?: boolean
};

function ABIMethods({abi, supportExecutor = false}: ABIMethodsProps): JSX.Element {

    const abiInstance = new ABIContract(abi);
    const appId = new ABIConfig().getAppId();

    return (<div className={"abi-methods-wrapper"}>
        <div className={"abi-methods-container"}>

            <div className={"abi-methods-header"}>

                <div style={{color: theme.palette.primary.main}}>
                    <IntegrationInstructionsOutlinedIcon color={"primary"}></IntegrationInstructionsOutlinedIcon>
                    Methods
                </div>
                <div className="app-id">

                    App ID : {appId ? <LinkToApplication id={appId}></LinkToApplication> : 'null'}
                </div>

            </div>
            <div className={"abi-methods-body"}>
                {abiInstance.methods.map((method, index) => {
                    return <div key={"method_" + index}>
                        <ABIMethod method={method.toJSON()} supportExecutor={supportExecutor}></ABIMethod>
                    </div>;
                })}
            </div>

        </div>
    </div>);
}

export default ABIMethods;
