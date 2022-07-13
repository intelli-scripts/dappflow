import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Asset} from "../../packages/core-sdk/types";
import {A_AssetTransactionsResponse, AssetClient} from "../../packages/core-sdk/clients/assetClient";


export interface Asset {
    loading: boolean,
    error: boolean,
    information: A_Asset,
    transactionsDetails: A_AssetTransactionsResponse & {completed: boolean, loading: boolean}
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
    transactionsDetails: {
        "next-token": "",
        completed: false,
        loading: false,
        transactions: []
    }
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
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {asset} = getState();

            if (asset.transactionsDetails.completed) {
                return;
            }

            dispatch(setTxnsLoading(true));
            const assetClient = new AssetClient(explorer.network);
            const resp = await assetClient.getAssetTransactions(id, asset.transactionsDetails["next-token"]);
            dispatch(setTxnsLoading(false));
            return resp;
        }
        catch (e: any) {
            dispatch(setTxnsLoading(false));
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
        setTxnsLoading: (state, action: PayloadAction<boolean> ) => {
            state.transactionsDetails.loading = action.payload;
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
        builder.addCase(loadAssetTransactions.fulfilled, (state, action: PayloadAction<A_AssetTransactionsResponse>) => {
            if (action.payload) {
                const nextToken = action.payload["next-token"];

                state.transactionsDetails["next-token"] = nextToken;
                state.transactionsDetails.transactions = [...state.transactionsDetails.transactions, ...action.payload.transactions];

                if (!nextToken) {
                    state.transactionsDetails.completed = true;
                }
            }
        });
    },
});

export const {resetAsset, setLoading, setError, setTxnsLoading} = assetSlice.actions
export default assetSlice.reducer