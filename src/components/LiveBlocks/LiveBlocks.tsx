import './LiveBlocks.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {shadedClr} from "../../utils/common";
import LinkToBlock from "../Common/Links/LinkToBlock";


function LiveBlocks(): JSX.Element {
    const liveData = useSelector((state: RootState) => state.liveData);
    const {blocks} = liveData;
    const containerRef = React.useRef(null);

    return (<div className={"live-blocks-wrapper"}>
        <div className={"live-blocks-container"}>
            <div className={"live-blocks-header"}>
                Latest Blocks
            </div>
            <div className={"live-blocks-body"} ref={containerRef}>
                {blocks.map((block) => {
                    return <div className="block" key={block.round} style={{background: shadedClr}}>
                        <div className="round">
                            <LinkToBlock name={'#' + block.round.toString()} id={block.round}></LinkToBlock>
                        </div>
                        <div className="txn-count">
                            {block.transactions.length} Transactions
                        </div>
                    </div>;
                })}
            </div>
        </div>
    </div>);
}

export default LiveBlocks;
