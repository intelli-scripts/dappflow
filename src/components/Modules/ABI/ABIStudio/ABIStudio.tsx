import './ABIStudio.scss';
import React, {useEffect} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {loadAbi, updateAbi} from "../../../../redux/abi/actions/abiStudio";


function ABIStudio(): JSX.Element {


    const dispatch = useDispatch();
    const wallet = useSelector((state: RootState) => state.wallet);
    const abiStudio = useSelector((state: RootState) => state.abiStudio);
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
                <ABIActions onImport={(abi) => {
                    dispatch(updateAbi(abi));
                }}></ABIActions>
                {abi.name ? <ABIEditor abi={abi} supportExecutor={true} supportCreateApp={true} appId={appId} account={wallet.account}></ABIEditor> : ''}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
