import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './common/actions/snackbar';
import loaderReducer from "./common/actions/loader";
import app from "./app/actions/app";
import connectWallet from "./wallet/actions/connectWallet";
import wallet from "./wallet/actions/wallet";
import signer from "./wallet/actions/signer";

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        loader: loaderReducer,
        app: app,
        connectWallet: connectWallet,
        wallet: wallet,
        signer: signer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch