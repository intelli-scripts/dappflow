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
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, params.row.id, 'Txn ID copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <Link href={"/transaction/" + params.row.id}>{ellipseString(params.row.id, 30)}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'confirmed-round',
            headerName: 'Block',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <Link href={"/block/" + params.row["confirmed-round"]}>{params.row["confirmed-round"]}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'fee',
            headerName: 'Fee',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <AlgoIcon></AlgoIcon>
                    <NumberFormat
                        value={microalgosToAlgos(params.row.fee)}
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
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, params.row.sender, 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <Link href={"/account/" + params.row.sender}>{ellipseString(params.row.sender, 30)}</Link>
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
