import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {KMDConnectionParams} from "../../../packages/core-sdk/types";
import {handleException} from "../../common/actions/exception";
import {KmdClient} from "../../../packages/core-sdk/clients/kmdClient";
import {getKMDConfig} from "../../../utils/nodeConfig";

export interface Kmd {
    loading: boolean,
    mnemonics: string[]
}

const initialState: Kmd = {
    loading: false,
    mnemonics: []
}

export const loadKmdAccounts = createAsyncThunk(
    'kmd/loadKmdAccounts',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const params: KMDConnectionParams = getKMDConfig();
            const kmdClient = new KmdClient(params);
            const accounts = await kmdClient.loadKmdAccounts();
            dispatch(setLoading(false));

            return accounts;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);


export const kmdSlice = createSlice({
    name: 'kmd',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadKmdAccounts.fulfilled, (state, action: PayloadAction<string[]>) => {
            let mnemonics = action.payload;

            if (mnemonics) {
                mnemonics = mnemonics.filter((item, index) => mnemonics.indexOf(item) === index);//remove duplicates
                state.mnemonics = mnemonics;
            }
        });
    },
});

export const {setLoading} = kmdSlice.actions
export default kmdSlice.reducer