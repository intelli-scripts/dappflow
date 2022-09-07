import {
    A_ABI_Decoded_App_argument,
    A_SearchTransaction_App_Call_Payload
} from "../types";
import {ABIContract, ABIContractParams} from "algosdk";


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

    getABIDecodedArgs(abi: ABIContractParams): A_ABI_Decoded_App_argument[] {
        const decodedArgs: A_ABI_Decoded_App_argument[] = [];
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

            const signature = methodInstance.getSignature();
            const methodSelector = Buffer.from(signature).toString("base64");

            if (methodSelector === txnMethodSelector) {
                const methodArgs = methodInstance.args;
                const txnArgs = args.slice(1, args.length);
                console.log(txnArgs);
                methodArgs.forEach((methodArg) => {

                })
            }
        });

        return decodedArgs;

    }
}