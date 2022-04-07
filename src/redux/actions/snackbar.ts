import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AlertColor} from "@mui/material";

export interface Snackbar {
    show: boolean,
    message: string,
    severity: AlertColor
}

const initialState: Snackbar = {
    show: false,
    message: '',
    severity: 'info'
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnack: (state, action: PayloadAction<any>) => {
            state.show = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideSnack: (state) => {
            state.show = false;
            state.message = '';
        }
    },
});

export const { showSnack, hideSnack } = snackbarSlice.actions
export default snackbarSlice.reducer