import './ABIStudio.scss';
import React, {useEffect} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {deleteAbi, loadAbi, updateAbi, updateAppId} from "../../../../redux/abi/actions/abiStudio";
import {ABIContractParams} from "algosdk";
import {CoreNode} from "../../../../packages/core-sdk/classes/core/CoreNode";


function ABIStudio(): JSX.Element {


    const dispatch = useDispatch();
    const wallet = useSelector((state: RootState) => state.wallet);
    const abiStudio = useSelector((state: RootState) => state.abiStudio);
    const {health, genesis, status, versionsCheck} = useSelector((state: RootState) => state.node);
    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);
    const {abi, appId} = abiStudio;

    useEffect(() => {
        dispatch(loadAbi());
    }, []);

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>

            <div className={"abi-studio-header"}>
                <div>
                    ABI Studio
                </div>
            </div>

            <div className={"abi-studio-body"}>
                <ABIActions onImport={(abi: ABIContractParams) => {
                    dispatch(updateAbi(abi));
                    const {networks} = abi;
                    if (networks) {
                        Object.keys(networks).forEach((name) => {
                            if (name === coreNodeInstance.getGenesisHash() && networks[name].appID) {
                                dispatch(updateAppId(networks[name].appID.toString()));
                            }
                        });
                    }
                }}></ABIActions>
                {abi.name ? <ABIEditor abi={abi} supportExecutor={true} supportCreateApp={true} appId={appId} account={wallet.account} supportDelete={true} onDelete={() => {dispatch(deleteAbi())}}></ABIEditor> : ''}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
