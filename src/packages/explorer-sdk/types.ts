export type DAPPFLOW_EXPLORER_ACCOUNT = {
    address: string
    amount: number
    status: string
    "total-apps-opted-in": number
    "total-assets-opted-in": number
    "total-created-apps": number
    "total-created-assets": number
};

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