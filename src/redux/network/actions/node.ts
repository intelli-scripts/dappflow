import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {A_VersionsCheck} from "../../../packages/core-sdk/types";
import explorer from "../../../utils/dappflow";
import {handleException} from "../../common/actions/exception";
import {NodeClient} from "../../../packages/core-sdk/clients/nodeClient";

export interface Node {
    loadingVersions: boolean,
    versionsCheck: A_VersionsCheck
}

const initialState: Node = {
    loadingVersions: false,
    versionsCheck: {
        genesis_id: "",
        genesis_hash_b64: ""
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

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        setVersionsLoading: (state, action: PayloadAction<boolean> ) => {
            state.loadingVersions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadNodeVersions.fulfilled, (state, action: PayloadAction<A_VersionsCheck>) => {
            if (action.payload) {
                state.versionsCheck = action.payload;
            }
        });
    },
});

export const {setVersionsLoading} = nodeSlice.actions
export default nodeSlice.reducer