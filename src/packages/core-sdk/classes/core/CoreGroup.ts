import {
    A_Group, A_SearchTransaction
} from "../../types";
import {TIMESTAMP_DISPLAY_FORMAT} from "../../constants";
import dateFormat  from "dateformat";
import {CoreTransaction} from "./CoreTransaction";
import humanizeDuration from 'humanize-duration';


export class CoreGroup {
    group: A_Group;

    constructor(group: A_Group) {
        this.group = group;
    }

    get(): A_Group {
        return this.group;
    }

    getId(): string {
        return this.group.id;
    }

    getBlock(): number {
        return this.group.block;
    }

    getTimestamp(): number {
        return this.group.timestamp;
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

    getTransactionsCount(): number {
        return this.getTransactions().length;
    }

    getTransactions(): A_SearchTransaction[] {
        return this.group.transactions;
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