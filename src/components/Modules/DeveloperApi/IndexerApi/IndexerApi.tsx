import './IndexerApi.scss';
import React, {useEffect} from "react";
import SwaggerUI from "swagger-ui-react"
import {useDispatch, useSelector} from "react-redux";
import {loadIndexerSpec} from "../../../../redux/developerApi/actions/developerApi";
import {RootState} from "../../../../redux/store";

function IndexerApi(): JSX.Element {
    const dispatch = useDispatch();


    const developerApi = useSelector((state: RootState) => state.developerApi);
    const {indexerSpec} = developerApi;


    useEffect(() => {
        dispatch(loadIndexerSpec());
    }, [dispatch]);

    return (<div className={"indexer-api-wrapper"}>
        <div className={"indexer-api-container"}>

            {indexerSpec ? <SwaggerUI spec={indexerSpec} persistAuthorization={true}/> : 'Loading ...'}
        </div>
    </div>);
}

export default IndexerApi;
