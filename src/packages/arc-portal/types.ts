export type A_Arc = {
    id: number
    name: string
    markdownUrl: string
    markdown: string
    github: string,
    hasWorkspace: boolean
};

export type A_Arc3_Validation = {
    valid: boolean,
    validName: boolean,
    validJsonMetadata: boolean,
    validJsonMetadataContent: boolean,
    validMetadataHash: boolean
    errors: string[],
    metadata?: A_Arc3_Metadata
};

export type A_Arc3_Metadata = {
    decimals?: number
    name: string
    properties?: any
    unitName?: string
    image?: string
    image_integrity?: string
    image_mimetype?: string
    animation_url?: string
    animation_url_integrity?: string
    animation_url_mimetype?: string
    external_url?: string
    external_url_integrity?: string
    external_url_mimetype?: string
}