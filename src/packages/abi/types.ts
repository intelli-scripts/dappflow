export interface A_ABI_Method_Arg {
    type: string;
    name?: string;
    desc?: string;
}

export interface A_ABI_Method {
    name: string;
    desc?: string;
    args: A_ABI_Method_Arg[];
    returns: {
        type: string;
        desc?: string;
    };
}

export interface A_ABI {
    name: string;
    desc?: string;
    methods: A_ABI_Method[];
    networks?: A_ABI_Networks
}

export interface A_ABI_Networks {
    [key: string]: A_ABI_Network;
}

export interface A_ABI_Network {
    appID: number;
}