import './AppCallTxnInnerTxns.scss';
import React from "react";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig} from "../../../../../../../theme/styles/datagrid";
import {A_SearchTransaction, A_SearchTransactionInner} from "../../../../../../../packages/core-sdk/types";
import {CoreTransaction} from "../../../../../../../packages/core-sdk/classes/CoreTransaction";
import LinkToAccount from "../../../../../../Common/Links/LinkToAccount";
import {TXN_TYPES} from "../../../../../../../packages/core-sdk/constants";
import LinkToApplication from "../../../../../../Common/Links/LinkToApplication";
import LinkToInnerTransaction from "../../../../../../Common/Links/LinkToInnerTransaction";
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import {ArrowForward} from "@mui/icons-material";

function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
        >
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

const StyledTreeItem = styled((props: any) => {

    const {
        txn,
        nodeId,
        parentTxnId
    } = props;

    console.log(txn);
    const txnInstance = new CoreTransaction(txn);

    const to = txnInstance.getTo();
    const type = txnInstance.getType();
    const appId = txnInstance.getAppId();

    return <TreeItem {...props} label={<div style={{padding: 25}} className="txn-row">
        <span className="item">
        <LinkToInnerTransaction id={parentTxnId} index={nodeId} name={txnInstance.getTypeDisplayValue()}></LinkToInnerTransaction>
        </span>
        <span className="item"><LinkToAccount address={txnInstance.getFrom()} strip={30}></LinkToAccount></span>
        <span className="item">
            <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward>
            {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <span>
                <LinkToAccount address={to} strip={30}></LinkToAccount>
            </span> : ''}

            {type === TXN_TYPES.APP_CALL ? <span>
                <LinkToApplication id={appId} name={'Application: ' + appId}></LinkToApplication>
            </span> : ''}
        </span>

    </div>}/>;
    }

)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));


function AppCallTxnInnerTxns(props): JSX.Element {

    let transaction: A_SearchTransaction = props.transaction;

    console.log(transaction);
    let counter = -2;

    const renderTree = (txn) => {
        const innerTxns = txn['inner-txns'];
        counter++

        return <StyledTreeItem parentTxnId={transaction.id} nodeId={counter.toString()} txn={txn} key={counter}>
            {Array.isArray(innerTxns) ? innerTxns.map((innerTxn) => renderTree(innerTxn)) : null}
        </StyledTreeItem>
    };

    return (<div className={"app-call-txn-inner-txns-wrapper"}>
        <div className={"app-call-txn-inner-txns-container"}>
            <div className="app-call-txn-inner-txns-header">
                Inner transactions
            </div>
            <div className="app-call-txn-inner-txns-body">

                <TreeView
                    defaultExpanded={['-1']}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                >

                    {renderTree(transaction)}
                </TreeView>

            </div>
        </div>
    </div>);
}

export default AppCallTxnInnerTxns;
