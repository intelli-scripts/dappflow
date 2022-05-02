import './TransactionsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    Tooltip
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../../utils/common";
import AlgoIcon from "../../AlgoIcon/AlgoIcon";
import {CoreTransaction} from "../../../packages/core-sdk/classes/CoreTransaction";
import {TXN_TYPES} from "../../../packages/core-sdk/constants";
import {ArrowForward} from "@mui/icons-material";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToApplication from "../../Common/Links/LinkToApplication";
import LinkToTransaction from "../../Common/Links/LinkToTransaction";
import LinkToBlock from "../../Common/Links/LinkToBlock";


function TransactionsList(props): JSX.Element {
    const dispatch = useDispatch();
    let {transactions} = props;
    if (!transactions) {
        transactions = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'id',
            headerName: 'Txn ID',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnId = new CoreTransaction(params.row).getId();

                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, txnId, 'Txn ID copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToTransaction id={txnId} strip={20}></LinkToTransaction>
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
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const from = new CoreTransaction(params.row).getFrom();

                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, from, 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
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
                const to = new CoreTransaction(params.row).getTo();
                const type = new CoreTransaction(params.row).getType();
                const appId = new CoreTransaction(params.row).getAppId();

                return <div>
                    {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <div>
                        <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward>
                        <Tooltip title="Click to copy">
                            <ContentCopyIcon className="copy-content" onClick={(ev) => {
                                copyContent(ev, dispatch, to, 'Address copied');
                            }
                            }></ContentCopyIcon>
                        </Tooltip>
                        <LinkToAccount address={to} strip={20}></LinkToAccount>
                    </div> : ''}

                    {type === TXN_TYPES.APP_CALL ? <div>
                        <ArrowForward fontSize={"small"} style={{verticalAlign: "text-bottom", marginRight: 5}}></ArrowForward>
                        <LinkToApplication id={appId} name={'App ID: ' + appId}></LinkToApplication>
                    </div> : ''}

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

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={transactions}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        sx={dataGridStyles}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default TransactionsList;
