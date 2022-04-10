import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorerSdk from "../../utils/explorerSdk";
import axios from "axios";


interface Api {
    spec: any,
    loading: boolean
}

const initialState: Api = {
    spec: null,
    loading: false
}

export const loadSpec = createAsyncThunk(
    'api/loadSpec',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const algodUrl = explorerSdk.explorer.network.getAlgodUrl();
            const response = await axios.get(algodUrl + '/swagger.json');
            const spec = response.data;
            spec.host = algodUrl.replace(/(^\w+:|^)\/\//, '');
            dispatch(setLoading(false));
            return spec;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadSpec.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.spec = action.payload;
            }
        })
    },
});

export const { setLoading } = apiSlice.actions
export default apiSlice.reducer