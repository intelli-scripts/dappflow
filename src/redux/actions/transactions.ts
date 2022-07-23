import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/dappflow";
import {A_SearchTransaction} from "../../packages/core-sdk/types";
import {A_TransactionsResponse, TransactionClient} from "../../packages/core-sdk/clients/transactionClient";


interface Transactions {
    list: A_SearchTransaction[],
    loading: boolean,
    completed: boolean,
    "next-token": string
}

const initialState: Transactions = {
    list: [],
    loading: false,
    completed: false,
    "next-token": ''
}

export const loadTransactions = createAsyncThunk(
    'transactions/loadTransactions',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {transactions} = getState();

            if (transactions.completed) {
                return;
            }

            const transactionClient = new TransactionClient(explorer.network);
            dispatch(setLoading(true));
            const response = await transactionClient.getTransactions(transactions["next-token"]);
            dispatch(setLoading(false));
            return response;
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
        builder.addCase(loadTransactions.fulfilled, (state, action: PayloadAction<A_TransactionsResponse>) => {
            if (action.payload) {

                const nextToken = action.payload["next-token"];

                state["next-token"] = nextToken;
                state.list = [...state.list, ...action.payload.transactions];

                if (!nextToken) {
                    state.completed = true;
                }
            }
        })
    },
});

export const { setLoading } = transactionsSlice.actions
export default transactionsSlice.reducer