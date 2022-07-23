import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/dappflow";
import {A_SearchAccount} from "../../packages/core-sdk/types";
import {A_AccountsResponse, AccountClient} from "../../packages/core-sdk/clients/accountClient";


interface Accounts {
    list: A_SearchAccount[],
    loading: boolean,
    completed: boolean,
    "next-token": string
}

const initialState: Accounts = {
    list: [],
    loading: false,
    completed: false,
    "next-token": ''
}

export const loadAccounts = createAsyncThunk(
    'accounts/loadAccounts',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {accounts} = getState();

            if (accounts.completed) {
                return;
            }

            const accountClient = new AccountClient(explorer.network);
            dispatch(setLoading(true));
            const response = await accountClient.getAccounts(accounts['next-token']);
            dispatch(setLoading(false));
            return response;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAccounts.fulfilled, (state, action: PayloadAction<A_AccountsResponse>) => {
            if (action.payload) {
                const nextToken = action.payload["next-token"];

                state["next-token"] = nextToken;
                state.list = [...state.list, ...action.payload.accounts];
                if (!nextToken) {
                    state.completed = true;
                }
            }
        })
    },
});

export const { setLoading } = accountsSlice.actions
export default accountsSlice.reducer