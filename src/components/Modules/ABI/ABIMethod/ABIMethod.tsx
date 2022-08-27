import './ABIMethod.scss';
import React, {useState} from "react";
import {A_ABI_Method} from "../../../../packages/abi/types";
import {ABIMethod as ABIMethodCls} from "../../../../packages/abi/classes/ABIMethod";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Tab, Tabs} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {ABIMethodArg} from "../../../../packages/abi/classes/ABIMethodArg";

type ABIMethodProps = {
    method: A_ABI_Method
};

interface ABIMethodState{
    tab: string
}

const initialState: ABIMethodState = {
    tab: "arguments"
};

function ABIMethod(props: ABIMethodProps): JSX.Element {
    
    const {method} = props;
    const abiMethodInstance = new ABIMethodCls(method);
    const args = abiMethodInstance.getArgs();

    const [
        {tab},
        setState
    ] = useState(initialState);

    return (<div className={"abi-method-wrapper"}>
        <div className={"abi-method-container"}>
            <div className="abi-method">
                <Accordion className="rounded">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <div>
                            <span className="method-name">
                                {abiMethodInstance.getName()}
                            </span>
                            <span className="method-desc">
                                {abiMethodInstance.getDesc()}
                            </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>

                        <div className="method-body">
                            <Tabs value={tab} className="method-tabs" onChange={(_, newVal) => {
                                setState(prevState => ({...prevState, tab: newVal}));
                            }}>
                                <Tab label="Arguments" value="arguments"/>
                            </Tabs>

                            <div className="arguments">
                                <div className="arguments-header">
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
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
                                    const argInstance = new ABIMethodArg(arg);

                                    return <div className="arg">
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                                <div className="arg-prop">{argInstance.getName()}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                                                <div className="arg-prop">{argInstance.getType()}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={6} lg={6} xl={6}>
                                                <div className="arg-prop">{argInstance.getDesc()}</div>
                                            </Grid>
                                        </Grid>



                                    </div>;
                                })}
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    </div>);
}

export default ABIMethod;
