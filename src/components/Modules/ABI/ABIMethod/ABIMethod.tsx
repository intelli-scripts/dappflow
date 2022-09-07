import './ABIMethod.scss';
import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert, Box,
    Button,
    ButtonGroup,
    Chip,
    Grid,
    Tab,
    Tabs
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {TEXT_ENCODING} from "../../../../packages/core-sdk/constants";
import {ABIMethodParams, ABIMethod as ABIMethodSDK} from "algosdk";

type ABIMethodProps = {
    method: ABIMethodParams
};

interface ABIMethodState{
    tab: string,
    textEncoding: string
}

const initialState: ABIMethodState = {
    tab: "arguments",
    textEncoding: 'hex'
};

function ABIMethod(props: ABIMethodProps): JSX.Element {
    
    const {method} = props;
    const abiMethodInstance = new ABIMethodSDK(method);
    const args = abiMethodInstance.args;

    const [
        {tab, textEncoding},
        setState
    ] = useState(initialState);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"abi-method-wrapper"}>
        <div className={"abi-method-container"}>
            <div className="abi-method">
                <Accordion className="rounded">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <div>
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
                                    return <div className="arg" key={arg.name}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
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
        </div>
    </div>);
}

export default ABIMethod;
