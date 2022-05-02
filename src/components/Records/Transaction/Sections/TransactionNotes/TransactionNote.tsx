import './TransactionNote.scss';
import React, {useState} from "react";
import {Button, ButtonGroup, Grid} from "@mui/material";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {NOTE_ENCRYPTIONS} from "../../../../../packages/core-sdk/constants";

interface TransactionNoteState{
    noteEncryption: string,
}
const initialState: TransactionNoteState = {
    noteEncryption: NOTE_ENCRYPTIONS.BASE64
};

function TransactionNote(props): JSX.Element {

    const {transaction} = props;
    const txnInstance = new CoreTransaction(transaction);

    const [
        {noteEncryption},
        setState
    ] = useState(initialState);

    function setNoteEncryption(encryption: string) {
        setState(prevState => ({...prevState, noteEncryption: encryption}));
    }

    return (<div className={"transaction-note-wrapper"}>
        <div className={"transaction-note-container"}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="property">
                        <div className="key">
                            Note
                            <ButtonGroup variant="outlined" size={"small"} style={{marginLeft: 20}}>
                                <Button variant={noteEncryption === NOTE_ENCRYPTIONS.TEXT ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.TEXT)}}>Text</Button>
                                <Button variant={noteEncryption === NOTE_ENCRYPTIONS.BASE64 ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.BASE64)}}>Base 64</Button>
                                <Button variant={noteEncryption === NOTE_ENCRYPTIONS.MSG_PACK ? 'contained' : 'outlined'} onClick={() => {setNoteEncryption(NOTE_ENCRYPTIONS.MSG_PACK)}}>Message pack</Button>
                            </ButtonGroup>

                        </div>
                        <div className="value small">
                            <div style={{marginTop: 30}}>
                                {txnInstance.getNote(noteEncryption)}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>
    </div>);
}

export default TransactionNote;
