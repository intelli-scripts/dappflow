import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {A_Status, A_VersionsCheck} from "../../../packages/core-sdk/types";
import explorer from "../../../utils/dappflow";
import {handleException} from "../../common/actions/exception";
import {NodeClient} from "../../../packages/core-sdk/clients/nodeClient";

export interface Node {
    versionsCheck: A_VersionsCheck,
    status: A_Status,
    loading: boolean
}

const initialState: Node = {
    loading: false,
    versionsCheck: {
        genesis_id: "",
        genesis_hash_b64: ""
    },
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

export const loadNodeDetails = createAsyncThunk(
    'node/loadNodeVersions',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const nodeClient = new NodeClient(explorer.network);
            const versionsCheck = await nodeClient.versionsCheck();
            dispatch(setVersions(versionsCheck));
            const status = await nodeClient.status();
            dispatch(setStatus(status));
            dispatch(setLoading(false));
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);


export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setVersions: (state, action: PayloadAction<A_VersionsCheck> ) => {
            state.versionsCheck = action.payload;
        },
        setStatus: (state, action: PayloadAction<A_Status> ) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {

    },
});

export const {setLoading, setVersions, setStatus} = nodeSlice.actions
export default nodeSlice.reducer