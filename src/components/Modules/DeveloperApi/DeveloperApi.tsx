import './DeveloperApi.scss';
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadIndexerSpec} from "../../../redux/developerApi/actions/developerApi";
import {Tab, Tabs} from "@mui/material";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "swagger-ui-react/swagger-ui.css"
import "../../../assets/swagger-theme.scss";

function DeveloperApi(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    let route: string = location.pathname;
    route = route.substring(1);
    route = route.split('/')[1];

    useEffect(() => {
        dispatch(loadIndexerSpec());
    }, [dispatch]);

    return (<div className={"developer-api-wrapper"}>
        <div className={"developer-api-container"}>

            <div className={"developer-api-header"}>
                <div>
                    Developer API
                </div>
            </div>

            <Tabs value={route}
                  TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}}
                  className="tabs-wrapper"
                  >
                <Tab label="Indexer API" value="indexer" onClick={() => {
                    navigate('/developer-api/indexer');
                }}/>
                <Tab label="Algod API" value="algod" onClick={() => {
                    navigate('/developer-api/algod');
                }}/>
            </Tabs>



            <Outlet/>
        </div>
    </div>);
}

export default DeveloperApi;
