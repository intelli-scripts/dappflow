import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './actions/snackbar';
import accountsReducer from "./actions/accounts";
import transactionsReducer from "./actions/transactions";
import assetsReducer from "./actions/assets";
import settingsReducer from "./actions/settings";
import developerApiReducer from "./actions/developerApi";
import loaderReducer from "./actions/loader";
import accountReducer from "./actions/account";
import blockReducer from "./actions/block";
import assetReducer from "./actions/asset";

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        accounts: accountsReducer,
        transactions: transactionsReducer,
        assets: assetsReducer,
        settings: settingsReducer,
        developerApi: developerApiReducer,
        loader: loaderReducer,
        account: accountReducer,
        block: blockReducer,
        asset: assetReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch