import {A_ABI_Method_Arg} from "../types";

export class ABIMethodArg {
    arg: A_ABI_Method_Arg

    constructor(arg: A_ABI_Method_Arg) {
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