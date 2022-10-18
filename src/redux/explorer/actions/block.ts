import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "../../common/actions/exception";
import explorer from "../../../utils/dappflow";
import {BlockClient} from "../../../packages/core-sdk/clients/blockClient";
import {A_Block} from "../../../packages/core-sdk/types";


export interface Block {
    information: A_Block,
    error: boolean,
    loading: boolean,
    hash: string
}

const initialState: Block = {
    loading: false,
    error: false,
    information: {
        "txn-counter": 0,
        round: 0,
        transactions: [],
        timestamp: 0
    },
    hash: ''
}

export const loadBlock = createAsyncThunk(
    'block/loadBlock',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const blockClient = new BlockClient(explorer.network);
            dispatch(resetBlock());
            dispatch(setLoading(true));
            const blockInfo = await blockClient.get(id);
            dispatch(setLoading(false));
            dispatch(loadBlockHash(id));
            return blockInfo;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setError(true));
            dispatch(setLoading(false));
        }
    }
);

export const loadBlockHash = createAsyncThunk(
    'block/loadBlockHash',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const blockClient = new BlockClient(explorer.network);
            const {blockHash} = await blockClient.getBlockHash(id);
            return blockHash;
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);


export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        resetBlock: state => initialState,
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean> ) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadBlock.fulfilled, (state, action: PayloadAction<A_Block>) => {
            if (action.payload) {
                state.information = action.payload;
            }
        });
        builder.addCase(loadBlockHash.fulfilled, (state, action: PayloadAction<string>) => {
            if (action.payload) {
                state.hash = action.payload;
            }
        });
    },
});

export const {resetBlock, setLoading, setError} = blockSlice.actions
export default blockSlice.reducer