import * as sdk from "algosdk";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {Algodv2} from "algosdk";
import {AlgodTokenHeader, CustomTokenHeader, IndexerTokenHeader} from "algosdk/dist/types/src/client/urlTokenBaseHTTPClient";
import {AlgodConnectionParams, IndexerConnectionParams, NodeConnectionParams} from "./types";

export class Network {
    public id: string
    public label: string

    public algod: AlgodConnectionParams
    public indexer: IndexerConnectionParams


    constructor(params: NodeConnectionParams) {
        this.id = params.id;
        this.label = params.label;
        this.algod = params.algod;
        this.indexer = params.indexer;
    }

    getAlgodUrl(): string {
        const {url, port} = this.algod;
        return port ? `${url}:${port}` : url;
    }

    getAlgodToken(): string | AlgodTokenHeader | CustomTokenHeader {
        return this.algod.token;
    }

    getIndexerToken(): string | IndexerTokenHeader | CustomTokenHeader {
        return this.indexer.token;
    }

    getIndexerUrl(): string {
        const {url, port} = this.indexer;
        return port ? `${url}:${port}` : url;
    }

    getClient(): Algodv2{
        const {url, port, token} = this.algod;
        return new sdk.Algodv2(token, url, port);
    }

    getIndexer(): IndexerClient {
        const {url, port, token} = this.indexer;
        return new sdk.Indexer(token, url, port);
    }
}
