import {
    A_ABIMethodArgParams,
    A_SearchTransaction_App_Call_Payload
} from "../../types";
import {ABIContract, ABIContractParams, ABIMethodParams, ABIType} from "algosdk";
import algosdk from "algosdk";


export class CoreAppCall {
    payload: A_SearchTransaction_App_Call_Payload;

    constructor(payload: A_SearchTransaction_App_Call_Payload) {
        this.payload = payload;
    }

    getAppCallArguments(): string[] {
        return this.payload['application-args'];
    }

    isCreate(): boolean {
        return this.payload["application-id"] ? false : true;
    }

    getABIDecodedArgs(abi: ABIContractParams): {
        args: A_ABIMethodArgParams[],
        method: ABIMethodParams
    } {
        const decodedArgs: A_ABIMethodArgParams[] = [];
        const args = this.getAppCallArguments();
        let method;
        const result = {
            args: decodedArgs,
            method
        }

        if (!abi) {
            return result;
        }
        if (!args) {
            return result;
        }
        if (args.length === 0) {
            return result;
        }

        const txnMethodSelector = args[0];

        const abiInstance = new ABIContract(abi);
        const methods = abiInstance.methods;

        methods.forEach((methodInstance) => {

            const signature = methodInstance.getSelector();
            const methodSelector = Buffer.from(signature).toString("base64");

            if (methodSelector === txnMethodSelector) {
                const methodArgs = methodInstance.args;
                const txnArgs = args.slice(1, args.length);
                method = methodInstance.toJSON();

                methodArgs.forEach((methodArg, index) => {
                    const txnArg = txnArgs[index];
                    const type = methodArg.type.toString();

                    const decodedArg: A_ABIMethodArgParams = {
                        ...methodArg,
                        type: type,
                        value: txnArg,
                        decodedValue: txnArg,
                        decoded: false
                    };

                    let typeToDecode;

                    if (algosdk.abiTypeIsTransaction(methodArg.type)) {
                        decodedArg.decodedValue = txnArg;
                        decodedArg.decoded = true;
                        decodedArgs.push(decodedArg);
                        return;
                    }

                    let encodedArg: any = new Uint8Array(Buffer.from(txnArg, 'base64'));

                    if (type.startsWith('uint')) {
                        encodedArg = algosdk.decodeUint64(encodedArg, "mixed");
                        decodedArg.decodedValue = encodedArg;
                        decodedArg.decoded = true;
                        decodedArgs.push(decodedArg);
                        return;
                    }

                    if (algosdk.abiTypeIsReference(methodArg.type)) {
                        switch (methodArg.type) {
                            case algosdk.ABIReferenceType.account:
                                typeToDecode = algosdk.ABIType.from('address');
                                break;
                            case algosdk.ABIReferenceType.application:
                            case algosdk.ABIReferenceType.asset:
                                typeToDecode = algosdk.ABIType.from('uint64');
                                encodedArg = algosdk.decodeUint64(encodedArg, "mixed");
                                decodedArg.decodedValue = encodedArg;
                                decodedArg.decoded = true;
                                decodedArgs.push(decodedArg);
                                return;
                        }
                    }
                    else {
                        typeToDecode = ABIType.from(type);
                    }

                    try {
                        decodedArg.decodedValue = typeToDecode.decode(encodedArg);
                        decodedArg.decoded = true;
                    }
                    catch (e) {
                        decodedArg.decodedValue = txnArg;
                    }

                    decodedArgs.push(decodedArg);
                });


            }
        });

        result.args = decodedArgs;
        result.method = method;

        return result;

    }
}