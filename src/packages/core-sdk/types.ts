import {ABIMethodArgParams, ABIValue, OnApplicationComplete} from "algosdk";
import {
    AlgodTokenHeader,
    CustomTokenHeader,
    IndexerTokenHeader, KMDTokenHeader
} from "algosdk/dist/types/src/client/urlTokenBaseHTTPClient";

export interface A_AccountInformation {
    address: string
    amount: number
    "min-balance": number
    "amount-without-pending-rewards": number
    "apps-local-state": A_AppsLocalState[]
    "apps-total-schema": A_AppsTotalSchema
    assets: A_AssetHolding[]
    "created-apps": A_Application[]
    "created-assets": A_Asset[]
    "pending-rewards": number
    "reward-base": number
    rewards: number
    round: number
    status: string
}

export interface A_AppsTotalSchema {
    "num-byte-slice": number
    "num-uint": number
}

export interface A_AssetHolding {
    amount: number
    "asset-id": number
    creator: string
    "is-frozen": boolean
}

export interface A_Asset {
    index: number
    params: A_AssetParams
}

export interface A_AssetParams {
    clawback?: string
    creator: string
    decimals: number
    "default-frozen": boolean
    freeze?: string
    manager?: string
    name: string
    "name-b64": string
    reserve?: string
    total: number
    "unit-name": string
    "unit-name-b64": string
    url?: string
    "url-b64"?: string
    "metadata-hash"?: string
}

export interface A_Application {
    id: number
    params: A_ApplicationParams
}

export interface A_ApplicationParams {
    "approval-program": string
    "clear-state-program": string
    creator: string
    "global-state"?: A_GlobalState[]
    "global-state-schema": A_StateSchema
    "local-state-schema": A_StateSchema
}

export interface A_GlobalState {
    key: string
    value: {
        bytes: string
        type: number
        uint: number
    }
}

export interface A_GlobalStateDecrypted {
    key: string
    type: string
    value: string | number
}

export interface A_GlobalStateDelta {
    key: string
    value: {
        bytes: string
        action: number
        uint: number
    }
}

export interface A_LocalStateDelta {
    address: string,
    delta: A_AppStateDelta[]
}

export interface A_AppStateDelta {
    key: string
    value: {
        bytes: string
        action: number
        uint: number
    }
}

export interface A_StateSchema {
    "num-byte-slice": number
    "num-uint": number
}

export interface A_AppsLocalState {
    id: number
    "key-value": {
        key: string
        value: {
            bytes: string
            type: number
            uint: number
        }
    }[]
    schema: A_StateSchema
}

export interface A_SearchTransaction{
    "close-rewards": number
    "closing-amount": number
    "confirmed-round": number
    fee: number
    "first-valid": number
    "intra-round-offset": number
    "last-valid": number
    "receiver-rewards": number
    "round-time": number
    sender: string
    "sender-rewards": number
    "tx-type": string,
    note: string
    "genesis-hash": string
    "genesis-id": string
    id: string
    group?: string
    "inner-txns"?: A_SearchTransactionInner[]
    "created-application-index"?: number
    "created-asset-index"?: number
    "application-transaction"?: A_SearchTransaction_App_Call_Payload
    "asset-transfer-transaction"?: A_SearchTransaction_Asset_Transfer_Payload,
    "asset-freeze-transaction"?: A_SearchTransaction_Asset_Freeze_Payload
    "payment-transaction"?: A_SearchTransaction_Payment_Payload,
    "asset-config-transaction"?: A_Asset,
    "keyreg-transaction"?: A_SearchTransaction_KeyReg_Payload,
    "state-proof-transaction"?: A_SearchTransaction_State_Proof_Payload
    "global-state-delta"?: A_GlobalStateDelta[],
    "local-state-delta"?: A_LocalStateDelta[]
    signature: A_SearchTransaction_Signature,
    logs?: string[]
}

export interface A_SearchTransaction_Signature {
    "multisig"?: {
        version: number,
        threshold: number,
        subsignature: {
            "public-key": string,
            signature: string
        }[]
    }
    logicsig?: {
        logic: string
    }
}


export interface A_SearchTransaction_KeyReg_Payload {
    "non-participation": boolean
    "selection-participation-key": string
    "vote-first-valid": number
    "vote-key-dilution": number
    "vote-last-valid": number
    "vote-participation-key": string
}

export interface A_SearchTransaction_Payment_Payload {
    amount: number
    "close-amount": number
    receiver: string
    "close-remainder-to": string
}

