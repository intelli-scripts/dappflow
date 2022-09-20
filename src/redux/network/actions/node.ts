import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {A_Genesis, A_Health, A_Status, A_VersionsCheck} from "../../../packages/core-sdk/types";
import explorer from "../../../utils/dappflow";
import {handleException} from "../../common/actions/exception";
import {NodeClient} from "../../../packages/core-sdk/clients/nodeClient";

export interface Node {
    loading: boolean,
    status: A_Status,
    health: A_Health,
    versionsCheck: A_VersionsCheck,
    genesis: A_Genesis
}

const initialState: Node = {
    loading: false,
    versionsCheck: {
        genesis_id: "",
        genesis_hash_b64: "",
        build: {
            build_number: 0,
            major: 0,
            branch: '',
            minor: 0,
            commit_hash: '',
            channel: ''
        }
    },
    status: {
        "catchpoint": "",
        "catchpoint-acquired-blocks": 0,
        "catchpoint-processed-accounts": 0,
        "catchpoint-total-accounts": 0,
        "catchpoint-total-blocks": 0,
        "catchpoint-verified-accounts": 0,
        "catchup-time": 0,
        "last-catchpoint": "",
        "last-round": 0,
        "last-version": "",
        "next-version": "",
        "next-version-round": 0,
        "next-version-supported": false,
        "stopped-at-unsupported-round": false,
        "time-since-last-round": 0
    },
    health: {
        "db-available": false,
        errors: [],
        "is-migrating": false,
        message: "",
        round: 0,
        version: "string"
    },
    genesis: {
        fees: "",
        proto: "",
        rwd: "",
        timestamp: 0
    }
}

export const loadNodeDetails = createAsyncThunk(
    'node/loadNodeVersions',
    async (_, thunkAPI) => {
        const {dispatch} = thunkAPI;
        try {
            dispatch(setLoading(true));
            const nodeClient = new NodeClient(explorer.network);

            const statusAwait = nodeClient.status();
            const versionsCheckAwait = nodeClient.versionsCheck();
            const genesisAwait = nodeClient.genesis();
            const healthAwait = nodeClient.health();

            const [status, versionsCheck, genesis, health] = await Promise.all([statusAwait, versionsCheckAwait, genesisAwait, healthAwait]);

            dispatch(setStatus(status));
            dispatch(setVersions(versionsCheck));
            dispatch(setGenesis(genesis));
            dispatch(setHealth(health));

            dispatch(setLoading(false));
        }
        catch (e: any) {
            dispatch(setLoading(false));
            dispatch(handleException(e));
        }
    }
);


export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setStatus: (state, action: PayloadAction<A_Status> ) => {
            state.status = action.payload;
        },
        setHealth: (state, action: PayloadAction<A_Health> ) => {
            state.health = action.payload;
        },
        setVersions: (state, action: PayloadAction<A_VersionsCheck> ) => {
            state.versionsCheck = action.payload;
        },
        setGenesis: (state, action: PayloadAction<A_Genesis> ) => {
            state.genesis = action.payload;
        },
    },
    extraReducers: (builder) => {

    },
});

export const {setLoading, setVersions, setStatus, setGenesis, setHealth} = nodeSlice.actions
export default nodeSlice.reducer