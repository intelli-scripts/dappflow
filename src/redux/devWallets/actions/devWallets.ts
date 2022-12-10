import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {A_Dev_Wallet} from "../../../packages/dev-wallets/types";
import {DevWallet} from "../../../packages/dev-wallets/classes/DevWallet";


interface devWallet {
    loading: boolean,
    wallets: A_Dev_Wallet[]
}

const initialState: devWallet = {
    loading: false,
    wallets: []
}

export const loadDevWallets = createAsyncThunk(
    'devWallets/loadDevWallets',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(setDevWalletsLoading(true));
        const wallets = await new DevWallet().getAll();
        dispatch(setDevWalletsLoading(false));
        return wallets;
    }
);

export const createDevWallet = createAsyncThunk(
    'devWallets/createDevWallet',
    async (wallet: A_Dev_Wallet, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(setDevWalletsLoading(true));
        const savedWallet = await new DevWallet().save(wallet);
        dispatch(setDevWalletsLoading(false));
        dispatch(loadDevWallets());
        return savedWallet;
    }
);

export const deleteDevWallet = createAsyncThunk(
    'devWallets/deleteDevWallet',
    async (address: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        dispatch(setDevWalletsLoading(true));
        await new DevWallet().delete(address);
        dispatch(setDevWalletsLoading(false));
        dispatch(loadDevWallets());
    }
);



export const devWalletsSlice = createSlice({
    name: 'devWallets',
    initialState,
    reducers: {
        setDevWalletsLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadDevWallets.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.wallets = action.payload;
        });
    },
});

export const {setDevWalletsLoading} = devWalletsSlice.actions
export default devWalletsSlice.reducer