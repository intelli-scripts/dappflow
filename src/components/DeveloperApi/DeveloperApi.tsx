import './DeveloperApi.scss';
import React, {useEffect} from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {useDispatch, useSelector} from "react-redux";
import {loadIndexerSpec} from "../../redux/actions/developerApi";
import {RootState} from "../../redux/store";

function DeveloperApi(): JSX.Element {
    const dispatch = useDispatch();
    const developerApi = useSelector((state: RootState) => state.developerApi);
    const {indexerSpec} = developerApi;

    useEffect(() => {
        dispatch(loadIndexerSpec());
    }, [dispatch]);

    return (<div className={"developer-api-wrapper"}>
        <div className={"developer-api-container"}>
            {indexerSpec ? <SwaggerUI spec={indexerSpec} persistAuthorization={true}/> : 'Loading ...'}
        </div>
    </div>);
}

export default DeveloperApi;
