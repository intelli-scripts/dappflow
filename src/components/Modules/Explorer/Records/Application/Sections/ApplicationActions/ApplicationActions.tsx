import './ApplicationActions.scss';
import React from "react";
import JsonViewer from "../../../../../../Common/JsonViewer/JsonViewer";



function ApplicationActions(props): JSX.Element {

    const {application} = props;

    return (<div className={"application-actions-wrapper"}>
        <div className={"application-actions-container"}>
            <JsonViewer obj={application.information} title="Application"></JsonViewer>
        </div>
    </div>);
}

export default ApplicationActions;
