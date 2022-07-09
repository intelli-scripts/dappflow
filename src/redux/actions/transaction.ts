import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Asset, A_SearchTransaction} from "../../packages/core-sdk/types";
import {TransactionClient} from "../../packages/core-sdk/clients/transactionClient";
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import {TXN_TYPES} from "../../packages/core-sdk/constants";
import {AssetClient} from "../../packages/core-sdk/clients/assetClient";


export interface Transaction {
    information: A_SearchTransaction,
    loading: boolean,
    error: boolean,
    asset: {
        information: A_Asset
    }
}

const initialState: Transaction = {
    loading: false,
    error: false,
    information: {
        "close-rewards": 0,
        "closing-amount": 0,
        "confirmed-round": 0,
        fee: 0,
        "first-valid": 0,
        "intra-round-offset": 0,
        "last-valid": 0,
        "receiver-rewards": 0,
        "round-time": 0,
        sender: "",
        "sender-rewards": 0,
        "tx-type": "",
        note: "",
        "genesis-hash": "",
        "genesis-id": "",
        id: "",
        "inner-txns": [],
        "created-application-index": 0,
        "global-state-delta": [],
        signature: {

        }
    },
    asset: {
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
    }
}

export const loadTransaction = createAsyncThunk(
    'transaction/loadTransaction',
    async (id: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const transactionClient = new TransactionClient(explorer.network);
            dispatch(resetTransaction());
            dispatch(setLoading(true));
            const transactionInfo = await transactionClient.get(id);
            const txnInstance = new CoreTransaction(transactionInfo);

            if (txnInstance.getType() === TXN_TYPES.ASSET_TRANSFER) {
                dispatch(loadTxnAsset(txnInstance.getAssetId()));
            }

            dispatch(setLoading(false));
            return transactionInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setError(true));
            dispatch(setLoading(false));
        }
    }
);


export const loadTxnAsset = createAsyncThunk(
    'transaction/loadTxnAsset',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const assetClient = new AssetClient(explorer.network);
            const assetInfo = await assetClient.get(id);
            return assetInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        resetTransaction: (state ) => {
            state = {
                ...initialState
            };
        },
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean> ) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadTransaction.fulfilled, (state, action: PayloadAction<A_SearchTransaction>) => {
            if (action.payload) {
                state.information = action.payload;
            }
        });
        builder.addCase(loadTxnAsset.fulfilled, (state, action: PayloadAction<A_Asset>) => {
            if (action.payload) {
                state.asset.information = action.payload;
            }
        });
    },
});

export const {resetTransaction, setLoading, setError} = transactionSlice.actions
export default transactionSlice.reducer