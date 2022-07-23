import './CustomError.scss';
import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import {Alert} from "@mui/lab";
import {showSettings} from "../../../../../redux/actions/settings";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


function CustomError(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<div className={"custom-error-wrapper"}>
        <div className={"custom-error-container"}>


            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="info">
                        <Typography variant={"h4"}>Something went wrong !</Typography>
                        <Alert icon={false} color={"warning"} style={{marginTop: 20, borderRadius: 10}}>One probable reason could be, you have connected to incorrect node. Please check your node settings.</Alert>
                    </div>

                    <div className="actions">
                        <Button color={"primary"} size={"medium"} variant={"outlined"} onClick={() => {
                            navigate('/explorer');
                        }}>Home</Button>
                        <Button color={"primary"} size={"medium"} variant={"outlined"} style={{marginLeft: 10}}
                        onClick={() => {
                            dispatch(showSettings());
                        }}
                        >Node Settings</Button>
                    </div>

                </Grid>
            </Grid>


        </div>
    </div>);
}

export default CustomError;
