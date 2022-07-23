import './LiveTransactions.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {shadedClr} from "../../../../utils/common";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {CoreTransaction} from "../../../../packages/core-sdk/classes/CoreTransaction";
import LinkToTransaction from "../Common/Links/LinkToTransaction";
import LinkToAccount from "../Common/Links/LinkToAccount";
import {TXN_TYPES} from "../../../../packages/core-sdk/constants";
import LinkToApplication from "../Common/Links/LinkToApplication";
import {Box} from "@mui/material";


function LiveTransactions(): JSX.Element {
    const liveData = useSelector((state: RootState) => state.liveData);
    const {transactions} = liveData;

    return (<div className={"live-transactions-wrapper"}>
        <div className={"live-transactions-container"}>
            <div className={"live-transactions-header"}>

                <Box sx={{ color: 'primary.main'}}>
                    Latest Transactions
                </Box>
            </div>
            <div className={"live-transactions-body"}>
                <TransitionGroup component="div">
                    {transactions.map((transaction) => {
                        const txnInstance = new CoreTransaction(transaction);

                        const to = txnInstance.getTo();
                        const type = txnInstance.getType();
                        const appId = txnInstance.getAppId();

                        return <CSSTransition key={txnInstance.getId()} timeout={700} classNames="item">
                            <div className="transaction" key={txnInstance.getId()} style={{background: shadedClr}}>
                                <div className="basic">
                                    <div>
                                        ID : <LinkToTransaction strip={25} id={txnInstance.getId()}></LinkToTransaction>
                                    </div>
                                    <div className="sub-text">
                                        From : <LinkToAccount strip={25} address={txnInstance.getFrom()}></LinkToAccount>
                                    </div>
                                    {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <div className="sub-text">
                                        To : <LinkToAccount strip={25} address={to}></LinkToAccount>
                                    </div> : ''}
                                    {type === TXN_TYPES.APP_CALL ? <div className="sub-text">
                                        To : <LinkToApplication id={appId} name={'Application: ' + appId}></LinkToApplication>
                                    </div> : ''}

                                </div>
                                <div className="txn-type">
                                    <Box sx={{ color: 'primary.main'}}>
                                        {txnInstance.getTypeDisplayValue()}
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

export default LiveTransactions;
