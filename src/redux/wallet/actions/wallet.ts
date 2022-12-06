import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {A_AccountInformation} from "../../../packages/core-sdk/types";
import {hideLoader, showLoader} from "../../common/actions/loader";
import {handleException} from "../../common/actions/exception";
import {AccountClient} from "../../../packages/core-sdk/clients/accountClient";
import dappflow from "../../../utils/dappflow";


interface Wallet {
    account: A_AccountInformation
}

export const defaultAccount: A_AccountInformation = {
    address: "",
    amount: 0,
    "min-balance": 0,
    "amount-without-pending-rewards": 0,
    "apps-local-state": [],
    "apps-total-schema": {
        "num-byte-slice": 0,
        "num-uint": 0
    },
    assets: [],
    "created-apps": [],
    "created-assets": [],
    "pending-rewards": 0,
    "reward-base": 0,
    rewards: 0,
    round: 0,
    status: ""
}

const initialState: Wallet = {
    account: defaultAccount
}

export const loadWallet = createAsyncThunk(
    'wallet/loadWallet',
    async (address: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(showLoader("Loading wallet details ..."));
            const accountInfo = await new AccountClient(dappflow.network).getAccountInformation(address);
            dispatch(hideLoader());
            return accountInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);

export const logOut = createAsyncThunk(
    'wallet/logOut',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dappflow.signer.logout();
        dispatch(resetWallet());
        localStorage.removeItem("signer");
        localStorage.removeItem("address");
    }
);

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        resetWallet: state => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loadWallet.fulfilled, (state, action: PayloadAction<A_AccountInformation>) => {
            state.account = action.payload;
        });
    }
});

export const { resetWallet } = walletSlice.actions
export default walletSlice.reducer