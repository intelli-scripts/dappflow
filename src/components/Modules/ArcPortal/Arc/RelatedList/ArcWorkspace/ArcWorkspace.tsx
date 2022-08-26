import './ArcWorkspace.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import {ARC} from "../../../../../../packages/arc-portal/classes/ARC";
import Arc3Workspace from "./Arc3/Arc3Workspace";
import Arc69Workspace from "./Arc69/Arc69Workspace";
import Arc19Workspace from "./Arc19/Arc19Workspace";

function ArcWorkspace(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);

    return (<div className={"arc-workspace-wrapper"}>
        <div className={"arc-workspace-container"}>


            {arcInstance.getId() === 3 ? <Arc3Workspace></Arc3Workspace> : ''}
            {arcInstance.getId() === 69 ? <Arc69Workspace></Arc69Workspace> : ''}
            {arcInstance.getId() === 19 ? <Arc19Workspace></Arc19Workspace> : ''}

        </div>
    </div>);
}

export default ArcWorkspace;
