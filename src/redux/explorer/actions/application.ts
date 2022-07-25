import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "../../common/actions/exception";
import explorer from "../../../utils/dappflow";
import {A_Application} from "../../../packages/core-sdk/types";
import {A_ApplicationTransactionsResponse, ApplicationClient} from "../../../packages/core-sdk/clients/applicationClient";

export interface Application {
    loading: boolean,
    error: boolean,
    information: A_Application,
    transactionsDetails: A_ApplicationTransactionsResponse & {completed: boolean, loading: boolean}
}

const initialState: Application = {
    loading: false,
    error: false,
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
    transactionsDetails: {
        "next-token": "",
        completed: false,
        loading: false,
        transactions: []
    }
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
            dispatch(setError(true));
            dispatch(setLoading(false));
        }
    }
);


export const loadApplicationTransactions = createAsyncThunk(
    'application/loadApplicationTransactions',
    async (id: number, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {application} = getState();

            if (application.transactionsDetails.completed) {
                return;
            }

            dispatch(setTxnsLoading(true));
            const applicationClient = new ApplicationClient(explorer.network);
            const response = await applicationClient.getApplicationTransactions(id, application.transactionsDetails["next-token"]);
            dispatch(setTxnsLoading(false));
            return response;
        }
        catch (e: any) {
            dispatch(setTxnsLoading(false));
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
        setTxnsLoading: (state, action: PayloadAction<boolean> ) => {
            state.transactionsDetails.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean> ) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadApplication.fulfilled, (state, action: PayloadAction<A_Application>) => {
            if (action.payload) {
                state.information = action.payload;
            }
        });
        builder.addCase(loadApplicationTransactions.fulfilled, (state, action: PayloadAction<A_ApplicationTransactionsResponse>) => {
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

export const {resetApplication, setLoading, setError, setTxnsLoading} = applicationSlice.actions
export default applicationSlice.reducer