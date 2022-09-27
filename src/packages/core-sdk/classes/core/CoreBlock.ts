import {
    A_Block, A_SearchTransaction
} from "../../types";
import {TIMESTAMP_DISPLAY_FORMAT} from "../../constants";
import dateFormat  from "dateformat";
import {CoreTransaction} from "./CoreTransaction";
import humanizeDuration from 'humanize-duration';


export class CoreBlock {
    block: A_Block;

    constructor(block: A_Block) {
        this.block = block;
    }

    get(): A_Block{
        return this.block;
    }

    getRound(): number {
        return this.block.round;
    }

    getTransactionsCount(): number {
        return this.getTransactions().length;
    }

    getTimestamp(): number {
        return this.block.timestamp;
    }

    getTimestampDisplayValue(format: string = TIMESTAMP_DISPLAY_FORMAT): string {
        return dateFormat(new Date(this.getTimestamp() * 1000), format);
    }

    getTimestampDuration(): string {
        // @ts-ignore
        const diff = new Date() - new Date(this.getTimestamp() * 1000);
        const duration = humanizeDuration(diff, { largest: 2, round: true });
        return duration;
    }

    getTransactions(): A_SearchTransaction[] {
        return this.block.transactions;
    }

    getTransactionsTypesCount() {
        const transactions = this.getTransactions();
        const typesCount = {};

        transactions.forEach((txn) => {
            const txnInstance = new CoreTransaction(txn);
            const type = txnInstance.getType();

            if (!typesCount[type]) {
                typesCount[type] = 1;
            }
            else {
                typesCount[type] += 1;
            }
        });

        const str = [];
        for (let key in typesCount) {
            if (typesCount.hasOwnProperty(key)) {
                const val = typesCount[key];
                str.push(key + '=' + val);
            }
        }

        return str.join(', ');
    }
}