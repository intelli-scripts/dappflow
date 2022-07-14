import { Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_Application
} from "../types";
import {Network} from "../network";
import axios from 'axios';
import {A_TransactionsResponse} from "./transactionClient";

export type A_ApplicationTransactionsResponse = A_TransactionsResponse;
export type A_ApplicationsResponse = {
    'next-token': string,
    applications: A_Application[]
};

export class ApplicationClient{
    client: Algodv2;
    indexer: IndexerClient;
    network: Network

    constructor(network: Network) {
        this.network = network;
        this.client = network.getClient();
        this.indexer = network.getIndexer();
    }

    async get(id: number): Promise<A_Application>{
        const app = await this.client.getApplicationByID(id).do();
        return app as A_Application;
    }

    async getApplications(token?: string): Promise<A_ApplicationsResponse> {
        const req = this.indexer.searchForApplications();
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_ApplicationsResponse;
    }

    async getApplicationTransactions(id: number, token?: string): Promise<A_ApplicationTransactionsResponse> {
        const req = this.indexer.searchForTransactions().applicationID(id);
        if (token) {
            req.nextToken(token);
        }

        const response = await req.do();
        return response as A_ApplicationTransactionsResponse;
    }

    async decompileProgram(program: string) {
        const bytes = Buffer.from(program, 'base64');

        const baseUrl = this.network.getAlgodUrl();
        const url = baseUrl + '/v2/teal/disassemble';

        // @ts-ignore
        return axios({
            method: 'post',
            url,
            data: bytes,
            headers: {
                'x-algo-api-token': this.network.getAlgodToken()
            }
        });
    }
}