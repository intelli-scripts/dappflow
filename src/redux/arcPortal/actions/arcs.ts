import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {handleException} from "../../common/actions/exception";
import {A_Arc} from "../../../packages/arc-portal/types";
import {getArcs} from "../../../packages/arc-portal/utils";



interface Arcs {
    list: A_Arc[]
}

const initialState: Arcs = {
    list: []
}

export const loadArcs = createAsyncThunk(
    'arcs/loadArcs',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            return getArcs();
        }
        catch (e: any) {
            dispatch(handleException(e));
        }
    }
);

export const arcsSlice = createSlice({
    name: 'arcs',
    initialState,
    reducers: {
        resetArcs: state => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(loadArcs.fulfilled, (state, action: PayloadAction<A_Arc[]>) => {
            if (action.payload) {
                state.list = action.payload;
            }
        });
    },
});

export const { resetArcs } = arcsSlice.actions
export default arcsSlice.reducer