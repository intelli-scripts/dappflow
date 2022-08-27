import './ABIStudio.scss';
import React, {} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";



function ABIStudio(): JSX.Element {
    

    // const calcAbi = {
    //     "name": "Calculator",
    //     "desc": "Interface for a basic calculator supporting additions and multiplications",
    //     "methods": [
    //         {
    //             "name": "add",
    //             "desc": "Calculate the sum of two 64-bit integers",
    //             "args": [
    //                 { "type": "uint64", "name": "a", "desc": "The first term to add" },
    //                 { "type": "uint64", "name": "b", "desc": "The second term to add" }
    //             ],
    //             "returns": { "type": "uint128", "desc": "The sum of a and b" }
    //         },
    //         {
    //             "name": "multiply",
    //             "desc": "Calculate the product of two 64-bit integers",
    //             "args": [
    //                 { "type": "uint64", "name": "a", "desc": "The first factor to multiply" },
    //                 { "type": "uint64", "name": "b", "desc": "The second factor to multiply" }
    //             ],
    //             "returns": { "type": "uint128", "desc": "The product of a and b" }
    //         }
    //     ]
    // };

    const arc20Abi = {
        "name": "arc-0020",
        "methods": [
            {
                "name": "asset_create",
                "args": [
                    {
                        "type": "uint64",
                        "name": "total"
                    },
                    {
                        "type": "uint32",
                        "name": "decimals"
                    },
                    {
                        "type": "bool",
                        "name": "default_frozen"
                    },
                    {
                        "type": "string",
                        "name": "unit_name"
                    },
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "url"
                    },
                    {
                        "type": "byte[]",
                        "name": "metadata_hash"
                    },
                    {
                        "type": "address",
                        "name": "manager_addr"
                    },
                    {
                        "type": "address",
                        "name": "reserve_addr"
                    },
                    {
                        "type": "address",
                        "name": "freeze_addr"
                    },
                    {
                        "type": "address",
                        "name": "clawback_addr"
                    }
                ],
                "returns": {
                    "type": "uint64"
                }
            },
            {
                "name": "asset_config",
                "args": [
                    {
                        "type": "asset",
                        "name": "config_asset"
                    },
                    {
                        "type": "uint64",
                        "name": "total"
                    },
                    {
                        "type": "uint32",
                        "name": "decimals"
                    },
                    {
                        "type": "bool",
                        "name": "default_frozen"
                    },
                    {
                        "type": "string",
                        "name": "unit_name"
                    },
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "url"
                    },
                    {
                        "type": "byte[]",
                        "name": "metadata_hash"
                    },
                    {
                        "type": "address",
                        "name": "manager_addr"
                    },
                    {
                        "type": "address",
                        "name": "reserve_addr"
                    },
                    {
                        "type": "address",
                        "name": "freeze_addr"
                    },
                    {
                        "type": "address",
                        "name": "clawback_addr"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "get_asset_config",
                "readonly": true,
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    }
                ],
                "returns": {
                    "type": "(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)",
                    "desc": "`total`, `decimals`, `default_frozen`, `unit_name`, `name`, `url`, `metadata_hash`, `manager_addr`, `reserve_addr`, `freeze_addr`, `clawback`"
                }
            },
            {
                "name": "asset_transfer",
                "args": [
                    {
                        "type": "asset",
                        "name": "xfer_asset"
                    },
                    {
                        "type": "uint64",
                        "name": "asset_amount"
                    },
                    {
                        "type": "account",
                        "name": "asset_sender"
                    },
                    {
                        "type": "account",
                        "name": "asset_receiver"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "asset_freeze",
                "args": [
                    {
                        "type": "asset",
                        "name": "freeze_asset"
                    },
                    {
                        "type": "bool",
                        "name": "asset_frozen"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "account_freeze",
                "args": [
                    {
                        "type": "asset",
                        "name": "freeze_asset"
                    },
                    {
                        "type": "account",
                        "name": "freeze_account"
                    },
                    {
                        "type": "bool",
                        "name": "asset_frozen"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "get_asset_is_frozen",
                "readonly": true,
                "args": [
                    {
                        "type": "asset",
                        "name": "freeze_asset"
                    }
                ],
                "returns": {
                    "type": "bool"
                }
            },
            {
                "name": "get_account_is_frozen",
                "readonly": true,
                "args": [
                    {
                        "type": "asset",
                        "name": "freeze_asset"
                    },
                    {
                        "type": "account",
                        "name": "freeze_account"
                    }
                ],
                "returns": {
                    "type": "bool"
                }
            },
            {
                "name": "asset_destroy",
                "args": [
                    {
                        "type": "asset",
                        "name": "destroy_asset"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "get_circulating_supply",
                "readonly": true,
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    }
                ],
                "returns": {
                    "type": "uint64"
                }
            }
        ]
    };

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>

            <div className={"abi-studio-body"}>
                <ABIEditor abi={arc20Abi}></ABIEditor>
            </div>

        </div>
    </div>);
}

export default ABIStudio;
