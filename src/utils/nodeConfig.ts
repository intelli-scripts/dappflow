import {KMDConnectionParams, NodeConnectionParams} from "../packages/core-sdk/types";

export function getNodeConfig(): NodeConnectionParams {
    const defaultNode = getNodes()[1];

    return {
        ...defaultNode,
        algod: {
            url: localStorage.getItem('algodUrl') || defaultNode.algod.url,
            port: localStorage.getItem('algodPort') || defaultNode.algod.port,
            token: localStorage.getItem('algodToken') || defaultNode.algod.token,
        },
        indexer: {
            url: localStorage.getItem('indexerUrl') || defaultNode.indexer.url,
            port: localStorage.getItem('indexerPort') || defaultNode.indexer.port,
            token: localStorage.getItem('indexerToken') || defaultNode.indexer.token,
        }
    }
}

export function getKMDConfig(): KMDConnectionParams {
    const defaultKMDConfig: KMDConnectionParams = {
        url: 'http://localhost',
        token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        port: '4002'
    };

    return {
        url: localStorage.getItem('kmdUrl') || defaultKMDConfig.url,
        port: localStorage.getItem('kmdPort') || defaultKMDConfig.port,
        token: localStorage.getItem('kmdToken') || defaultKMDConfig.token,
    }
}

export function getNodes(): NodeConnectionParams[] {
    return [{
        id: 'sandbox',
        label: 'Sandbox',
        algod: {
            url: 'http://localhost',
            port: '4001',
            token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        indexer: {
            url: 'http://localhost',
            port: '8980',
            token: ''
        }
    },
        {
            id: 'algonode_testnet',
            label: 'Algonode testnet',
            algod: {
                url: 'https://testnet-api.algonode.cloud',
                port: '',
                token: '',
            },
            indexer: {
                url: 'https://testnet-idx.algonode.cloud',
                port: '',
                token: '',
            }
        },
        {
            id: 'algonode_mainnet',
            label: 'Algonode mainnet',
            algod: {
                url: 'https://mainnet-api.algonode.cloud',
                port: '',
                token: '',
            },
            indexer: {
                url: 'https://mainnet-idx.algonode.cloud',
                port: '',
                token: '',
            }
        }];
}


