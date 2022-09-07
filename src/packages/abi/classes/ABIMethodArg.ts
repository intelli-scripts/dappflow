import {ABIMethodArgParams} from "algosdk";

export class ABIMethodArg {
    arg: ABIMethodArgParams

    constructor(arg: ABIMethodArgParams) {
        this.arg = arg;
    }

    getName(): string {
        return this.arg.name;
    }

    getType(): string {
        return this.arg.type;
    }
    
    getDesc(): string {
        return this.arg.desc;
    }
}