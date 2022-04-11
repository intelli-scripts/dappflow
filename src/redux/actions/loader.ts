import { createSlice } from '@reduxjs/toolkit'


export interface Loader {
    count: number,
    message: string
}

const initialState: Loader = {
    count: 0,
    message: ''
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader: (state, action ) => {
            state.count = state.count + 1;
            state.message = action.payload;
        },
        hideLoader: (state) => {
            state.count = state.count - 1;
        }
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions
export default loaderSlice.reducer