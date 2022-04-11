import './Settings.scss';

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import React from "react";
import {hideSettings} from "../../redux/actions/settings";
import {CancelOutlined} from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormLabel, Grid,
    IconButton,
    InputBase, InputBaseProps, styled,
    Typography
} from "@mui/material";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';


const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    const shadedClr = pSBC(0.95, theme.palette.primary.main);
    return {
        padding: 10,
        marginTop: 5,
        background: shadedClr
    };
});

function Settings(): JSX.Element {

    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);
    const {show} = settings;


    const primaryClr = theme.palette.primary.main;


    return (<div>
        {show ? <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography variant={"subtitle1"}>Node settings</Typography>
                    </div>
                    <IconButton color="primary" onClick={() => {
                        dispatch(hideSettings());
                    }}>
                        <CancelOutlined />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="settings-wrapper">
                    <div className="settings-container">
                        <div className="settings-body">

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod url</FormLabel>
                                    <ShadedInput
                                        placeholder="http://localhost"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod port</FormLabel>
                                    <ShadedInput
                                        placeholder="4001"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Algod token</FormLabel>
                                    <ShadedInput
                                        placeholder="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>





                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer url</FormLabel>
                                    <ShadedInput
                                        placeholder="http://localhost"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer port</FormLabel>
                                    <ShadedInput
                                        placeholder="8980"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FormLabel style={{color: primaryClr}}>Indexer token</FormLabel>
                                    <ShadedInput
                                        placeholder="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                        onChange={(ev) => {

                                        }}
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div style={{textAlign: "center", marginTop: 30}}>
                                        <Button
                                            variant={"outlined"}
                                            size={"large"}
                                            color={"primary"}
                                            onClick={() => {
                                                dispatch(hideSettings());
                                            }}
                                        >Cancel</Button>

                                        <Button
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            style={{marginLeft: 15}}
                                        >Save</Button>
                                    </div>

                                </Grid>
                            </Grid>

                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog> : ''}
    </div>);
}

export default Settings;
