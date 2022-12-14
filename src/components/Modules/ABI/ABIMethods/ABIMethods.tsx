import './ABIMethods.scss';
import React, {useState} from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ABIMethod from "../ABIMethod/ABIMethod";
import {ABIContract, ABIContractParams, OnApplicationComplete} from "algosdk";
import {theme} from "../../../../theme";
import LinkToApplication from "../../Explorer/Common/Links/LinkToApplication";
import {A_AccountInformation} from "../../../../packages/core-sdk/types";
import ABIConfig from "../ABIConfig/ABIConfig";
import {Edit} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {ApplicationTransaction} from "../../../../packages/core-sdk/transactions/applicationTransaction";
import dappflow from "../../../../utils/dappflow";
import {TransactionClient} from "../../../../packages/core-sdk/clients/transactionClient";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {handleException} from "../../../../redux/common/actions/exception";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();


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

                {supportExecutor ? <div className="app-id">

                    App ID : {appId ? <LinkToApplication id={appId}></LinkToApplication> : 'null'}

                    <span style={{marginLeft: '10px'}}>
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



                        {appId ? <Tooltip title="OptIn">
                            <LoginIcon
                                sx={{
                                    color: theme.palette.common.black,
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }}}
                                color={"primary"}
                                fontSize={"small"}
                                onClick={async () => {
                                    try {
                                        dispatch(showLoader('Signing transaction'));

                                        const appCallInstance = new ApplicationTransaction(dappflow.network);
                                        const unsignedTxn = await appCallInstance.prepareOptInTxn({
                                            appArgs: [],
                                            appForeignApps: [],
                                            appForeignAssets: [],
                                            appIndex: Number(appId),
                                            appOnComplete: OnApplicationComplete.OptInOC,
                                            boxes: [],
                                            fee: 0,
                                            firstRound: 0,
                                            flatFee: false,
                                            from: account.address,
                                            genesisHash: "",
                                            genesisID: "",
                                            lastRound: 0,
                                            lease: undefined,
                                            reKeyTo: undefined,
                                            suggestedParams: undefined,
                                            type: undefined,
                                            appAccounts: [],
                                            note:undefined
                                        });

                                        const signedTxn = await dappflow.signer.signTxn(unsignedTxn);
                                        dispatch(hideLoader());

                                        dispatch(showLoader('Broadcasting transaction to network'));
                                        const {txId} = await appCallInstance.send(signedTxn);
                                        dispatch(hideLoader());

                                        dispatch(showLoader('Waiting for confirmation'));
                                        await appCallInstance.waitForConfirmation(txId);
                                        dispatch(hideLoader());

                                        dispatch(showLoader('Waiting for transaction on indexer'));
                                        await appCallInstance.waitTillIndexerTxnFound(txId);

                                        await new TransactionClient(dappflow.network).get(txId);


                                        dispatch(showSnack({
                                            severity: 'success',
                                            message: 'Application OptIn successful.'
                                        }));
                                        dispatch(hideLoader());
                                    }
                                    catch (e: any) {
                                        dispatch(hideLoader());
                                        dispatch(handleException(e));
                                    }
                                }}></LoginIcon>
                        </Tooltip> : ''}

                        <ABIConfig show={showConfig} appId={appId} handleClose={() => {setState(prevState => ({...prevState, showConfig: false}));}}></ABIConfig>
                    </span>

                </div> : ''}


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
