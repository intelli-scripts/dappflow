import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {A_VersionsCheck} from "../../../packages/core-sdk/types";
import explorer from "../../../utils/dappflow";
import {handleException} from "../../common/actions/exception";
import {NetworkClient} from "../../../packages/core-sdk/clients/networkClient";

export interface Network {
    versionsCheck: A_VersionsCheck
}

const initialState: Network = {
    versionsCheck: {
        genesis_id: "",
        genesis_hash_b64: ""
    }
}

export const loadNetworkStatus = createAsyncThunk(
    'network/loadNetworkStatus',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const networkClient = new NetworkClient(explorer.network);
            const versionsCheck = await networkClient.versionsCheck();
            console.log(versionsCheck);
            return versionsCheck;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loadNetworkStatus.fulfilled, (state, action: PayloadAction<A_VersionsCheck>) => {
            if (action.payload) {
                state.versionsCheck = action.payload;
            }
        });
    },
});

export default networkSlice.reducer