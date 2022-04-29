export enum TXN_TYPES {
    PAYMENT = 'pay',
    KEY_REGISTRATION = 'keyreg',
    ASSET_CONFIG = 'acfg',
    ASSET_TRANSFER = 'axfer',
    APP_CALL = 'appl'
}

export enum NOTE_ENCRYPTIONS {
    BASE64 = 'base64',
    TEXT = 'text',
    MSG_PACK = 'msgpack'
}

export const TIMESTAMP_DISPLAY_FORMAT = 'GMT:ddd, dd mmmm  yyyy HH:MM:ss';