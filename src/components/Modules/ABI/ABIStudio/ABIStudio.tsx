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
        "name": "Smart ASA ref. implementation",
        "networks": {
            "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=": { "appID": 1234 },
            "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=": { "appID": 107042851 },
        },
        "methods": [
            {
                "name": "asset_app_optin",
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    },
                    {
                        "type": "axfer",
                        "name": "underlying_asa_optin"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
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
                "name": "asset_app_closeout",
                "args": [
                    {
                        "type": "asset",
                        "name": "close_asset"
                    },
                    {
                        "type": "account",
                        "name": "close_to"
                    }
                ],
                "returns": {
                    "type": "void"
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
                "name": "get_asset_is_frozen",
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
                "name": "get_circulating_supply",
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    }
                ],
                "returns": {
                    "type": "uint64"
                }
            },
            {
                "name": "get_optin_min_balance",
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    }
                ],
                "returns": {
                    "type": "uint64"
                }
            },
            {
                "name": "get_asset_config",
                "args": [
                    {
                        "type": "asset",
                        "name": "asset"
                    }
                ],
                "returns": {
                    "type": "(uint64,uint32,bool,string,string,string,byte[],address,address,address,address)"
                }
            }
        ]
    };

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>

            <div className={"abi-studio-header"}>

            </div>
            <div className={"abi-studio-body"}>
                <ABIEditor abi={arc20Abi}></ABIEditor>
            </div>

        </div>
    </div>);
}

export default ABIStudio;
