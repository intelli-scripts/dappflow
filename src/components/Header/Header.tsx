import './Header.scss';
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Grid, Tab, Tabs, Tooltip} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {useDispatch} from "react-redux";
import {showSettings} from "../../redux/actions/settings";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import Search from "../Search/Search";

function Header(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    let route: string | boolean = location.pathname;
    route = route.substring(1);

    const routes = ["", "accounts", "transactions", "assets", "applications", "developer-api"];
    if (routes.indexOf(route) === -1) {
        route = false;
    }

    return (<div className={"header-wrapper"}>
        <div className={"header-container"}>
            <div className="logo" onClick={() => {
                navigate('/');
            }}>
                <DeveloperBoardIcon fontSize={"medium"}></DeveloperBoardIcon>
                Dappflow
            </div>
            <div>

                <div style={{marginTop: 10, marginBottom: 5}}>
                    <Search></Search>
                </div>

                <Grid container>
                    <Tabs value={route}>
                        <Tab label="Home" value="" onClick={() => {
                            navigate('/');
                        }}/>
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
                        <Tab label="Developer API" value="developer-api" onClick={() => {
                            navigate('/developer-api');
                        }}/>
                    </Tabs>
                    <Tooltip title="Node settings">
                        <SettingsIcon className="settings-icon" fontSize={"medium"}  color={"primary"} onClick={() => {
                            dispatch(showSettings());
                        }}></SettingsIcon>
                    </Tooltip>
                </Grid>












            </div>


        </div>
    </div>);
}

export default Header;
