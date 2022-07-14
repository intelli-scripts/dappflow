import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Asset} from "../../packages/core-sdk/types";
import {A_AssetsResponse, AssetClient} from "../../packages/core-sdk/clients/assetClient";


interface Assets {
    list: A_Asset[],
    loading: boolean,
    completed: boolean,
    "next-token": string
}

const initialState: Assets = {
    list: [],
    loading: false,
    completed: false,
    "next-token": ''
}

export const loadAssets = createAsyncThunk(
    'assets/loadAssets',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {assets} = getState();

            if (assets.completed) {
                return;
            }

            const assetClient = new AssetClient(explorer.network);
            dispatch(setLoading(true));
            const response = await assetClient.getAssets(assets["next-token"]);
            dispatch(setLoading(false));
            return response;
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
        builder.addCase(loadAssets.fulfilled, (state, action: PayloadAction<A_AssetsResponse>) => {
            if (action.payload) {
                const nextToken = action.payload["next-token"];

                state["next-token"] = nextToken;
                state.list = [...state.list, ...action.payload.assets];

                if (!nextToken) {
                    state.completed = true;
                }
            }
        })
    },
});

export const { setLoading } = assetsSlice.actions
export default assetsSlice.reducer