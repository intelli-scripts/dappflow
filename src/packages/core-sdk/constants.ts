export enum TXN_TYPES {
    PAYMENT = 'pay',
    KEY_REGISTRATION = 'keyreg',
    ASSET_CONFIG = 'acfg',
    ASSET_TRANSFER = 'axfer',
    ASSET_FREEZE = 'afrz',
    APP_CALL = 'appl',
    STATE_PROOF = 'stpf'
}

export enum TEXT_ENCODING {
    BASE64 = 'base64',
    TEXT = 'text',
    MSG_PACK = 'msgpack',
    HEX = 'hex'
}

export enum PROGRAM_ENCODING {
    BASE64 = 'base64',
    TEAL = 'teal'
}

export const TIMESTAMP_DISPLAY_FORMAT = 'ddd, dd mmmm  yyyy HH:MM:ss';

export enum NETWORKS {
    TESTNET = 'testnet',
    MAINNET = 'mainnet',
    SANDBOX = 'sandbox'
}

export const BLOCK_TIME = 3.6;