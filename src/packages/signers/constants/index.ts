export enum NETWORKS {
    BETANET = "betanet",
    TESTNET = 'testnet',
    MAINNET = 'mainnet'
}

export enum SIGNERS {
    WALLET = 'wallet',
    ALGO_SIGNER = 'algo_signer',
    LOGIC_SIG = 'logic_sig',
    MY_ALGO_WALLET = 'my_algo_wallet'
}

export enum ALGO_SIGNER_NET {
    BETANET = "BetaNet",
    TESTNET = 'TestNet',
    MAINNET = 'MainNet'
}

export enum LOCAL_STORAGE {
    NETWORK = 'network'
}

export const BURN_ADDRESS_MIN_BAL: number = 0.2;

export enum NFT_STANDARDS {
    ARC3 = "arc3",
    ARC69 = 'arc69',
}
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs';