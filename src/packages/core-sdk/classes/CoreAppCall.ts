import {
    A_ABIMethodArgParams,
    A_SearchTransaction_App_Call_Payload
} from "../types";
import {ABIContract, ABIContractParams, ABIType} from "algosdk";
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

    getABIDecodedArgs(abi: ABIContractParams): A_ABIMethodArgParams[] {
        const decodedArgs: A_ABIMethodArgParams[] = [];
        const args = this.getAppCallArguments();

        if (!abi) {
            return decodedArgs;
        }
        if (!args) {
            return decodedArgs;
        }
        if (args.length === 0) {
            return decodedArgs;
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

                methodArgs.forEach((methodArg, index) => {
                    const txnArg = txnArgs[index];

                    const decodedArg: A_ABIMethodArgParams = {
                        ...methodArg,
                        type: methodArg.type.toString(),
                        value: txnArg,
                        decodedValue: txnArg,
                        decoded: false
                    };

                    let typeToDecode = ABIType.from(methodArg.type.toString());
                    const encodedArg = new Uint8Array(Buffer.from(txnArg, 'base64'));

                    if (algosdk.abiTypeIsReference(methodArg.type)) {
                        switch (methodArg.type) {
                            case algosdk.ABIReferenceType.account:
                                typeToDecode = algosdk.ABIType.from('address');
                                break;
                            case algosdk.ABIReferenceType.application:
                            case algosdk.ABIReferenceType.asset:
                                typeToDecode = algosdk.ABIType.from('uint64');
                                break;
                        }
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

        console.log(decodedArgs);
        return decodedArgs;

    }
}