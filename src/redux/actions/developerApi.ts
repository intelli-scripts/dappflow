import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorerSdk from "../../utils/explorerSdk";
import indexerApi from '../../packages/core-sdk/swagger/indexerApi.json';


interface DeveloperApi {
    indexerSpec: any,
    loading: boolean
}

const initialState: DeveloperApi = {
    indexerSpec: null,
    loading: false
}

export const loadIndexerSpec = createAsyncThunk(
    'developerApi/loadIndexerSpec',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const indexerUrl = explorerSdk.explorer.network.getIndexerUrl();
            dispatch(setLoading(false));

            return {
                ...indexerApi,
                servers: [{
                    url: indexerUrl
                }]
            };
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const developerApiSlice = createSlice({
    name: 'developerApi',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadIndexerSpec.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.indexerSpec = action.payload;
            }
        })
    },
});

export const { setLoading } = developerApiSlice.actions
export default developerApiSlice.reducer