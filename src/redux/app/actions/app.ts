import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadNodeDetails} from "../../network/actions/node";
import {setSigner} from "../../wallet/actions/signer";
import dappflow from "../../../utils/dappflow";
import {loadWallet} from "../../wallet/actions/wallet";


export const initApp = createAsyncThunk(
    'app/initApp',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(loadNodeDetails());
        const selectedSigner = localStorage.getItem("signer");
        const selectedAddress = localStorage.getItem("address");
        if(selectedSigner && selectedAddress) {
            dispatch(setSigner(selectedSigner));
            dappflow.setSigner(selectedSigner);
            dispatch(loadWallet(selectedAddress));
        }
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