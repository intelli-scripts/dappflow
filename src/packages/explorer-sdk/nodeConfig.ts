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


