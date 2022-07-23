import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/dappflow";
import {GroupClient} from "../../packages/core-sdk/clients/groupClient";
import {A_Group} from "../../packages/core-sdk/types";


export interface Group {
    information: A_Group,
    loading: boolean
}

const initialState: Group = {
    loading: false,
    information: {
        id: "",
        block: 0,
        transactions: [],
        timestamp: 0
    }
}

export const loadGroup = createAsyncThunk(
    'group/loadGroup',
    async (data: {id: string, blockId: number}, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const groupClient = new GroupClient(explorer.network);
            dispatch(resetGroup());
            dispatch(setLoading(true));
            const groupInfo = await groupClient.get(data.id, data.blockId);
            dispatch(setLoading(false));
            return groupInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setLoading(false));
        }
    }
);


export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        resetGroup: state => initialState,
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadGroup.fulfilled, (state, action: PayloadAction<A_Group>) => {
            state.information = action.payload;
        });
    },
});

export const {resetGroup, setLoading} = groupSlice.actions
export default groupSlice.reducer