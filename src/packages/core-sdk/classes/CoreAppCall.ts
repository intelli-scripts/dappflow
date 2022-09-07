import {
    A_ABI_Decoded_App_argument,
    A_SearchTransaction_App_Call_Payload
} from "../types";
import {ABI} from "../../abi/classes/ABI";
import {ABIMethod} from "../../abi/classes/ABIMethod";
import {ABIContractParams} from "algosdk";


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

        const abiInstance = new ABI(abi);
        const methods = abiInstance.getMethods();

        methods.forEach((method) => {
            const methodInstance = new ABIMethod(method);
            const methodSelector = methodInstance.getSignatureSelector('base64');
            if (methodSelector === txnMethodSelector) {
                //method matched
                console.log(method);
                const methodArgs = methodInstance.getArgs();
                const txnArgs = args.slice(1, args.length);
                console.log(txnArgs);
                methodArgs.forEach((methodArg) => {

                })
            }
        });

        return decodedArgs;

    }
}