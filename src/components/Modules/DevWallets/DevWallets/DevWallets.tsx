import './DevWallets.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {copyContent, shadedClr} from "../../../../utils/common";
import {createDevWallet, deleteDevWallet, loadDevWallets} from "../../../../redux/devWallets/actions/devWallets";
import {generateAccount, secretKeyToMnemonic} from 'algosdk'
import {A_Dev_Wallet} from "../../../../packages/dev-wallets/types";
import {RootState} from "../../../../redux/store";
import {showSnack} from "../../../../redux/common/actions/snackbar";


function DevWallets(): JSX.Element {


    const dispatch = useDispatch();
    const devWallets = useSelector((state: RootState) => state.devWallets);
    const wallet = useSelector((state: RootState) => state.wallet);
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
                        {wallets.map((devWallet) => {
                            return <div className="wallet-wrapper" key={devWallet.address}>
                                <div className="wallet-container">
                                    <div className="wallet-address">
                                        {devWallet.address}
                                        <div style={{marginTop: '10px'}}>
                                            <Button color={"primary"}
                                                    size={"small"}
                                                    variant={"text"}
                                                    onClick={() => {
                                                        window.open('/explorer/account/' + devWallet.address, '_blank');
                                                    }}
                                            >View in explorer</Button>
                                            <Button color={"primary"}
                                                    size={"small"}
                                                    variant={"text"}
                                                    onClick={(event) => {
                                                        copyContent(event, dispatch, devWallet.address, 'Address copied');
                                                    }}
                                            >Copy</Button>
                                        </div>
                                    </div>
                                    <div className="wallet-actions">
                                        <Button color={"warning"}
                                                size={"small"}
                                                variant={"outlined"}
                                                onClick={() => {
                                                    if (wallet.account.address === devWallet.address) {
                                                        dispatch(showSnack({
                                                            severity: 'error',
                                                            message: 'You are trying to delete the connected wallet. please disconnect you wallet before deleting.'
                                                        }));
                                                        return;
                                                    }

                                                    dispatch(deleteDevWallet(devWallet.address));
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
