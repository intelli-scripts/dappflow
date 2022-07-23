import './Header.scss';
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Grid, Tab, Tabs} from "@mui/material";
import Search from "../Search/Search";


function Header(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    let route: string | boolean = location.pathname;
    route = route.substring(1);
    route = route.split('/')[1];

    const routes = ["home", "accounts", "transactions", "assets", "applications"];
    if (routes.indexOf(route) === -1) {
        route = false;
    }

    return (<div className={"header-wrapper"}>
        <div className={"header-container"}>


            <div>
                <Grid container>
                    <Tabs value={route} style={{marginLeft: -20}}>
                        <Tab label="Home" value="home" onClick={() => {
                            navigate('/explorer/home');
                        }}/>
                        <Tab label="Accounts" value="accounts" onClick={() => {
                            navigate('/explorer/accounts');
                        }}/>
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/explorer/transactions');
                        }}/>
                        <Tab label="Assets" value="assets" onClick={() => {
                            navigate('/explorer/assets');
                        }}/>
                        <Tab label="Applications" value="applications" onClick={() => {
                            navigate('/explorer/applications');
                        }}/>
                    </Tabs>
                </Grid>
            </div>

            <div style={{minWidth: 500, marginTop: -10}}>
                <Search></Search>
            </div>


        </div>
    </div>);
}

export default Header;
