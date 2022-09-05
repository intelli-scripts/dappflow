import './ABIStudio.scss';
import React, {useState} from "react";
import ABIEditor from "../ABIEditor/ABIEditor";
import ABIActions from "../ABIActions/ABIActions";
import {A_ABI} from "../../../../packages/abi/types";
import {Alert, Box, Button, Grid} from "@mui/material";

interface ABIStudioState{
    imported: boolean,
    abi: A_ABI
}

const initialState: ABIStudioState = {
    imported: false,
    abi: {methods: [], name: ""}
};

function ABIStudio(): JSX.Element {


    const [
        {imported, abi},
        setState
    ] = useState(initialState);

    return (<div className={"abi-studio-wrapper"}>
        <div className={"abi-studio-container"}>

            <div className={"abi-studio-header"}>
                <ABIActions onImport={(abi) => {
                    setState(prevState => ({...prevState, abi, imported: true}));
                }}></ABIActions>
            </div>
            <div className={"abi-studio-body"}>
                {imported ? <ABIEditor abi={abi}></ABIEditor> : <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                            <div className="abi-intro">
                                <Alert
                                    sx={{fontSize: '15px'}}
                                    color={"warning"}
                                    icon={false}>
                                    <div>
                                        <Box>
                                            Please import your ABI JSON to get started.
                                        </Box>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="question">What is ABI ?</div>
                                    <br/>
                                    <div className="answer">
                                        Algorand Application Binary Interface (ABI) [ARC0004]
                                        <br/>
                                        <br/>
                                        <div>
                                            A standard for encoding contract call transactions to invoke methods
                                            on Algorand Applications (aka "smart contracts").
                                        </div>
                                        <br/>
                                        <div>
                                            conventions for encoding method calls,
                                            including argument and return value encoding, in Algorand Application
                                            call transactions. The goal is to allow clients, such as wallets and
                                            dapp frontends, to properly encode call transactions based on a description
                                            of the interface. Further, explorers will be able to show details of
                                            these method invocations.
                                        </div>
                                        <br/>
                                        <div>
                                            You can read more about ABI on
                                            <Button
                                                style={{marginTop: '-3px'}}
                                                onClick={() => {
                                                        window.open('/arc-portal/arc/4', "");
                                                    }
                                                }
                                            >ARC0004</Button>
                                        </div>
                                    </div>
                                </Alert>
                            </div>
                        </Grid>
                    </Grid>

                </div>}
            </div>

        </div>
    </div>);
}

export default ABIStudio;
