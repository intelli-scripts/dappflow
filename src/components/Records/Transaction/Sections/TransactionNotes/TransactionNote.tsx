import './TransactionNote.scss';
import React, {useState} from "react";
import {Button, ButtonGroup, Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {TEXT_ENCODING} from "../../../../../packages/core-sdk/constants";
import {shadedClr} from "../../../../../utils/common";

interface TransactionNoteState{
    textEncoding: string,
}
const initialState: TransactionNoteState = {
    textEncoding: TEXT_ENCODING.BASE64
};

function TransactionNote(props): JSX.Element {

    const {transaction} = props;
    const txnInstance = new CoreTransaction(transaction);

    const [
        {textEncoding},
        setState
    ] = useState(initialState);

    function setTextEncoding(encoding: string) {
        setState(prevState => ({...prevState, textEncoding: encoding}));
    }

    return (<div className={"transaction-note-wrapper"}>
        <div className={"transaction-note-container"}>

            {txnInstance.getNote() ? <div className="props" style={{background: shadedClr}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="property">
                            <div className="key">
                                Note
                                <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                                    <Button variant={textEncoding === TEXT_ENCODING.TEXT ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.TEXT)}}>Text</Button>
                                    <Button variant={textEncoding === TEXT_ENCODING.BASE64 ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.BASE64)}}>Base 64</Button>
                                    <Button variant={textEncoding === TEXT_ENCODING.MSG_PACK ? 'contained' : 'outlined'} onClick={() => {setTextEncoding(TEXT_ENCODING.MSG_PACK)}}>Message pack</Button>
                                </ButtonGroup>

                            </div>
                            <div className="value small">
                                <div style={{marginTop: 30}}>
                                    {txnInstance.getNote(textEncoding)}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div> : ''}



        </div>
    </div>);
}

export default TransactionNote;
