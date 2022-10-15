import './TransactionsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    CircularProgress,
    Pagination,
    Tooltip
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {
    DataGrid,
    GridColDef, gridPageCountSelector,
    gridPageSelector,
    GridValueGetterParams,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../../../../utils/common";
import AlgoIcon from "../../AlgoIcon/AlgoIcon";
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/core/CoreTransaction";
import {TXN_TYPES} from "../../../../../packages/core-sdk/constants";
import {ArrowForward} from "@mui/icons-material";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToApplication from "../../Common/Links/LinkToApplication";
import LinkToTransaction from "../../Common/Links/LinkToTransaction";
import LinkToBlock from "../../Common/Links/LinkToBlock";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {A_SearchTransaction} from "../../../../../packages/core-sdk/types";
import LinkToGroup from "../../Common/Links/LinkToGroup";
import {Alert} from "@mui/lab";

interface TransactionsListProps {
    transactions: A_SearchTransaction[];
    loading?: boolean;
    reachedLastPage?: Function,
    fields?: string[],
    record?: string,
    recordId?: string
}


function TransactionsList({transactions = [], loading = false, reachedLastPage = () => {}, fields = ['id', 'block', 'age', 'from', 'to', 'amount', 'fee', 'type'], record = '', recordId = ''}: TransactionsListProps): JSX.Element {
    const dispatch = useDispatch();

    function CustomPagination({loading}) {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {loading ? <div style={{marginTop: 5, marginRight: 20}}><CircularProgress size={25}></CircularProgress></div> : ''}
                <Pagination
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    count={pageCount}
                    page={page + 1}
                    onChange={(event, value) => {
                        if (value === apiRef.current.state.pagination.pageCount) {
                            reachedLastPage();
                        }
                        return apiRef.current.setPage(value - 1);
                    }}
                />
            </div>

        );
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'id',
            headerName: 'Txn ID',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);
                const txnId = txnInstance.getId();
                const groupId = txnInstance.getGroup();
                const showGroupIcon = groupId && record !== 'group';

                return <div className="cell-content">
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, txnId, 'Txn ID copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    {showGroupIcon ? <span className="group-txn-icon"><LinkToGroup id={groupId} blockId={txnInstance.getBlock()} icon={true}></LinkToGroup></span> : ''}
                    <LinkToTransaction id={txnId}></LinkToTransaction>

                </div>;
            }
        }
    ];

    if (fields.indexOf('block') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'confirmed-round',
            headerName: 'Block',
            flex: 0.8,
            renderCell: (params: GridValueGetterParams) => {
                const block = new CoreTransaction(params.row).getBlock();
                return <div className="cell-content">
                    <LinkToBlock id={block}></LinkToBlock>
                </div>;
            }
        });
    }
    if (fields.indexOf('age') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'age',
            headerName: 'Age',
            flex: 1.5,
            renderCell: (params: GridValueGetterParams) => {
                const age = new CoreTransaction(params.row).getTimestampDuration();
                return <div className="cell-content">
                    {age} ago
                </div>;
            }
        });
    }
    if (fields.indexOf('from') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const from = new CoreTransaction(params.row).getFrom();
                let showLink = true;
                if (record === 'account' && recordId === from) {
                    showLink = false;
                }

                return <div className="cell-content">
                    {showLink ? <LinkToAccount address={from}></LinkToAccount> : from}
                </div>;
            }
        });
    }
    if (fields.indexOf('to') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);

                const to = txnInstance.getTo();
                const type = txnInstance.getType();
                const appId = txnInstance.getAppId();

                let showLink = true;
                let showArrow = true;
                let inTxn = false;
                if (record === 'account') {
                    showArrow = false;
                    if (recordId === to) {
                        showLink = false;
                        inTxn = true;
                    }
                }


                return <div className="cell-content">
                    {showArrow ? <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward> : <span>
                        <Alert color={inTxn ? 'success' : 'warning'} icon={false} className="mini-alert">
                            {inTxn ? 'IN' : 'OUT'}
                        </Alert>
                        {/*<Chip sx={{borderRadius: '3px', marginRight: '5px', fontSize: '10px'}} color={inTxn ? 'success' : 'warning'} variant={"outlined"} label={inTxn ? 'IN' : 'OUT'} size={"small"}></Chip>*/}
                    </span>}
                    {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <span>
                        {showLink ? <LinkToAccount address={to}></LinkToAccount> : to}
                    </span> : ''}

                    {type === TXN_TYPES.APP_CALL ? <span>
                        <LinkToApplication id={appId} name={'Application: ' + appId}></LinkToApplication>
                    </span> : ''}

                </div>;
            }
        });
    }
    if (fields.indexOf('amount') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'amount',
            headerName: 'Amount',
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);
                const amount = txnInstance.getAmount();
                const type = txnInstance.getType();

                return <div className="cell-content">
                    {type === TXN_TYPES.PAYMENT ? <div>
                        <AlgoIcon width={10}></AlgoIcon>
                        <NumberFormat
                            value={microalgosToAlgos(amount)}
                            displayType={'text'}
                            thousandSeparator={true}
                            style={{marginLeft: 5}}
                        ></NumberFormat>
                    </div> : ''}

                </div>;
            }
        });
    }
    if (fields.indexOf('fee') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'fee',
            headerName: 'Fee',
            renderCell: (params: GridValueGetterParams) => {
                const fee = new CoreTransaction(params.row).getFee();

                return <div className="cell-content">
                    <AlgoIcon width={10}></AlgoIcon>
                    <NumberFormat
                        value={microalgosToAlgos(fee)}
                        displayType={'text'}
                        thousandSeparator={true}
                        style={{marginLeft: 5}}
                    ></NumberFormat>
                </div>;
            }
        });
    }
    if (fields.indexOf('type') !== -1) {
        columns.push({
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                const type = new CoreTransaction(params.row).getTypeDisplayValue();
                return <div className="cell-content">
                    {type}
                </div>;
            }
        });
    }

    return (<div className={"transactions-list-wrapper"}>
        <div className={"transactions-list-container"}>
            <div className="transactions-list-body">

                <div style={{ width: '100%' }}>
                    <DataGrid
                        loading={loading}
                        rows={transactions}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                        pagination
                        sx={{
                            ...dataGridStyles,
                            '.MuiDataGrid-cell': {
                                fontSize: 13,
                                'div.cell-content': {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }
                            }
                        }}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                            Pagination: CustomPagination
                        }}
                        componentsProps={{
                            pagination: { loading },
                        }}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default TransactionsList;
