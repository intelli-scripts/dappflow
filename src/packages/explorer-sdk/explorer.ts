import {Network} from "../core-sdk/network";
import {AccountsClient} from "./clients/accountsClient";
import {TransactionsClient} from "./clients/transactionsClient";


export class Explorer{
    network: Network;
    accountsClient: AccountsClient;
    transactionsClient: TransactionsClient;

    constructor(network: Network) {
        this.network = network;
        this.accountsClient = new AccountsClient(network);
        this.transactionsClient = new TransactionsClient(network);
    }
}