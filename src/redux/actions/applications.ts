import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/explorer";
import {A_Application} from "../../packages/core-sdk/types";
import {ApplicationClient} from "../../packages/core-sdk/clients/applicationClient";


interface Applications {
    list: A_Application[],
    loading: boolean
}

const initialState: Applications = {
    list: [],
    loading: false
}

export const loadApplications = createAsyncThunk(
    'applications/loadApplications',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const applicationClient = new ApplicationClient(explorer.network);
            dispatch(setLoading(true));
            const applications = await applicationClient.getApplications();
            dispatch(setLoading(false));
            return applications;
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadApplications.fulfilled, (state, action: PayloadAction<A_Application[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        })
    },
});

export const { setLoading } = applicationsSlice.actions
export default applicationsSlice.reducer