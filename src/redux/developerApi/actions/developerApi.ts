import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "../../common/actions/exception";
import explorer from "../../../utils/dappflow";
import indexerApi from '../../../packages/core-sdk/swagger/indexerApi.json';
import algodApi from '../../../packages/core-sdk/swagger/algodApi.json';


interface DeveloperApi {
    indexerSpec: any,
    algodSpec: any,
    loading: boolean
}

const initialState: DeveloperApi = {
    indexerSpec: null,
    algodSpec: null,
    loading: false
}

export const loadIndexerSpec = createAsyncThunk(
    'developerApi/loadIndexerSpec',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const indexerUrl = explorer.network.getIndexerUrl();
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

export const loadAlgodSpec = createAsyncThunk(
    'developerApi/loadAlgodSpec',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const algodUrl = explorer.network.getAlgodUrl();
            dispatch(setLoading(false));

            // const apiCopy: any = {...algodApi};
            // apiCopy.schemes = null;
            //
            // for (const key in apiCopy.paths) {
            //     apiCopy.paths[key].schemes  = null;
            // }
            //
            // console.log(apiCopy);

            return {
                ...algodApi,
                servers: [{
                    url: algodUrl
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
        });
        builder.addCase(loadAlgodSpec.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.algodSpec = action.payload;
            }
        });
    },
});

export const { setLoading } = developerApiSlice.actions
export default developerApiSlice.reducer