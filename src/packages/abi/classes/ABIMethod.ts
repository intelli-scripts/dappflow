import {ABIMethod as CoreABIMethod, ABIMethodArgParams, ABIMethodParams, ABIMethodReturnParams} from 'algosdk';

export class ABIMethod {
    method: ABIMethodParams

    constructor(method: ABIMethodParams) {
        this.method = method;
    }

    getName(): string {
        return this.method.name;
    }

    getDesc(): string {
        return this.method.desc;
    }

    getArgs(): ABIMethodArgParams[] {
        return this.method.args || [];
    }

    getReturns(): ABIMethodReturnParams {
        return this.method.returns;
    }

    getReturnType(): string {
        return this.getReturns().type;
    }

    getReturnDesc(): string {
        return this.getReturns().desc;
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

    getSignatureSelector(encoding: BufferEncoding = 'hex'): string {
        const instance = new CoreABIMethod({
            name: this.getName(),
            desc: this.getDesc(),
            args: this.getArgs(),
            returns: this.method.returns
        });

        const selector = instance.getSelector();
        return  Buffer.from(selector).toString(encoding);
    }

}