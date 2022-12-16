import './ArcOverview.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

function ArcOverview(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);

    return (<div className={"arc-overview-wrapper"}>
        <div className={"arc-overview-container"}>


            <div className="markdown-body">
                <div dangerouslySetInnerHTML={{__html: arc.information.markdown}} />
            </div>

        </div>
    </div>);
}

export default ArcOverview;
