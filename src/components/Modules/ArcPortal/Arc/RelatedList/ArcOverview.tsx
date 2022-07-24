import './ArcOverview.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ARC} from "../../../../../packages/arc-portal/classes/ARC";

function ArcOverview(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);


    return (<div className={"arc-overview-wrapper"}>
        <div className={"arc-overview-container"}>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>{arcInstance.getMarkdown()}</ReactMarkdown>

        </div>
    </div>);
}

export default ArcOverview;
