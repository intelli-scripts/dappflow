import './Api.scss';
import React from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

function Api(): JSX.Element {
    return (<div className={"api-wrapper"}>
        <div className={"api-container"}>
            <SwaggerUI url="http://localhost:4001/swagger.json"/>
        </div>
    </div>);
}

export default Api;
