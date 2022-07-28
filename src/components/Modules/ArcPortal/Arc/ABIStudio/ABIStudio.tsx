import './ABIStudio.scss';
import React, {} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";



function ABIStudio(): JSX.Element {
    

    const test = {
        "name": "Calculator",
        "desc": "Interface for a basic calculator supporting additions and multiplications",
        "methods": [
            {
                "name": "add",
                "desc": "Calculate the sum of two 64-bit integers",
                "args": [
                    { "type": "uint64", "name": "a", "desc": "The first term to add" },
                    { "type": "uint64", "name": "b", "desc": "The second term to add" }
                ],
                "returns": { "type": "uint128", "desc": "The sum of a and b" }
            },
            {
                "name": "multiply",
                "desc": "Calculate the product of two 64-bit integers",
                "args": [
                    { "type": "uint64", "name": "a", "desc": "The first factor to multiply" },
                    { "type": "uint64", "name": "b", "desc": "The second factor to multiply" }
                ],
                "returns": { "type": "uint128", "desc": "The product of a and b" }
            }
        ]
    };

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>

            <div className={"abi-studio-header"}>
                <div className={"abi-studio-title"}>
                    ABI Studio
                </div>
                <div className={"abi-studio-body"}>
                    <ABIEditor payload={test}></ABIEditor>
                </div>
            </div>

        </div>
    </div>);
}

export default ABIStudio;
