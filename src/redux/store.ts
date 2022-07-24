import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './common/actions/snackbar';
import accountsReducer from "./explorer/actions/accounts";
import transactionsReducer from "./explorer/actions/transactions";
import assetsReducer from "./explorer/actions/assets";
import applicationsReducer from "./explorer/actions/applications";
import settingsReducer from "./settings/actions/settings";
import developerApiReducer from "./developerApi/actions/developerApi";
import loaderReducer from "./common/actions/loader";
import accountReducer from "./explorer/actions/account";
import blockReducer from "./explorer/actions/block";
import assetReducer from "./explorer/actions/asset";
import applicationReducer from "./explorer/actions/application";
import transactionReducer from "./explorer/actions/transaction";
import groupReducer from "./explorer/actions/group";
import liveData from "./explorer/actions/liveData";
import arcs from "./arcPortal/actions/arcs";
import arc from "./arcPortal/actions/arc";

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        accounts: accountsReducer,
        transactions: transactionsReducer,
        assets: assetsReducer,
        applications: applicationsReducer,
        settings: settingsReducer,
        developerApi: developerApiReducer,
        loader: loaderReducer,
        account: accountReducer,
        block: blockReducer,
        asset: assetReducer,
        application: applicationReducer,
        transaction: transactionReducer,
        group: groupReducer,
        liveData: liveData,
        arcs: arcs,
        arc: arc
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch