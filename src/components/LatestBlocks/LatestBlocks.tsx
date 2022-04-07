import './LatestBlocks.scss';
import React, {useEffect} from "react";
import {getLatestBlocks} from "../../utils/core";

function LatestBlocks(): JSX.Element {

    useEffect(() => {
        getLatestBlocks();
    }, []);

    return (<div className={"latest-blocks-wrapper"}>
        <div className={"latest-blocks-container"}>
            Latest Blocks
        </div>
    </div>);
}

export default LatestBlocks;
