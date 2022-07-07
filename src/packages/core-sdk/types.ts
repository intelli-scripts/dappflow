export interface A_AccountInformation {
    address: string
    amount: number
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
    "payment-transaction"?: A_SearchTransaction_Payment_Payload,
    "asset-config-transaction"?: A_Asset,
    "keyreg-transaction"?: A_SearchTransaction_KeyReg_Payload,
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

export type A_NodeConfig = {
    id?: string,
    label?: string,
    algodUrl: string,
    algodPort: string,
    algodToken: string,
    indexerUrl: string,
    indexerPort: string,
    indexerToken: string
};

export type A_Group = {
    id: string
    block: number
    timestamp: number
    transactions: A_SearchTransaction[]
};

