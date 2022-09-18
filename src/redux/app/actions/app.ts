import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadNodeDetails} from "../../network/actions/node";


export const initApp = createAsyncThunk(
    'app/initApp',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(loadNodeDetails());
    }
);


export const appSlice = createSlice({
    name: 'node',
    initialState: {

    },
    reducers: {
        
    },
    
});

export default appSlice.reducer