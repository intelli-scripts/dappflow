import './AppCallTxnReturnValue.scss';
import React, {} from "react";
import {ABIMethodParams, ABIType} from "algosdk";
import {A_SearchTransaction} from "../../../../../../../../../packages/core-sdk/types";
import {CoreTransaction} from "../../../../../../../../../packages/core-sdk/classes/core/CoreTransaction";
import {Alert, Typography} from "@mui/material";

type AppCallTxnReturnValueProps = {
    transaction: A_SearchTransaction,
    method: ABIMethodParams
};

function AppCallTxnReturnValue({transaction, method}: AppCallTxnReturnValueProps): JSX.Element {


    const txnInstance = new CoreTransaction(transaction);
    let returnType = method.returns.type.toString();
    let decodedVal;

    if (!returnType || returnType === 'void') {
        decodedVal = '';
    }
    else {
        const codec: ABIType = ABIType.from(returnType);
        const returnValBase64 = txnInstance.getReturnValue();
        let bufReturnedVal = Buffer.from(returnValBase64, 'base64');
        bufReturnedVal = bufReturnedVal.slice(4, bufReturnedVal.length)
        const uintReturnedVal = Uint8Array.from(bufReturnedVal);
        decodedVal = codec.decode(uintReturnedVal).toString();
    }




    return (<div className={"app-call-txn-return-value-wrapper"}>
        <div className={"app-call-txn-return-value-container"}>
            <div className="method-signature">
                <Alert icon={false} color={"warning"}>
                    <Typography sx={{marginBottom: '10px'}}>Returned</Typography>
                    <div className="method-sig-section">
                        <div className="method-sig-section-key">
                            Type
                        </div>
                        <div className="method-sig-section-value">
                            {returnType}
                        </div>
                    </div>
                    <div className="method-sig-section">
                        <div className="method-sig-section-key">
                            Value
                        </div>
                        <div className="method-sig-section-value">
                            {decodedVal}
                        </div>
                    </div>
                </Alert>
            </div>
        </div>
    </div>);
}

export default AppCallTxnReturnValue;
