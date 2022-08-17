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
import {CoreTransaction} from "../../../../../packages/core-sdk/classes/CoreTransaction";
import {TXN_TYPES} from "../../../../../packages/core-sdk/constants";
import {ArrowForward} from "@mui/icons-material";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToApplication from "../../Common/Links/LinkToApplication";
import LinkToTransaction from "../../Common/Links/LinkToTransaction";
import LinkToBlock from "../../Common/Links/LinkToBlock";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {A_SearchTransaction} from "../../../../../packages/core-sdk/types";
import LinkToGroup from "../../Common/Links/LinkToGroup";

interface TransactionsListProps {
    transactions: A_SearchTransaction[];
    loading?: boolean;
    reachedLastPage?: Function
}


function TransactionsList({transactions = [], loading = false, reachedLastPage = () => {}}: TransactionsListProps): JSX.Element {
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
                let strip = 20;
                if (groupId) {
                    strip = 18;
                }

                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, txnId, 'Txn ID copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToTransaction id={txnId} strip={strip}></LinkToTransaction>
                    {groupId ? <span className="group-txn-icon"><LinkToGroup id={groupId} blockId={txnInstance.getBlock()} icon={true}></LinkToGroup></span> : ''}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'confirmed-round',
            headerName: 'Block',
            renderCell: (params: GridValueGetterParams) => {
                const block = new CoreTransaction(params.row).getBlock();
                return <div>
                    <LinkToBlock id={block}></LinkToBlock>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'timestamp',
            headerName: 'Timestamp',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const timestamp = new CoreTransaction(params.row).getTimestampDisplayValue('dd mmmm  yyyy HH:MM:ss');
                return <div>
                    {timestamp}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const from = new CoreTransaction(params.row).getFrom();

                return <div>
                    <LinkToAccount address={from} strip={20}></LinkToAccount>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);

                const to = txnInstance.getTo();
                const type = txnInstance.getType();
                const appId = txnInstance.getAppId();

                return <div>
                    {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <div>
                        <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward>
                        <LinkToAccount address={to} strip={20}></LinkToAccount>
                    </div> : ''}

                    {type === TXN_TYPES.APP_CALL ? <div>
                        <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward>
                        <LinkToApplication id={appId} name={'Application: ' + appId}></LinkToApplication>
                    </div> : ''}

                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'fee',
            headerName: 'Fee',
            renderCell: (params: GridValueGetterParams) => {
                const fee = new CoreTransaction(params.row).getFee();

                return <div>
                    <AlgoIcon></AlgoIcon>
                    <NumberFormat
                        value={microalgosToAlgos(fee)}
                        displayType={'text'}
                        thousandSeparator={true}
                        style={{marginLeft: 5}}
                    ></NumberFormat>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                const type = new CoreTransaction(params.row).getTypeDisplayValue();
                return <div>
                    {type}
                </div>;
            }
        }
    ];

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
                                fontSize: 13
                            },
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
