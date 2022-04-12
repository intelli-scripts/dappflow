import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {A_AccountInformation, A_Asset, A_SearchTransaction} from '../../packages/core-sdk/types';
import {handleException} from "./exception";
import {showLoader, hideLoader} from './loader';
import explorer from "../../utils/explorer";
import {AccountClient} from "../../packages/core-sdk/clients/accountClient";
import {AssetClient} from "../../packages/core-sdk/clients/assetClient";

export interface Account {
    information: A_AccountInformation,
    createdAssets: A_Asset[],
    optedAssets: A_Asset[],
    transactions: A_SearchTransaction[]
}

const information: A_AccountInformation = {
    address: "",
    amount: 0,
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

const initialState: Account = {
    information,
    createdAssets: [],
    optedAssets: [],
    transactions: []
}

export const loadAccount = createAsyncThunk(
    'account/loadAccount',
    async (address: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const accountClient = new AccountClient(explorer.network);
            dispatch(resetAccount());
            dispatch(showLoader("Loading account ..."));
            const accountInfo = await accountClient.getAccountInformation(address);
            dispatch(loadCreatedAssets(accountInfo));
            dispatch(loadOptedAssets(accountInfo));
            dispatch(loadTransactions(accountInfo));
            dispatch(hideLoader());
            return accountInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);

export const loadCreatedAssets = createAsyncThunk(
    'account/loadCreatedAssets',
    async (information: A_AccountInformation, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const accountClient = new AccountClient(explorer.network);
            let createdAssets = accountClient.getCreatedAssets(information);
            createdAssets = createdAssets.sort((a, b) => {
                return b.index - a.index;
            });

            return createdAssets;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const loadOptedAssets = createAsyncThunk(
    'account/loadOptedAssets',
    async (accountInformation: A_AccountInformation, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const accountClient = new AccountClient(explorer.network);
            const optedAssets = accountClient.getHoldingAssets(accountInformation);

            optedAssets.forEach((asset) => {
                const isCreatedAsset = accountClient.isCreatedAsset(asset['asset-id'], accountInformation);
                if (!isCreatedAsset) {
                    dispatch(loadOptedAsset(asset['asset-id']));
                }
            });
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const loadOptedAsset = createAsyncThunk(
    'account/loadOptedAsset',
    async (id: number, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            const assetClient = new AssetClient(explorer.network);

            const asset = await assetClient.get(id);
            const appState: any = getState();
            const {account} = appState;

            return {
                asset,
                accountInformation: account.information
            };
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const loadTransactions = createAsyncThunk(
    'account/loadTransactions',
    async (information: A_AccountInformation, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const accountClient = new AccountClient(explorer.network);
            const transactions = await accountClient.getAccountTransactions(information.address);
            return transactions;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        resetAccount: state => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loadAccount.fulfilled, (state, action: PayloadAction<any>) => {
            state.information = action.payload;
        });
        builder.addCase(loadCreatedAssets.fulfilled, (state, action: PayloadAction<A_Asset[]>) => {
            state.createdAssets = action.payload;
        });
        builder.addCase(loadOptedAsset.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                const {asset, accountInformation} = action.payload;
                if (asset) {
                    const accountClient = new AccountClient(explorer.network);
                    const holdingAsset = accountClient.getHoldingAsset(asset.index, accountInformation);
                    if (holdingAsset) {
                        state.optedAssets.push(asset);
                    }
                }
            }
        });
        builder.addCase(loadTransactions.fulfilled, (state, action: PayloadAction<A_SearchTransaction[]>) => {
            state.transactions = action.payload;
        });
    },
});

export const {resetAccount} = accountSlice.actions
export default accountSlice.reducer