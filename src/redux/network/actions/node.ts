import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {A_Status, A_VersionsCheck} from "../../../packages/core-sdk/types";
import explorer from "../../../utils/dappflow";
import {handleException} from "../../common/actions/exception";
import {NodeClient} from "../../../packages/core-sdk/clients/nodeClient";

export interface Node {
    loadingVersions: boolean,
    versionsCheck: A_VersionsCheck,
    loadingStatus: boolean,
    status: A_Status
}

const initialState: Node = {
    loadingVersions: false,
    versionsCheck: {
        genesis_id: "",
        genesis_hash_b64: ""
    },
    loadingStatus: false,
    status: {
        "catchpoint": "",
        "catchpoint-acquired-blocks": 0,
        "catchpoint-processed-accounts": 0,
        "catchpoint-total-accounts": 0,
        "catchpoint-total-blocks": 0,
        "catchpoint-verified-accounts": 0,
        "catchup-time": 0,
        "last-catchpoint": "",
        "last-round": 0,
        "last-version": "",
        "next-version": "",
        "next-version-round": 0,
        "next-version-supported": false,
        "stopped-at-unsupported-round": false,
        "time-since-last-round": 0
    }
}

export const loadNodeVersions = createAsyncThunk(
    'node/loadNodeVersions',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setVersionsLoading(true));
            const nodeClient = new NodeClient(explorer.network);
            const versionsCheck = await nodeClient.versionsCheck();
            dispatch(setVersionsLoading(false));
            return versionsCheck;
        }
        catch (e: any) {
            dispatch(setVersionsLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const loadNodeStatus = createAsyncThunk(
    'node/loadNodeStatus',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setStatusLoading(true));
            const nodeClient = new NodeClient(explorer.network);
            const status = await nodeClient.status();
            dispatch(setStatusLoading(false));
            return status;
        }
        catch (e: any) {
            dispatch(setStatusLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        setVersionsLoading: (state, action: PayloadAction<boolean> ) => {
            state.loadingVersions = action.payload;
        },
        setStatusLoading: (state, action: PayloadAction<boolean> ) => {
            state.loadingStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadNodeVersions.fulfilled, (state, action: PayloadAction<A_VersionsCheck>) => {
            if (action.payload) {
                state.versionsCheck = action.payload;
            }
        });
        builder.addCase(loadNodeStatus.fulfilled, (state, action: PayloadAction<A_Status>) => {
            if (action.payload) {
                state.status = action.payload;
            }
        });
    },
});

export const {setVersionsLoading, setStatusLoading} = nodeSlice.actions
export default nodeSlice.reducer