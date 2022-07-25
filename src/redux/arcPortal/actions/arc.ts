import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "../../common/actions/exception";
import {ArcClient} from "../../../packages/arc-portal/clients/arcClient";
import {A_Arc} from "../../../packages/arc-portal/types";
import {getArc} from "../../../packages/arc-portal/utils";
import {Octokit} from 'octokit';


export interface ArcState {
    information: A_Arc,
    error: boolean,
    loading: boolean
}

const initialState: ArcState = {
    loading: false,
    error: false,
    information: {
        id: 0,
        name: "",
        markdownUrl: "",
        markdown: '',
        github: ''
    }
}

export const loadArc = createAsyncThunk(
    'arc/loadArc',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(resetArc());
            const arc = getArc(id);
            dispatch(loadMarkdown(id));
            return arc;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setError(true));
        }
    }
);

export const loadMarkdown = createAsyncThunk(
    'arc/loadMarkdown',
    async (id: number, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            const arcClient = new ArcClient();
            dispatch(setLoading(true));
            const markdown = await arcClient.loadMarkdown(id);
            const resp = await new Octokit().request('POST /markdown', {
                text: markdown,
                mode: "gfm"
            });
            dispatch(setLoading(false));
            return resp.data;
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(setError(true));
            dispatch(setLoading(false));
        }
    }
);


export const arcSlice = createSlice({
    name: 'arc',
    initialState,
    reducers: {
        resetArc: state => initialState,
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean> ) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadArc.fulfilled, (state, action: PayloadAction<A_Arc>) => {
            if (action.payload) {
                state.information = action.payload;
            }
        });
        builder.addCase(loadMarkdown.fulfilled, (state, action: PayloadAction<string>) => {
            if (action.payload) {
                state.information.markdown = action.payload;
            }
        });
    },
});

export const {resetArc, setLoading, setError} = arcSlice.actions
export default arcSlice.reducer