import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Application, A_SearchTransaction} from "../../packages/core-sdk/types";
import {ApplicationClient} from "../../packages/core-sdk/clients/applicationClient";


export interface Application {
    loading: boolean,
    information: A_Application,
    transactions: A_SearchTransaction[]
}

const initialState: Application = {
    loading: false,
    information: {
        id: 0,
        params: {
            "approval-program": "",
            "clear-state-program": "",
            creator: "",
            "global-state": [],
            "global-state-schema": {
                "num-byte-slice": 0,
                "num-uint": 0
            },
            "local-state-schema": {
                "num-byte-slice": 0,
                "num-uint": 0
            }
        }
    },
    transactions: []
}

export const loadApplication = createAsyncThunk(
    'application/loadApplication',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const applicationClient = new ApplicationClient(explorer.network);
            dispatch(resetApplication());
            dispatch(setLoading(true));
            const applicationInfo = await applicationClient.get(id);
            dispatch(loadApplicationTransactions(id));
            dispatch(setLoading(false));
            return applicationInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setLoading(false));
        }
    }
);


export const loadApplicationTransactions = createAsyncThunk(
    'application/loadApplicationTransactions',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const applicationClient = new ApplicationClient(explorer.network);
            const transactions = await applicationClient.getApplicationTransactions(id);
            return transactions;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        resetApplication: state => initialState,
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadApplication.fulfilled, (state, action: PayloadAction<A_Application>) => {
            state.information = action.payload;
        });
        builder.addCase(loadApplicationTransactions.fulfilled, (state, action: PayloadAction<A_SearchTransaction[]>) => {
            state.transactions = action.payload;
        });
    },
});

export const {resetApplication, setLoading} = applicationSlice.actions
export default applicationSlice.reducer