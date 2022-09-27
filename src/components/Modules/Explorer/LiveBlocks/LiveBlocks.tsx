import './LiveBlocks.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {shadedClr} from "../../../../utils/common";
import LinkToBlock from "../Common/Links/LinkToBlock";
import {CoreBlock} from "../../../../packages/core-sdk/classes/core/CoreBlock";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {Box} from "@mui/material";


function LiveBlocks(): JSX.Element {
    const liveData = useSelector((state: RootState) => state.liveData);
    const {blocks} = liveData;

    return (<div className={"live-blocks-wrapper"}>
        <div className={"live-blocks-container"}>
            <div className={"live-blocks-header"}>
                <Box sx={{ color: 'primary.main'}}>
                    Latest Blocks
                </Box>

            </div>
            <div className={"live-blocks-body"}>
                <TransitionGroup component="div">
                    {blocks.map((block) => {
                        const blockInstance = new CoreBlock(block);

                        return <CSSTransition key={blockInstance.getRound()} timeout={700} classNames="item">
                            <div className="block" key={blockInstance.getRound()} style={{background: shadedClr}}>
                                <div className="round">
                                    <LinkToBlock name={'#' + blockInstance.getRound()} id={blockInstance.getRound()}></LinkToBlock>
                                    <div className="sub-text">
                                        {blockInstance.getTransactionsTypesCount()}
                                    </div>
                                    <div className="sub-text">
                                        {blockInstance.getTimestampDuration()} ago
                                    </div>
                                </div>
                                <div className="txn-count">
                                    <Box sx={{ color: 'primary.main'}}>
                                        {block.transactions.length} Transactions
                                    </Box>
                                </div>

                            </div>
                        </CSSTransition>;
                    })}
                </TransitionGroup>

            </div>
        </div>
    </div>);
}

export default LiveBlocks;
