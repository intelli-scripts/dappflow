import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SignerAccount} from "../../../packages/signers/types";
import {SupportedSigner} from "../../../packages/signers";
import {setSigner} from "./signer";
import {loadWallet} from "./wallet";
import sliceSwap from "../../../utils/sliceSwap";


export interface ConnectWallet {
    show: boolean,
    connecting: boolean,
    errMessage: string,
    accounts: SignerAccount[]
}

const initialState: ConnectWallet = {
    show: false,
    connecting: false,
    errMessage: "",
    accounts: []
}

export const connect = createAsyncThunk(
    'connectWallet/connect',
    async (payload: { signer: SupportedSigner, network: string }, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const {signer, network} = payload;

            dispatch(walletConnecting());
            dispatch(clearAccounts());
            dispatch(setSigner(signer.name));
            sliceSwap.setSigner(signer.name);

            // @ts-ignore
            const accounts = await signer.instance.connect(network, (err, payload)=> {
                dispatch(walletConnected());
                dispatch(setErrorMessage(payload.params[0].message));
            });
            if (accounts.length === 1) {
                dispatch(loadWallet(accounts[0].address));
                dispatch(hideConnectWallet());
                localStorage.setItem("signer", signer.name);
                localStorage.setItem("address", accounts[0].address);
            }
            dispatch(walletConnected());
            return accounts;
        }
        catch (e: any) {
            dispatch(walletConnected());
            dispatch(setErrorMessage(e.message));
        }
    }
);

export const connectWalletSlice = createSlice({
    name: 'connectWallet',
    initialState,
    reducers: {
        showConnectWallet: (state ) => {
            state.show = true;
        },
        hideConnectWallet: (state) => {
            state.show = false;
        },
        walletConnecting: (state) => {
            state.connecting = true;
            state.errMessage = "";
        },
        walletConnected: (state) => {
            state.connecting = false;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errMessage = action.payload;
        },
        clearAccounts: (state) => {
            state.accounts = [];
        },
        resetConnectWallet: state => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(connect.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.accounts = action.payload;
            }
        })
    },
});

export const { showConnectWallet, hideConnectWallet, clearAccounts, walletConnecting, walletConnected, setErrorMessage, resetConnectWallet } = connectWalletSlice.actions
export default connectWalletSlice.reducer