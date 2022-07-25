import { createSlice } from '@reduxjs/toolkit';

export interface Settings {
    show: boolean
}

const initialState: Settings = {
    show: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        showSettings: (state) => {
            state.show = true;
        },
        hideSettings: (state) => {
            state.show = false;
        }
    },
});

export const { showSettings, hideSettings } = settingsSlice.actions
export default settingsSlice.reducer