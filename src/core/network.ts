import * as sdk from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Algodv2} from "algosdk";
import {AlgodTokenHeader, CustomTokenHeader, IndexerTokenHeader} from "algosdk/dist/types/src/client/urlTokenBaseHTTPClient";

export class Network {
    public name: string
    public algod: string
    public label: string
    public indexer: string
    public algodPort: string
    public indexerPort: string
    public algodToken: string | AlgodTokenHeader | CustomTokenHeader
    public indexerToken: string | IndexerTokenHeader | CustomTokenHeader

    constructor(name: string, label: string, algod: string, indexer: string, algodToken: string | AlgodTokenHeader | CustomTokenHeader = {}, indexerToken: string | IndexerTokenHeader | CustomTokenHeader = {}, algodPort: string = '', indexerPort: string = '') {
        this.name = name;
        this.label = label;
        this.setAlgodServer(algod, algodToken, algodPort);
        this.setIndexerServer(indexer, indexerToken, indexerPort);
    }

    setAlgodServer(url: string, algodToken: string | AlgodTokenHeader | CustomTokenHeader = {}, algodPort: string = '') {
        this.algod = url;
        this.algodToken = algodToken;
        this.algodPort = algodPort;
    }

    setIndexerServer(url: string, indexerToken: string | IndexerTokenHeader | CustomTokenHeader = {}, indexerPort: string = '') {
        this.indexer = url;
        this.indexerToken = indexerToken;
        this.indexerPort = indexerPort;
    }

    getClient(): Algodv2{
        return new sdk.Algodv2(this.algodToken, this.algod, this.algodPort);
    }

    getIndexer(): IndexerClient {
        return new sdk.Indexer(this.indexerToken, this.indexer, this.indexerPort);
    }
}
