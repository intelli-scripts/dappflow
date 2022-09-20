import './ABIMethodSignature.scss';
import React, {useState} from "react";
import {
    Alert, Box,
    Button,
    ButtonGroup
} from "@mui/material";
import {TEXT_ENCODING} from "../../../../packages/core-sdk/constants";
import {ABIMethodParams, ABIMethod} from "algosdk";

type ABIMethodProps = {
    method: ABIMethodParams
};

interface ABIMethodSignatureState{
    textEncoding: string
}

const initialState: ABIMethodSignatureState = {
    textEncoding: 'hex'
};

function ABIMethodSignature(props: ABIMethodProps): JSX.Element {
    
    const {method} = props;
    const abiMethodInstance = new ABIMethod(method);

    const [
        {textEncoding},
        setState
    ] = useState(initialState);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"abi-method-signature-wrapper"}>
        <div className={"abi-method-signature-container"}>
            <div className="method-signature">
                <Alert icon={false} color={"warning"}>
                    <div className="method-sig-section">
                        <div className="method-sig-section-key">
                            Method signature :
                        </div>
                        <div className="method-sig-section-value">
                            {abiMethodInstance.getSignature()}
                        </div>
                    </div>
                    <div className="method-sig-section">
                        <div className="method-sig-section-key inline">
                            Txn count :
                        </div>
                        <div className="method-sig-section-value inline">
                            {abiMethodInstance.txnCount()}
                        </div>
                    </div>
                    <Box className="method-sig-section">
                        <div className="method-sig-section-key">
                            Method selector :
                            <ButtonGroup color={"warning"} variant="outlined" size={"small"} style={{marginLeft: 10}}>
                                <Button variant={textEncoding === TEXT_ENCODING.HEX ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.HEX)}}>HEX</Button>
                                <Button variant={textEncoding === TEXT_ENCODING.BASE64 ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.BASE64)}}>BASE64</Button>
                            </ButtonGroup>
                        </div>
                        <div className="method-sig-section-value">
                            {textEncoding === TEXT_ENCODING.HEX ? Buffer.from(abiMethodInstance.getSelector()).toString("hex") : ''}
                            {textEncoding === TEXT_ENCODING.BASE64 ? Buffer.from(abiMethodInstance.getSelector()).toString("base64") : ''}
                        </div>
                    </Box>


                </Alert>
            </div>
        </div>
    </div>);
}

export default ABIMethodSignature;
