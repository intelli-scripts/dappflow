import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import {showLoader, hideLoader} from './loader';
import explorer from "../../utils/explorer";
import {A_SearchTransaction} from "../../packages/core-sdk/types";
import {TransactionClient} from "../../packages/core-sdk/clients/transactionClient";


export interface Transaction {
    information: A_SearchTransaction
}

const initialState: Transaction = {
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
    }
}

export const loadTransaction = createAsyncThunk(
    'transaction/loadTransaction',
    async (id: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const transactionClient = new TransactionClient(explorer.network);
            dispatch(resetTransaction());
            dispatch(showLoader("Loading transaction ..."));
            const transactionInfo = await transactionClient.get(id);
            dispatch(hideLoader());
            return transactionInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);


export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        resetTransaction: state => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loadTransaction.fulfilled, (state, action: PayloadAction<any>) => {
            state.information = action.payload;
        });
    },
});

export const {resetTransaction} = transactionSlice.actions
export default transactionSlice.reducer