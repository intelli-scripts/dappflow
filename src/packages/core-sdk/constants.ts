export enum TXN_TYPES {
    PAYMENT = 'pay',
    KEY_REGISTRATION = 'keyreg',
    ASSET_CONFIG = 'acfg',
    ASSET_TRANSFER = 'axfer',
    ASSET_FREEZE = 'afrz',
    APP_CALL = 'appl'
}

export enum TEXT_ENCODING {
    BASE64 = 'base64',
    TEXT = 'text',
    MSG_PACK = 'msgpack'
}

export enum PROGRAM_ENCODING {
    BASE64 = 'base64',
    TEAL = 'teal'
}

export const TIMESTAMP_DISPLAY_FORMAT = 'GMT:ddd, dd mmmm  yyyy HH:MM:ss';