export type DAPPFLOW_EXPLORER_ACCOUNT = {
    address: string
    amount: number
    status: string
    "total-apps-opted-in": number
    "total-assets-opted-in": number
    "total-created-apps": number
    "total-created-assets": number
};

export interface DAPPFLOW_EXPLORER_STATE_SCHEMA {
    "num-byte-slice": number
    "num-uint": number
}

export type DAPPFLOW_EXPLORER_SEARCH_TRANSACTION_INNER = Omit<DAPPFLOW_EXPLORER_SEARCH_TRANSACTION, "id,note,genesis-hash,genesis-id,inner-txns">

export interface DAPPFLOW_EXPLORER_SEARCH_TRANSACTION{
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
    "inner-txns": [DAPPFLOW_EXPLORER_SEARCH_TRANSACTION_INNER]
    "created-application-index"?: number
    "application-transaction"?: {
        accounts: string[]
        "application-args": string[]
        "application-id": number
        "approval-program": string
        "clear-state-program": string
        "foreign-apps": number[]
        "foreign-assets": number[]
        "global-state-schema": DAPPFLOW_EXPLORER_STATE_SCHEMA
        "local-state-schema": DAPPFLOW_EXPLORER_STATE_SCHEMA
        "on-completion": string
    }
    "asset-transfer-transaction"?: {
        amount: number
        "asset-id": number
        "close-amount": number
        receiver: string
    }
}

export type DAPPFLOW_NODE_CONFIG = {
    id?: string,
    label?: string,
    algodUrl: string,
    algodPort: string,
    algodToken: string,
    indexerUrl: string,
    indexerPort: string,
    indexerToken: string
};