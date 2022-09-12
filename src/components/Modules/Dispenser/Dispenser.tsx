import './Dispenser.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";
import {Alert, Button, Grid} from "@mui/material";
import {CoreNode} from "../../../packages/core-sdk/classes/CoreNode";

function Dispenser(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    const {loadingVersions, versionsCheck} = node;
    const isSandbox = new CoreNode().isSandbox(versionsCheck);
    const dispenerLinks = new CoreNode().getDispenserLinks(versionsCheck);


    return (<div className={"dispenser-wrapper"}>
        <div className={"dispenser-container"}>

            {loadingVersions ? <div>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <LoadingTile></LoadingTile>
                    </Grid>
                </Grid>
            </div> : <div>
                {isSandbox ? '' : <div>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Alert icon={false} color={"warning"}>
                                Dispenser is available only for sandbox environment.
                                <br/>
                                {dispenerLinks.length > 0 ? 'Please try below dispensers by community.' : ''}

                            </Alert>
                            {dispenerLinks.map((link, index) => {
                                return <Button color={"warning"} variant={"outlined"} sx={{marginTop: '15px', marginLeft: '10px'}} onClick={() => {
                                window.open(link, "_blank")
                                }
                                }>
                                    Dispenser {index + 1}
                                </Button>
                            })}
                        </Grid>
                    </Grid>

                </div>}
            </div>}


        </div>
    </div>);
}

export default Dispenser;
