import './ArcOverview.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {ARC} from "../../../../../packages/arc-portal/classes/ARC";
import MuiMarkdown from 'mui-markdown';

function ArcOverview(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);



    return (<div className={"arc-overview-wrapper"}>
        <div className={"arc-overview-container"}>
            <MuiMarkdown
                options={{forceBlock: true}}
                >{arcInstance.getMarkdown()}</MuiMarkdown>;
        </div>
    </div>);
}

export default ArcOverview;
