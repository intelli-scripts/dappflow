import './DevWallets.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {shadedClr} from "../../../../utils/common";
import {createDevWallet, deleteDevWallet, loadDevWallets} from "../../../../redux/devWallets/actions/devWallets";
import {generateAccount, secretKeyToMnemonic} from 'algosdk'
import {A_Dev_Wallet} from "../../../../packages/dev-wallets/types";
import {RootState} from "../../../../redux/store";


function DevWallets(): JSX.Element {


    const dispatch = useDispatch();
    const devWallets = useSelector((state: RootState) => state.devWallets);
    const {wallets} = devWallets;


    useEffect(() => {
        dispatch(loadDevWallets());
    }, []);

    return (<div className={"dev-wallets-wrapper"}>
        <div className={"dev-wallets-container"}>

            <div className={"dev-wallets-header"}>
                <div>
                    Dev Wallets
                </div>
            </div>

            <div className={"dev-wallets-body"}>
                <div className={"dev-wallets-actions-wrapper"}>
                    <div className={"dev-wallets-actions-container"}>
                        <Button color={"primary"}
                                className="black-button"
                                variant={"contained"}
                                onClick={() => {
                                    const account = generateAccount();
                                    const mnemonic = secretKeyToMnemonic(account.sk);

                                    const devWallet: A_Dev_Wallet = {
                                        address: account.addr,
                                        mnemonic
                                    };

                                    dispatch(createDevWallet(devWallet));
                                }}
                                startIcon={<AddIcon></AddIcon>}
                        >Create wallet</Button>
                    </div>
                </div>

                <div className={"dev-wallets-list-wrapper"}>
                    <div className={"dev-wallets-list-container"} style={{background: shadedClr}}>
                        {wallets.map((wallet) => {
                            return <div className="wallet-wrapper" key={wallet.address}>
                                <div className="wallet-container">
                                    <div className="wallet-address">
                                        {wallet.address}
                                    </div>
                                    <div className="wallet-actions">
                                        <Button color={"warning"}
                                                size={"small"}
                                                variant={"outlined"}
                                                onClick={() => {
                                                    dispatch(deleteDevWallet(wallet.address));
                                                }}
                                        >Delete</Button>
                                    </div>
                                </div>
                            </div>;
                        })}

                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default DevWallets;
