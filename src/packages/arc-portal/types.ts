export type A_Arc = {
    id: number
    name: string
    markdownUrl: string
    markdown: string
    github: string,
    hasWorkspace: boolean
};

export type A_Arc_Validation = {
    valid: boolean,
    errors: string[]
};