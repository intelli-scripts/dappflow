import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Asset, A_SearchTransaction} from "../../packages/core-sdk/types";
import {AssetClient} from "../../packages/core-sdk/clients/assetClient";


export interface Asset {
    loading: boolean,
    error: boolean,
    information: A_Asset,
    transactions: A_SearchTransaction[]
}

const initialState: Asset = {
    loading: false,
    error: false,
    information: {
        index: 0,
        params: {
            clawback: "",
            creator: "",
            decimals: 0,
            "default-frozen": false,
            freeze: "",
            manager: "",
            name: "",
            "name-b64": "",
            reserve: "",
            total: 0,
            "unit-name": "",
            "unit-name-b64": "",
            url: "",
            "url-b64": "",
            "metadata-hash": "",
        }
    },
    transactions: []
}

export const loadAsset = createAsyncThunk(
    'asset/loadAsset',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const assetClient = new AssetClient(explorer.network);
            dispatch(resetAsset());
            dispatch(setLoading(true));
            const assetInfo = await assetClient.get(id);
            dispatch(loadAssetTransactions(id));
            dispatch(setLoading(false));
            return assetInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setError(true));
            dispatch(setLoading(false));
        }
    }
);


export const loadAssetTransactions = createAsyncThunk(
    'asset/loadAssetTransactions',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const assetClient = new AssetClient(explorer.network);
            const transactions = await assetClient.getAssetTransactions(id);
            return transactions;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        resetAsset: state => initialState,
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean> ) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAsset.fulfilled, (state, action: PayloadAction<A_Asset>) => {
            if (action.payload) {
                state.information = action.payload;
            }
        });
        builder.addCase(loadAssetTransactions.fulfilled, (state, action: PayloadAction<A_SearchTransaction[]>) => {
            if (action.payload) {
                state.transactions = action.payload;
            }
        });
    },
});

export const {resetAsset, setLoading, setError} = assetSlice.actions
export default assetSlice.reducer