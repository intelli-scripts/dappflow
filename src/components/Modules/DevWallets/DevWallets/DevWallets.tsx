import './DevWallets.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {copyContent, shadedClr} from "../../../../utils/common";
import {
    createDevWallet,
    deleteDevWallet,
    loadDevWallets,
    resetDevWallets
} from "../../../../redux/devWallets/actions/devWallets";
import algosdk, {generateAccount, secretKeyToMnemonic, SuggestedParams, waitForConfirmation} from 'algosdk'
import {A_Dev_Wallet} from "../../../../packages/dev-wallets/types";
import {RootState} from "../../../../redux/store";
import {showSnack} from "../../../../redux/common/actions/snackbar";
import {CoreNode} from "../../../../packages/core-sdk/classes/core/CoreNode";
import {Alert} from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {KmdClient} from "../../../../packages/core-sdk/clients/kmdClient";
import dappflow from "../../../../utils/dappflow";
import {KMDConnectionParams} from "../../../../packages/core-sdk/types";
import {getKMDConfig} from "../../../../utils/nodeConfig";
import {handleException} from "../../../../redux/common/actions/exception";
import ShowerIcon from "@mui/icons-material/Shower";
import AccountBalance from "../../Explorer/Common/AccountBalance/AccountBalance";

function DevWallets(): JSX.Element {


    const dispatch = useDispatch();
    const devWallets = useSelector((state: RootState) => state.devWallets);
    const wallet = useSelector((state: RootState) => state.wallet);
    const {wallets} = devWallets;

    const node = useSelector((state: RootState) => state.node);
    const {versionsCheck, status, genesis, health} = node;
    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);
    const isMainnet = coreNodeInstance.isMainnet();
    const isSandbox = coreNodeInstance.isSandbox();


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

                {isMainnet ? <div>
                    <Alert color={'warning'} icon={false}>
                        For security reasons, This feature is not available for this network ({coreNodeInstance.getGenesisId()})
                    </Alert>
                </div> : <div>
                    <div className={"dev-wallets-actions-wrapper"}>
                        <div className={"dev-wallets-actions-container"}>
                            <Alert color={'warning'} icon={false}>
                                Use these wallets only for development purpose. Private keys of these wallets are stored on your local browser to sign the txns later in ABI studio.
                                These wallets are not secured properly, So please use these wallets carefully and Dappflow is not responsible for any loss of funds. For security reasons this feature is not available for mainnet.
                            </Alert>

                            <Button color={"primary"}
                                    sx={{marginTop: '20px'}}
                                    className="black-button"
                                    variant={"contained"}
                                    onClick={() => {

                                        if (wallets.length >= 5) {
                                            dispatch(showSnack({
                                                severity: 'error',
                                                message: 'You cannot have more than 5 wallets. Please delete existing wallet if you want to create a new one.'
                                            }));
                                            return;
                                        }
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

                    {wallets.length > 0 ? <div className={"dev-wallets-list-wrapper"}>
                        <div className={"dev-wallets-list-container"} style={{background: shadedClr}}>
                            {wallets.map((devWallet) => {
                                return <div className="wallet-wrapper" key={devWallet.address}>
                                    <div className="wallet-container">
                                        <div className="wallet-details">
                                            <div className="wallet-address">
                                                {devWallet.address}
                                                <div className="wallet-balance">
                                                    <AccountBalance address={devWallet.address}></AccountBalance>
                                                </div>
                                            </div>
                                            <div style={{marginTop: '15px'}}>
                                                <Button color={"primary"}
                                                        size={"small"}
                                                        variant={"text"}
                                                        startIcon={<OpenInNewIcon></OpenInNewIcon>}
                                                        onClick={() => {
                                                            window.open('/explorer/account/' + devWallet.address, '_blank');
                                                        }}
                                                >View in explorer</Button>
                                                <Button color={"primary"}
                                                        size={"small"}
                                                        sx={{marginLeft: '15px'}}
                                                        startIcon={<ContentCopyIcon></ContentCopyIcon>}
                                                        variant={"text"}
                                                        onClick={(event) => {
                                                            copyContent(event, dispatch, devWallet.address, 'Address copied');
                                                        }}
                                                >Copy</Button>

                                                {isSandbox ? <Button color={"primary"}
                                                                     size={"small"}
                                                                     sx={{marginLeft: '15px'}}
                                                                     variant={"text"}
                                                                     startIcon={<ShowerIcon></ShowerIcon>}
                                                                     onClick={async (event) => {
                                                                         try {
                                                                             const params: KMDConnectionParams = getKMDConfig();

                                                                             dispatch(showLoader("Checking KMD configuration"));
                                                                             const dispenserAccount = await new KmdClient(params).getDispenserAccount();
                                                                             dispatch(hideLoader());

                                                                             dispatch(showLoader("Loading suggested params"));
                                                                             const client = dappflow.network.getClient();
                                                                             const suggestedParams: SuggestedParams = await client.getTransactionParams().do();
                                                                             dispatch(hideLoader());

                                                                             dispatch(showLoader(""));
                                                                             const amountInMicros = algosdk.algosToMicroalgos(Number(10));
                                                                             const enc = new TextEncoder();
                                                                             const note = enc.encode("Dispencing algos from dappflow dispenser");

                                                                             const unsignedTxn = algosdk.makePaymentTxnWithSuggestedParams(dispenserAccount.addr, devWallet.address, amountInMicros, undefined, note, suggestedParams, undefined);
                                                                             const signedTxn = unsignedTxn.signTxn(dispenserAccount.sk);

                                                                             dispatch(hideLoader());

                                                                             dispatch(showLoader("Submitting transaction"));
                                                                             const {txId} = await client.sendRawTransaction(signedTxn).do();
                                                                             dispatch(hideLoader());

                                                                             dispatch(showLoader("Waiting for confirmation"));
                                                                             await waitForConfirmation(client, txId, 10);
                                                                             dispatch(hideLoader());

                                                                             dispatch(showSnack({
                                                                                 severity: 'success',
                                                                                 message: 'Algos dispensed successfully'
                                                                             }));
                                                                             dispatch(resetDevWallets());
                                                                             dispatch(loadDevWallets());
                                                                         }
                                                                         catch (e: any) {
                                                                             dispatch(hideLoader());
                                                                             handleException(e);
                                                                         }
                                                                     }}
                                                >Dispense</Button> : ''}

                                            </div>
                                        </div>
                                        <div className="wallet-actions">
                                            <Button color={"warning"}
                                                    size={"small"}
                                                    variant={"outlined"}
                                                    startIcon={<DeleteIcon></DeleteIcon>}
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
                    </div> : ''}

                </div>}

            </div>
        </div>
    </div>);
}

export default DevWallets;
