import './Arc21Workspace.scss';
import React from "react";
import {
    Grid
} from "@mui/material";
import ABIEditor from "../../../../../ABI/ABIEditor/ABIEditor";

function Arc21Workspace(): JSX.Element {

    const abi = {
        "name": "ARC_0021",
        "desc": "Interface for a round based datafeed oracle",
        "methods": [
            {
                "name": "get",
                "desc": "Get data from the oracle for a specific round",
                "args": [
                    { "type": "uint64", "name": "round", "desc": "The desired round" },
                    { "type": "[]byte", "name": "user_data", "desc": "Optional: Extra data provided by the user. Pass an empty slice if not used." }
                ],
                "returns": { "type": "[]byte", "desc": "The oracle's response. If the data doesn't exist, the response is an empty slice." }
            },
            {
                "name": "must_get",
                "desc": "Get data from the oracle for a specific round. Panics if the data doesn't exist.",
                "args": [
                    { "type": "uint64", "name": "round", "desc": "The desired round" },
                    { "type": "[]byte", "name": "user_data", "desc": "Optional: Extra data provided by the user. Pass an empty slice if not used." }
                ],
                "returns": { "type": "[]byte", "desc": "The oracle's response" }
            }
        ]
    };


    return (<div className={"arc21-workspace-wrapper"}>
        <div className={"arc21-workspace-container"}>

            <div className="arc21-workspace-header">

            </div>

                <div className="arc21-workspace-body">

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                            <ABIEditor abi={abi}></ABIEditor>

                        </Grid>

                    </Grid>
                </div>
        </div>
    </div>);
}

export default Arc21Workspace;
