import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import explorer from "../../utils/explorer";
import {BlockClient} from "../../packages/core-sdk/clients/blockClient";
import {A_Block, A_SearchTransaction} from "../../packages/core-sdk/types";


export interface LiveData {
    loading: number,
    currentBlock: number,
    blocks: A_Block[],
    transactions: A_SearchTransaction[]
}

const initialState: LiveData = {
    loading: 0,
    currentBlock: 0,
    blocks: [],
    transactions: []
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
            // for (let i = round - 4; i <=round; i++) {
            //     dispatch(loadBlockInfo(i));
            // }

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
    },
    extraReducers: (builder) => {
        builder.addCase(loadBlockInfo.fulfilled, (state, action: PayloadAction<A_Block>) => {
            state.blocks.push(action.payload);

            let {blocks, transactions} = state;
            blocks = blocks.sort((a, b) => b.round - a.round);

            state.blocks = blocks;
            state.transactions = [...action.payload.transactions, ...transactions];

        });
    },
});

export const {resetLiveData, setCurrentBlock} = liveDataSlice.actions
export default liveDataSlice.reducer