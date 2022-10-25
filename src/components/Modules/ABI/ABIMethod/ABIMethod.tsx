import './ABIMethod.scss';
import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button,
    Chip,
    Grid,
    Tab,
    Tabs
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {ABIMethodParams, ABIMethod as ABIMethodSDK} from "algosdk";
import ABIMethodSignature from "../ABIMethodSignature/ABIMethodSignature";
import ABIMethodExecutor from "../ABIMethodExecutor/ABIMethodExecutor";

type ABIMethodProps = {
    method: ABIMethodParams
};

interface ABIMethodState{
    tab: string,
    showExecutor: boolean
}

const initialState: ABIMethodState = {
    tab: "arguments",
    showExecutor: false
};

function ABIMethod(props: ABIMethodProps): JSX.Element {
    
    const {method} = props;
    const abiMethodInstance = new ABIMethodSDK(method);
    const args = abiMethodInstance.args;

    const [
        {tab, showExecutor},
        setState
    ] = useState(initialState);

    return (<div className={"abi-method-wrapper"}>
        <div className={"abi-method-container"}>
            <div className="abi-method">
                <Accordion className="rounded">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <div>
                            <span className="method-exec">
                                <Button onClick={(ev) => {
                                    setState(prevState => ({...prevState, showExecutor: true}));
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                }} color={"primary"} variant={"outlined"} size={"small"}>Execute</Button>
                            </span>
                            <span className="method-name">
                                {abiMethodInstance.name}
                            </span>
                            <span className="method-desc">
                                {abiMethodInstance.description}
                            </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>

                        <div className="method-body">
                            <ABIMethodSignature method={method}></ABIMethodSignature>
                            <Tabs TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}} value={tab} className="method-tabs" onChange={(_, newVal) => {
                                setState(prevState => ({...prevState, tab: newVal}));
                            }}>
                                <Tab label="Arguments" value="arguments"/>
                            </Tabs>

                            <div className="arguments">
                                <div className="arguments-header">
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            Name
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                            Type
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
                                            Description
                                        </Grid>
                                    </Grid>
                                </div>


                                {args.map((arg) => {
                                    return <div className="arg" key={arg.name}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                                <div className="arg-prop">{arg.name}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                                <div className="arg-prop">{arg.type.toString()}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
                                                <div className="arg-prop">{arg.description}</div>
                                            </Grid>
                                        </Grid>
                                    </div>;
                                })}

                                <div className="method-returns">
                                    <Chip color={"primary"} label={"Returns: " + abiMethodInstance.returns.type} variant={"outlined"}></Chip>
                                    <div className="method-returns-desc">
                                        {abiMethodInstance.returns.description}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </div>
            <ABIMethodExecutor show={showExecutor} method={method} handleClose={() => {
                setState(prevState => ({...prevState, showExecutor: false}));
            }}></ABIMethodExecutor>
        </div>
    </div>);
}

export default ABIMethod;
