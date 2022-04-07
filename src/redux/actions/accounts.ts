import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DAPPFLOW_EXPLORER_ACCOUNT} from "../../packages/explorer-sdk/types";
import {handleException} from "./exception";
import explorerSdk from "../../utils/explorerSdk";


interface Accounts {
    list: DAPPFLOW_EXPLORER_ACCOUNT[],
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
            dispatch(setLoading(true));
            const accounts = await explorerSdk.explorer.accountsClient.get();
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
        builder.addCase(loadAccounts.fulfilled, (state, action: PayloadAction<DAPPFLOW_EXPLORER_ACCOUNT[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        })
    },
});

export const { setLoading } = accountsSlice.actions
export default accountsSlice.reducer