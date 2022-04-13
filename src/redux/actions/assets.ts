import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Asset} from "../../packages/core-sdk/types";
import {AssetClient} from "../../packages/core-sdk/clients/assetClient";


interface Assets {
    list: A_Asset[],
    loading: boolean
}

const initialState: Assets = {
    list: [],
    loading: false
}

export const loadAssets = createAsyncThunk(
    'assets/loadAssets',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const assetClient = new AssetClient(explorer.network);
            dispatch(setLoading(true));
            const assets = await assetClient.getAssets();
            dispatch(setLoading(false));
            return assets;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAssets.fulfilled, (state, action: PayloadAction<A_Asset[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        })
    },
});

export const { setLoading } = assetsSlice.actions
export default assetsSlice.reducer