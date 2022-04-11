import {DAPPFLOW_NODE_CONFIG} from "./types";

export function getNodeConfig(): DAPPFLOW_NODE_CONFIG {
    const algodUrl = localStorage.getItem('algodUrl') || 'http://localhost';
    const algodPort = localStorage.getItem('algodPort') === null ? '4001' : localStorage.getItem('algodPort');
    const algodToken= localStorage.getItem('algodToken') === null ? 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' : localStorage.getItem('algodToken');

    const indexerUrl = localStorage.getItem('indexerUrl') || 'http://localhost';
    const indexerPort = localStorage.getItem('indexerPort') === null ? '8980' : localStorage.getItem('indexerPort');
    const indexerToken= localStorage.getItem('indexerToken') === null ? '' : localStorage.getItem('indexerToken');

    return {
        algodUrl,
        algodPort,
        algodToken,
        indexerUrl,
        indexerPort,
        indexerToken
    }
}

export function getNodes(): DAPPFLOW_NODE_CONFIG[] {
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


