import './ConnectWallet.scss';
import {
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Typography, Button
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getSupportedSigners, SupportedSigner} from '../../../packages/signers';
import {RootState} from "../../../redux/store";
import {connect, hideConnectWallet} from "../../../redux/wallet/actions/connectWallet";
import {loadWallet} from "../../../redux/wallet/actions/wallet";
import {ArrowBack, ErrorOutlineOutlined} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PowerIcon from '@mui/icons-material/Power';
import {NETWORKS} from "../../../packages/core-sdk/constants";
import sliceSwap from "../../../utils/sliceSwap";


interface ConnectWalletState{
    view: string,
    selectedSigner: SupportedSigner
}

const signers = getSupportedSigners();

const initialState: ConnectWalletState = {
    view: "home",
    selectedSigner: signers[0]
};

function ConnectWallet(): JSX.Element {

    const dispatch = useDispatch();
    const network = sliceSwap.network.id;

    const connectWallet = useSelector((state: RootState) => state.connectWallet);
    const {accounts} = connectWallet;

    const [
        { view, selectedSigner },
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    useEffect(() => {
        if (accounts.length === 1) {
            clearState();
        }
    }, [accounts]);

    function handleClose() {
        dispatch(hideConnectWallet());
        clearState();
    }

    return (<div>
        {connectWallet.show ? <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            onClose={handleClose}
            sx={{'.MuiPaper-root': {width: '350px'}}}
            open={connectWallet.show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {view === 'accounts' ? <ArrowBack sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => {
                            setState(prevState => ({ ...prevState, view: 'home' }));
                        }}/> : ''}

                    </div>
                    <CloseIcon className="modal-close-button" onClick={handleClose}/>
                </div>
            </DialogTitle>
            <DialogContent style={{padding: 0}}>
                <div className="connect-wallet-wrapper">
                    <div className="connect-wallet-container">
                        {view === 'home' ? <div className="wallet-connect-home-wrapper">
                            <div className="wallet-connect-home-container">
                                <div className="header">

                                    <div className="text">
                                        <PowerIcon></PowerIcon>
                                        Connect wallet
                                    </div>
                                </div>
                                <div className="body">
                                    {signers.map((signer) => {
                                        return (<div className="signer"
                                                     key={signer.name}
                                                     onClick={() => {
                                                         dispatch(connect({signer, network: network}));
                                                         setState(prevState => ({ ...prevState, view: 'accounts', selectedSigner: signer }));
                                                     }}
                                        >
                                            {signer.logo ? <img className="logo" src={signer.logo} alt="logo"/> : ''}
                                            <span className='name'>{signer.label}</span>
                                            <ArrowForwardIcon></ArrowForwardIcon>
                                        </div>);
                                    })}
                                </div>
                                <div className="footer">
                                    <Typography variant="subtitle2" display="block" gutterBottom color="textSecondary">
                                        By connecting, You accept SliceSwap Terms of Service
                                    </Typography>
                                </div>
                            </div>
                        </div> : ''}

                        {view === 'accounts' ? <div className="accounts-wrapper">
                            <div className="accounts-container">
                                <div className="header">
                                    <span className="logo">
                                        {selectedSigner.logo ? <img style={{width: 30, height: 30}} src={selectedSigner.logo} alt="logo"/> : ''}
                                    </span>
                                    <span className="name">
                                        {selectedSigner.label}
                                    </span>
                                </div>
                                <div className="body">
                                    {connectWallet.connecting ? <div className="connecting">
                                        <div>connecting ...</div>
                                    </div> : ''}
                                    {!connectWallet.connecting && connectWallet.errMessage ? <div className="error-message">
                                        <ErrorOutlineOutlined color={"warning"}></ErrorOutlineOutlined>
                                        <div>
                                            {connectWallet.errMessage}
                                        </div>
                                        <Button
                                            color={"primary"}
                                            variant={"outlined"}
                                            style={{marginTop: 70}}
                                            className="black-button"
                                            onClick={() => {

                                                dispatch(connect({signer: selectedSigner, network}));
                                            }}
                                        >Try again</Button>
                                    </div> : ''}
                                    {!connectWallet.connecting && accounts.length === 0 && !connectWallet.errMessage? <div className="error-message">
                                        <div>
                                            No accounts found
                                        </div>
                                    </div> : ''}
                                    {accounts.map((account) => {
                                        return (<div className='account' key={account.address} onClick={async () => {
                                            const address = account.address;
                                            await dispatch(loadWallet(address));
                                            localStorage.setItem("signer", selectedSigner.name);
                                            localStorage.setItem("address", address);
                                            handleClose();
                                        }}>
                                            {account.address}
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog> : ''}
    </div>);
}

export default ConnectWallet;
