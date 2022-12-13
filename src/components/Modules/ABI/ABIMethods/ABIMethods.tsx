import './ABIMethods.scss';
import React, {useState} from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ABIMethod from "../ABIMethod/ABIMethod";
import {ABIContract, ABIContractParams} from "algosdk";
import {theme} from "../../../../theme";
import LinkToApplication from "../../Explorer/Common/Links/LinkToApplication";
import {A_AccountInformation} from "../../../../packages/core-sdk/types";
import ABIConfig from "../ABIConfig/ABIConfig";
import {Edit} from "@mui/icons-material";
import {Tooltip} from "@mui/material";

type ABIMethodsProps = {
    abi: ABIContractParams,
    supportExecutor?: boolean,
    account: A_AccountInformation,
    appId: string
};

interface ABIMethodsState{
    showConfig: boolean,
}

const initialState: ABIMethodsState = {
    showConfig: false,
};

function ABIMethods({abi, supportExecutor = false, account, appId = ''}: ABIMethodsProps): JSX.Element {

    const abiInstance = new ABIContract(abi);


    const [
        {showConfig},
        setState
    ] = useState(initialState);

    return (<div className={"abi-methods-wrapper"}>
        <div className={"abi-methods-container"}>

            <div className={"abi-methods-header"}>

                <div style={{color: theme.palette.primary.main}}>
                    <IntegrationInstructionsOutlinedIcon color={"primary"}></IntegrationInstructionsOutlinedIcon>
                    Methods
                </div>
                <div className="app-id">

                    App ID : {appId ? <LinkToApplication id={appId}></LinkToApplication> : 'null'}

                    {supportExecutor ? <span style={{marginLeft: '10px'}}>
                        <Tooltip title="Edit">
                          <Edit
                              sx={{
                                  color: theme.palette.common.black,
                                  '&:hover': {
                                      cursor: 'pointer'
                                  }}}
                              color={"primary"}
                              fontSize={"small"}
                              onClick={() => {
                                  setState(prevState => ({...prevState, showConfig: true}));
                              }}></Edit>
                        </Tooltip>



                        {/*{appId ? <Tooltip title="OptIn">*/}
                        {/*    <LoginIcon*/}
                        {/*        sx={{*/}
                        {/*            color: theme.palette.common.black,*/}
                        {/*            '&:hover': {*/}
                        {/*                cursor: 'pointer'*/}
                        {/*            }}}*/}
                        {/*        color={"primary"}*/}
                        {/*        fontSize={"small"}*/}
                        {/*        onClick={() => {*/}

                        {/*        }}></LoginIcon>*/}
                        {/*</Tooltip> : ''}*/}

                        <ABIConfig show={showConfig} appId={appId} handleClose={() => {setState(prevState => ({...prevState, showConfig: false}));}}></ABIConfig>
                    </span> : ''}

                </div>

            </div>
            <div className={"abi-methods-body"}>
                {abiInstance.methods.map((method, index) => {
                    return <div key={"method_" + index}>
                        <ABIMethod appId={appId} method={method.toJSON()} supportExecutor={supportExecutor} account={account}></ABIMethod>
                    </div>;
                })}
            </div>

        </div>
    </div>);
}

export default ABIMethods;
