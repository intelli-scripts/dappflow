import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import {showLoader, hideLoader} from './loader';
import explorer from "../../utils/explorer";
import {BlockClient} from "../../packages/core-sdk/clients/blockClient";
import {A_Block} from "../../packages/core-sdk/types";


export interface Block {
    information: A_Block,

}

const initialState: Block = {
    information: {
        "txn-counter": 0,
        round: 0,
        transactions: [],
        timestamp: 0
    }
}

export const loadBlock = createAsyncThunk(
    'block/loadBlock',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const blockClient = new BlockClient(explorer.network);
            dispatch(resetBlock());
            dispatch(showLoader("Loading block ..."));
            const blockInfo = await blockClient.get(id);
            dispatch(hideLoader());
            return blockInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);


export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        resetBlock: state => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loadBlock.fulfilled, (state, action: PayloadAction<A_Block>) => {
            state.information = action.payload;
        });
    },
});

export const {resetBlock} = blockSlice.actions
export default blockSlice.reducer