import './Api.scss';
import React, {useEffect} from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {useDispatch, useSelector} from "react-redux";
import {loadSpec} from "../../redux/actions/api";
import {RootState} from "../../redux/store";

function Api(): JSX.Element {
    const dispatch = useDispatch();
    const api = useSelector((state: RootState) => state.api);
    const {spec} = api;

    useEffect(() => {
        dispatch(loadSpec());
    }, [dispatch]);

    return (<div className={"api-wrapper"}>
        <div className={"api-container"}>
            {spec ? <SwaggerUI spec={spec} persistAuthorization={true}/> : 'Loading ...'}
        </div>
    </div>);
}

export default Api;
