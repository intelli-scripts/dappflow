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
    validMetadataHash: boolean
    errors: string[],
    metadata?: A_Arc3_Metadata
};

export type A_Arc3_Metadata = {
    decimals?: number
    image?: string
    image_integrity?: string
    image_mimetype?: string
    name: string
    properties?: any
    unitName?: string
}