export interface A_SearchTransaction_Asset_Transfer_Payload {
    amount: number
    "asset-id": number
    "close-amount": number
    receiver: string
    "close-to": string
}

export interface A_SearchTransaction_Asset_Freeze_Payload {
    "address": string,
    "asset-id": number,
    "new-freeze-status": boolean
}
export interface A_SearchTransaction_App_Call_Payload {
    accounts: string[]
    "application-args": string[]
    "application-id": number
    "approval-program": string
    "clear-state-program": string
    "foreign-apps": number[]
    "foreign-assets": number[]
    "global-state-schema": A_StateSchema
    "local-state-schema": A_StateSchema
    "on-completion": string
}

export interface A_SearchTransaction_State_Proof_Payload {
    message: Message
    "state-proof": A_StateProof
    "state-proof-type": number
}

export interface Message {
    "block-headers-commitment": string
    "first-attested-round": number
    "latest-attested-round": number
    "ln-proven-weight": number
    "voters-commitment": string
}

export interface A_StateProof {
    "part-proofs": A_PartProofs
    "positions-to-reveal": number[]
    reveals: A_Reveal[]
    "salt-version": number
    "sig-commit": string
    "sig-proofs": A_SigProofs
    "signed-weight": number
}

export interface A_PartProofs {
    "hash-factory": A_HashFactory
    path: string[]
    "tree-depth": number
}

export interface A_HashFactory {
    "hash-type": number
}

export interface A_Reveal {
    participant: A_Participant
    position: number
    "sig-slot": A_SigSlot
}

export interface A_Participant {
    verifier: A_Verifier
    weight: number
}

export interface A_Verifier {
    commitment: string
    "key-lifetime": number
}

export interface A_SigSlot {
    "lower-sig-weight": number
    signature: A_Signature
}

export interface A_Signature {
    "falcon-signature": string
    "merkle-array-index": number
    proof: A_Proof
    "verifying-key": string
}

export interface A_Proof {
    "hash-factory": A_HashFactory
    path: string[]
    "tree-depth": number
}

export interface A_SigProofs {
    "hash-factory": A_HashFactory
    path: string[]
    "tree-depth": number
}

export type A_SearchTransactionInner = Omit<A_SearchTransaction, "id,note,genesis-hash,genesis-id,inner-txns">

export type A_SearchAccount = {
    address: string
    amount: number
    status: string
    "total-apps-opted-in": number
    "total-assets-opted-in": number
    "total-created-apps": number
    "total-created-assets": number
};

export type A_Block = {
    round: number
    timestamp: number
    "txn-counter": number,
    transactions: A_SearchTransaction[]
};

export type AlgodConnectionParams = {
    url: string,
    port: string,
    token: string | AlgodTokenHeader | CustomTokenHeader
}

export type IndexerConnectionParams = {
    url: string,
    port: string,
    token: string | IndexerTokenHeader | CustomTokenHeader
}

export type NodeConnectionParams = {
    id?: string,
    label?: string,
    algod: AlgodConnectionParams,
    indexer: IndexerConnectionParams
};

export type KMDConnectionParams = {
    url: string,
    port: string,
    token: string | KMDTokenHeader | CustomTokenHeader
}

export type A_Group = {
    id: string
    block: number
    timestamp: number
    transactions: A_SearchTransaction[]
};

export type A_VersionsCheck = {
    "versions"?: string[],
    "genesis_id": string,
    "genesis_hash_b64": string,
    "build"?: {
        "major": number,
        "minor": number,
        "build_number": number,
        "commit_hash": string,
        "branch": string,
        "channel": string
    }
}

export type A_Status = {
    "catchpoint": string,
    "catchpoint-acquired-blocks": number,
    "catchpoint-processed-accounts": number,
    "catchpoint-total-accounts": number,
    "catchpoint-total-blocks": number,
    "catchpoint-verified-accounts": number,
    "catchup-time": number,
    "last-catchpoint": string,
    "last-round": number,
    "last-version": string,
    "next-version": string,
    "next-version-round": number,
    "next-version-supported": boolean,
    "stopped-at-unsupported-round": boolean,
    "time-since-last-round": number
}

export interface A_Health {
    "db-available": boolean
    errors: string[]
    "is-migrating": boolean
    message: string
    round: number
    version: string
}

export type A_Genesis = {
    "fees": string,
    "proto": string,
    "rwd": string,
    "timestamp": number
}



export type A_ABIMethodArgParams = ABIMethodArgParams & {value: string, decodedValue: ABIValue, decoded: boolean}


