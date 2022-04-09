import './Header.scss';
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Grid, Tab, Tabs} from "@mui/material";

function Header(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    let route = location.pathname;
    route = route.substring(1);

    console.log();

    return (<div className={"header-wrapper"}>
        <div className={"header-container"}>
            <div className="logo" onClick={() => {
                navigate('/');
            }}>Dappflow</div>
            <div>
                <Grid container>
                    <Tabs value={route}>
                        <Tab label="Accounts" value="accounts" onClick={() => {
                            navigate('/accounts');
                        }}/>
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/transactions');
                        }}/>
                        <Tab label="Assets" value="assets" onClick={() => {
                            navigate('/assets');
                        }}/>
                        <Tab label="Applications" value="applications" onClick={() => {
                            navigate('/applications');
                        }}/>
                    </Tabs>
                </Grid>
            </div>
        </div>
    </div>);
}

export default Header;
