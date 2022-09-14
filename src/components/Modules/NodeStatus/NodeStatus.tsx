import './NodeStatus.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";


function NodeStatus(): JSX.Element {

    const node = useSelector((state: RootState) => state.node);
    console.log(node);

    return (<div className={"node-status-wrapper"}>
        <div className={"node-status-container"}>

            <div className={"node-status-header"}>
                <div>
                    Node status
                </div>
            </div>
            <div className={"node-status-body"}>

            </div>
        </div>
    </div>);
}

export default NodeStatus;
