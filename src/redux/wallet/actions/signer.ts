import { createSlice } from '@reduxjs/toolkit'


export interface Signer {
    name: string
}

const initialState: Signer = {
    name: ''
}

export const signerSlice = createSlice({
    name: 'signer',
    initialState,
    reducers: {
        setSigner: (state, action ) => {
            state.name = action.payload;
        }
    },
});

export const { setSigner } = signerSlice.actions
export default signerSlice.reducer