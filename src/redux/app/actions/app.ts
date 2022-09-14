import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadNodeStatus, loadNodeVersions} from "../../network/actions/node";


export const initApp = createAsyncThunk(
    'app/initApp',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(loadNodeVersions());
        dispatch(loadNodeStatus());
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