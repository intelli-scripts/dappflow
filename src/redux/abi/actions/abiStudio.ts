import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {hideLoader, showLoader} from "../../common/actions/loader";
import {handleException} from "../../common/actions/exception";
import {ABIContractParams} from "algosdk";


interface AbiStudio {
    abi: ABIContractParams,
    appId: string
}

const initialState: AbiStudio = {
    abi: {
        name: '',
        methods: []
    },
    appId: ''
}

export const loadAbi = createAsyncThunk(
    'abiStudio/loadAbi',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(showLoader("Loading ABI ..."));

            const storedAbi = localStorage.getItem('abi');
            if (storedAbi) {
                dispatch(setAbi(JSON.parse(storedAbi)));
            }


            dispatch(loadAppId());
            dispatch(hideLoader());
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);


export const loadAppId = createAsyncThunk(
    'abiStudio/loadAppId',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        const appId = localStorage.getItem('abi_app_id');
        if (appId) {
            dispatch(setAppId(appId));
        }
    }
);

export const updateAbi = createAsyncThunk(
    'abiStudio/updateAbi',
    async (abi: ABIContractParams, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            if (abi) {
                dispatch(showLoader("Updating ABI ..."));

                localStorage.setItem('abi', JSON.stringify(abi));
                dispatch(setAbi(abi));

                dispatch(updateAppId(''));
                dispatch(hideLoader());
            }
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);

export const deleteAbi = createAsyncThunk(
    'abiStudio/deleteAbi',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(showLoader("Deleting ABI ..."));

            localStorage.removeItem('abi');
            dispatch(setAbi(initialState.abi));

            dispatch(updateAppId(''));
            dispatch(hideLoader());
        }
        catch (e: any) {
            dispatch(handleException(e));
            dispatch(hideLoader());
        }
    }
);

export const updateAppId = createAsyncThunk(
    'abiStudio/updateAppId',
    async (id: string, thunkAPI) => {
        const {dispatch} = thunkAPI;
        id = id || '';
        localStorage.setItem('abi_app_id', id);
        dispatch(setAppId(id));
    }
);



export const abiStudioSlice = createSlice({
    name: 'abiStudio',
    initialState,
    reducers: {
        setAppId: (state, action: PayloadAction<string> ) => {
            state.appId = action.payload;
        },
        setAbi: (state, action: PayloadAction<ABIContractParams> ) => {
            state.abi = action.payload;
        }
    }
});

export const {setAppId, setAbi} = abiStudioSlice.actions
export default abiStudioSlice.reducer