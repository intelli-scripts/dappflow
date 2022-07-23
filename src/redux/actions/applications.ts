import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "./exception";
import explorer from "../../utils/dappflow";
import {A_Application} from "../../packages/core-sdk/types";
import {A_ApplicationsResponse, ApplicationClient} from "../../packages/core-sdk/clients/applicationClient";


interface Applications {
    list: A_Application[],
    loading: boolean,
    completed: boolean,
    "next-token": string
}

const initialState: Applications = {
    list: [],
    loading: false,
    completed: false,
    "next-token": ''
}

export const loadApplications = createAsyncThunk(
    'applications/loadApplications',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        try {
            // @ts-ignore
            const {applications} = getState();

            if (applications.completed) {
                return;
            }

            const applicationClient = new ApplicationClient(explorer.network);
            dispatch(setLoading(true));
            const response = await applicationClient.getApplications(applications['next-token']);
            dispatch(setLoading(false));
            return response;
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
        builder.addCase(loadApplications.fulfilled, (state, action: PayloadAction<A_ApplicationsResponse>) => {
            if (action.payload) {
                const nextToken = action.payload["next-token"];

                state["next-token"] = nextToken;
                state.list = [...state.list, ...action.payload.applications];

                if (!nextToken) {
                    state.completed = true;
                }
            }
        })
    },
});

export const { setLoading } = applicationsSlice.actions
export default applicationsSlice.reducer