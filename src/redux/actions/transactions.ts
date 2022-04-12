import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorerSdk from "../../utils/explorerSdk";
import {A_SearchTransaction} from "../../packages/core-sdk/types";


interface Transactions {
    list: A_SearchTransaction[],
    loading: boolean
}

const initialState: Transactions = {
    list: [],
    loading: false
}

export const loadTransactions = createAsyncThunk(
    'transactions/loadTransactions',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const transactions = await explorerSdk.explorer.transactionsClient.get();
            dispatch(setLoading(false));
            return transactions;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadTransactions.fulfilled, (state, action: PayloadAction<A_SearchTransaction[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        })
    },
});

export const { setLoading } = transactionsSlice.actions
export default transactionsSlice.reducer