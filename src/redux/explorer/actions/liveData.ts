import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import explorer from "../../../utils/dappflow";
import {BlockClient} from "../../../packages/core-sdk/clients/blockClient";
import {A_Block, A_SearchTransaction} from "../../../packages/core-sdk/types";


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
        const {dispatch, getState} = thunkAPI;
        try {
            const indexer = explorer.network.getIndexer();
            const health = await indexer.makeHealthCheck().do();
            const {round} = health;

            dispatch(setCurrentBlock(round));
            dispatch(loadBlockInfo(round));
            dispatch(setConnectionSuccess(true));

            setInterval(async () => {
                const state = getState();
                // @ts-ignore
                const {liveData} = state;
                const latestBlock = liveData.blocks[0];
                const blockClient = new BlockClient(explorer.network);

                const nextRound = latestBlock.round + 1;
                const blockInfo = await blockClient.get(nextRound);
                if (blockInfo) {
                    dispatch(loadBlockInfo(nextRound));
                }
            }, 2000);
        }
        catch (e: any) {
            dispatch(setConnectionSuccess(false));
        }
    }
);

export const loadBlockInfo = createAsyncThunk(
    'liveData/loadBlock',
    async (id: number) => {
        try {
            const blockClient = new BlockClient(explorer.network);
            const blockInfo = await blockClient.get(id);
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