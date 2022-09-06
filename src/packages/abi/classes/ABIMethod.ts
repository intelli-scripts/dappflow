import {A_ABI_Method_Arg, A_ABI_Method} from "../types";
import {ABIMethod as CoreABIMethod} from 'algosdk';

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

    getReturnType(): string {
        return this.method.returns.type;
    }

    getReturnDesc(): string {
        return this.method.returns.desc;
    }

    getSignature(): string {
        const instance = new CoreABIMethod({
            name: this.getName(),
            desc: this.getDesc(),
            args: this.getArgs(),
            returns: this.method.returns
        });

        return instance.getSignature();
    }

    getSignatureSelector(): string {
        const instance = new CoreABIMethod({
            name: this.getName(),
            desc: this.getDesc(),
            args: this.getArgs(),
            returns: this.method.returns
        });

        const selector = instance.getSelector();
        return Buffer.from(selector.toString(), 'base64').toString('hex');
    }

}