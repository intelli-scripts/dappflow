import './ArcWorkspace.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import {ARC} from "../../../../../../packages/arc-portal/classes/ARC";
import Arc3Workspace from "../../Arc3/Arc3Workspace";
import Arc4Workspace from "../../Arc4/Arc4Workspace";

function ArcWorkspace(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);

    return (<div className={"arc-workspace-wrapper"}>
        <div className={"arc-workspace-container"}>


            {arcInstance.getId() === 3 ? <Arc3Workspace></Arc3Workspace> : ''}
            {arcInstance.getId() === 4 ? <Arc4Workspace></Arc4Workspace> : ''}

        </div>
    </div>);
}

export default ArcWorkspace;
