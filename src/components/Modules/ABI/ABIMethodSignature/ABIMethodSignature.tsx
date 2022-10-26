import './ABIMethodSignature.scss';
import React, {useState} from "react";
import {
    Alert, Box,
    Button,
    ButtonGroup
} from "@mui/material";
import {TEXT_ENCODING} from "../../../../packages/core-sdk/constants";
import {ABIMethodParams, ABIMethod} from "algosdk";

type colorType = "warning" | "error" | "success" | "info";

type ABIMethodProps = {
    method: ABIMethodParams,
    sx?: any,
    color?: colorType
    fields?: string[]
};

interface ABIMethodSignatureState{
    textEncoding: string
}

const initialState: ABIMethodSignatureState = {
    textEncoding: 'hex'
};

function ABIMethodSignature({method, sx = {}, fields = ['sig','count','selector'], color = "warning"} : ABIMethodProps): JSX.Element {

    const abiMethodInstance = new ABIMethod(method);

    const [
        {textEncoding},
        setState
    ] = useState(initialState);

    console.log(fields);
    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"abi-method-signature-wrapper"}>
        <div className={"abi-method-signature-container"}>
            <div className="method-signature">
                <Alert icon={false} color={color} sx={{...sx}}>
                    {fields.indexOf('sig') === -1 ? '' : <div className="method-sig-section">
                        <div className="method-sig-section-key">
                            Method signature :
                        </div>
                        <div className="method-sig-section-value break">
                            {abiMethodInstance.getSignature()}
                        </div>
                    </div>}


                    {fields.indexOf('count') === -1 ? '' : <div className="method-sig-section">
                        <div className="method-sig-section-key">
                            Txn count : {abiMethodInstance.txnCount()}
                        </div>
                    </div>}

                    {fields.indexOf('selector') === -1 ? '' : <Box className="method-sig-section">
                        <div className="method-sig-section-key">
                            Method selector :
                            <ButtonGroup color={color} variant="outlined" size={"small"} style={{marginLeft: 10}}>
                                <Button className="black-button" variant={textEncoding === TEXT_ENCODING.HEX ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.HEX)}}>HEX</Button>
                                <Button className="black-button" variant={textEncoding === TEXT_ENCODING.BASE64 ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.BASE64)}}>BASE64</Button>
                            </ButtonGroup>
                        </div>
                        <div className="method-sig-section-value">
                            {textEncoding === TEXT_ENCODING.HEX ? Buffer.from(abiMethodInstance.getSelector()).toString("hex") : ''}
                            {textEncoding === TEXT_ENCODING.BASE64 ? Buffer.from(abiMethodInstance.getSelector()).toString("base64") : ''}
                        </div>
                    </Box>}




                </Alert>
            </div>
        </div>
    </div>);
}

export default ABIMethodSignature;
