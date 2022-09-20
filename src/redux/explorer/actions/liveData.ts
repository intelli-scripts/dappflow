import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import explorer from "../../../utils/dappflow";
import {BlockClient} from "../../../packages/core-sdk/clients/blockClient";
import {A_Block, A_SearchTransaction} from "../../../packages/core-sdk/types";
import {NodeClient} from "../../../packages/core-sdk/clients/nodeClient";


export interface LiveData {
    loading: number,
    currentBlock: number,
    blocks: A_Block[],
    transactions: A_SearchTransaction[],
    connection: {
        success: boolean
    }
}

const initialState: LiveData = {
    loading: 0,
    currentBlock: 0,
    blocks: [],
    transactions: [],
    connection: {
        success: true
    }
}

export const initLivedata = createAsyncThunk(
    'liveData/initLivedata',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const nodeClientInstance = new NodeClient(explorer.network);
            const health = await nodeClientInstance.health();

            const round = health.round;

            dispatch(setCurrentBlock(round));
            dispatch(loadBlockInfo(round));
            dispatch(setConnectionSuccess(true));
        }
        catch (e: any) {
            dispatch(setConnectionSuccess(false));
        }
    }
);

export const loadBlockInfo = createAsyncThunk(
    'liveData/loadBlock',
    async (round: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const blockClient = new BlockClient(explorer.network);
            await blockClient.statusAfterBlock(round);
            const blockInfo = await blockClient.get(round);
            dispatch(loadBlockInfo(round + 1));
            return blockInfo;
        }
        catch (e: any) {

        }
    }
);

export const liveDataSlice = createSlice({
    name: 'liveData',
    initialState,
    reducers: {
        resetLiveData: state => initialState,
        setCurrentBlock: (state, action: PayloadAction<number> ) => {
            state.currentBlock = action.payload;
        },
        setConnectionSuccess: (state, action: PayloadAction<boolean> ) => {
            state.connection.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadBlockInfo.fulfilled, (state, action: PayloadAction<A_Block>) => {
            state.blocks.push(action.payload);

            let {blocks, transactions} = state;
            blocks = blocks.sort((a, b) => b.round - a.round);

            state.blocks = blocks.slice(0, 10);
            state.transactions = [...action.payload.transactions, ...transactions].slice(0, 50);

        });
    },
});

export const {resetLiveData, setCurrentBlock, setConnectionSuccess} = liveDataSlice.actions
export default liveDataSlice.reducer