import './TransactionsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    Link, Tooltip
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {ellipseString} from "../../packages/core-sdk/utils";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../utils/common";
import AlgoIcon from "../AlgoIcon/AlgoIcon";
import {CoreTransaction} from "../../packages/core-sdk/classes/CoreTransaction";
import {TXN_TYPES} from "../../packages/core-sdk/constants";


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
                    <Link href={"/transaction/" + txnId}>{ellipseString(txnId, 30)}</Link>
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
                    <Link href={"/block/" + block}>{block}</Link>
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
                    <Link href={"/account/" + from}>{ellipseString(from, 30)}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const to = new CoreTransaction(params.row).getToDisplayValue();
                const type = new CoreTransaction(params.row).getType();

                return <div>
                    {to ? <div>


                        {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <div>
                            <Tooltip title="Click to copy">
                                <ContentCopyIcon className="copy-content" onClick={(ev) => {
                                    copyContent(ev, dispatch, to, 'Address copied');
                                }
                                }></ContentCopyIcon>
                            </Tooltip>
                            <Link href={"/account/" + to}>{ellipseString(to, 30)}</Link>
                        </div> : ''}

                        {type === TXN_TYPES.APP_CALL ? <div>
                            <Link href={"/application/" + new CoreTransaction(params.row).getTo()}>{to}</Link>
                        </div> : ''}

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
        },
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
