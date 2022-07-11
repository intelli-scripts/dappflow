import {A_NodeConfig} from "../packages/core-sdk/types";

export function getNodeConfig(): A_NodeConfig {
    const defaultNode = getNodes()[1];
    const algodUrl = localStorage.getItem('algodUrl') || defaultNode.algodUrl;
    const algodPort = localStorage.getItem('algodPort') === null ? defaultNode.algodPort : localStorage.getItem('algodPort');
    const algodToken= localStorage.getItem('algodToken') === null ? defaultNode.algodToken : localStorage.getItem('algodToken');

    const indexerUrl = localStorage.getItem('indexerUrl') || defaultNode.indexerUrl;
    const indexerPort = localStorage.getItem('indexerPort') === null ? defaultNode.indexerPort : localStorage.getItem('indexerPort');
    const indexerToken= localStorage.getItem('indexerToken') === null ? defaultNode.indexerToken : localStorage.getItem('indexerToken');

    return {
        algodUrl,
        algodPort,
        algodToken,
        indexerUrl,
        indexerPort,
        indexerToken
    }
}

export function getNodes(): A_NodeConfig[] {
    return [{
        id: 'sandbox',
        label: 'Sandbox',
        algodUrl: 'http://localhost',
        algodPort: '4001',
        algodToken: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        indexerUrl: 'http://localhost',
        indexerPort: '8980',
        indexerToken: ''
    },
        {
            id: 'algonode_testnet',
            label: 'Algonode testnet',
            algodUrl: 'https://testnet-api.algonode.cloud',
            algodPort: '',
            algodToken: '',
            indexerUrl: 'https://testnet-idx.algonode.cloud',
            indexerPort: '',
            indexerToken: ''
        },
        {
            id: 'algonode_mainnet',
            label: 'Algonode mainnet',
            algodUrl: 'https://mainnet-api.algonode.cloud',
            algodPort: '',
            algodToken: '',
            indexerUrl: 'https://mainnet-idx.algonode.cloud',
            indexerPort: '',
            indexerToken: ''
        }];
}


