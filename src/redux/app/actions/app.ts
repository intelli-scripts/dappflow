import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const initApp = createAsyncThunk(
    'app/initApp',
    async (_) => {


    }
);


export const appSlice = createSlice({
    name: 'app',
    initialState: {

    },
    reducers: {
        
    },
    
});

export default appSlice.reducer