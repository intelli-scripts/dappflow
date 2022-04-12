import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_SearchAccount} from "../../packages/core-sdk/types";
import {AccountClient} from "../../packages/core-sdk/clients/accountClient";


interface Accounts {
    list: A_SearchAccount[],
    loading: boolean
}

const initialState: Accounts = {
    list: [],
    loading: false
}

export const loadAccounts = createAsyncThunk(
    'accounts/loadAccounts',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const accountClient = new AccountClient(explorer.network);
            dispatch(setLoading(true));
            const accounts = await accountClient.getAccounts();
            dispatch(setLoading(false));
            return accounts;
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
        builder.addCase(loadAccounts.fulfilled, (state, action: PayloadAction<A_SearchAccount[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        })
    },
});

export const { setLoading } = accountsSlice.actions
export default accountsSlice.reducer