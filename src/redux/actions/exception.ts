import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showSnack} from './snackbar';

export const handleException = createAsyncThunk(
    'exception/handleException',
    async (e: Error, thunkAPI) => {
        console.log(e);
        thunkAPI.dispatch(showSnack({
            severity: 'error',
            message: e.message
        }));
    }
);

export const exceptionSlice = createSlice({
    name: 'exception',
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(handleException.fulfilled, () => {})
    },
});

export default exceptionSlice.reducer