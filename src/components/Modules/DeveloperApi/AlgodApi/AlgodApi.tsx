import './AlgodApi.scss';
import React, {useEffect} from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {useDispatch, useSelector} from "react-redux";
import {loadAlgodSpec} from "../../../../redux/developerApi/actions/developerApi";
import {RootState} from "../../../../redux/store";

function AlgodApi(): JSX.Element {
    const dispatch = useDispatch();


    const developerApi = useSelector((state: RootState) => state.developerApi);
    const {algodSpec} = developerApi;


    useEffect(() => {
        dispatch(loadAlgodSpec());
    }, [dispatch]);

    return (<div className={"algod-api-wrapper"}>
        <div className={"algod-api-container"}>

            {algodSpec ? <SwaggerUI spec={algodSpec} persistAuthorization={true}/> : 'Loading ...'}
        </div>
    </div>);
}

export default AlgodApi;
