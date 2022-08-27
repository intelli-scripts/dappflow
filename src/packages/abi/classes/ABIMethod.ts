import {A_ABI_Method_Arg, A_ABI_Method} from "../types";

export class ABIMethod {
    method: A_ABI_Method

    constructor(method: A_ABI_Method) {
        this.method = method;
    }

    getName(): string {
        return this.method.name;
    }

    getDesc(): string {
        return this.method.desc;
    }

    getArgs(): A_ABI_Method_Arg[] {
        return this.method.args || [];
    }
}