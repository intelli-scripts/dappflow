import { Algodv2} from 'algosdk';
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";
import {
    A_Application,
    A_SearchTransaction
} from "../types";
import {Network} from "../network";
import axios from 'axios';

export type A_ApplicationTransactionsResponse = {
    'next-token': string,
    transactions: A_SearchTransaction[]
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

    async getApplications(): Promise<A_Application[]> {
        const {applications} = await this.indexer.searchForApplications().do();
        return applications;
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