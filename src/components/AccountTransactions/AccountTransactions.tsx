import './AccountTransactions.scss';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    Link, Tooltip
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {ellipseString} from "../../packages/explorer-sdk/utils";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../utils/common";
import AlgoIcon from "../AlgoIcon/AlgoIcon";
import {theme} from "../../theme";


function AccountTransactions(): JSX.Element {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account);
    const {transactions} = account;

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
            headerName: 'Block'
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
                if (account.information.address === params.row.sender) {
                    return <div>
                        <Tooltip title="Click to copy">
                            <ContentCopyIcon className="copy-content" onClick={(ev) => {
                                copyContent(ev, dispatch, params.row.sender, 'Address copied');
                            }
                            }></ContentCopyIcon>
                        </Tooltip>
                        <span>{ellipseString(params.row.sender, 30)}</span>
                    </div>;
                }

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


    return (<div className={"account-transactions-wrapper"}>
        <div className={"account-transactions-container"}>
            <div className="account-transactions-body">

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={transactions}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        sx={{
                                ...dataGridStyles,
                                '.MuiDataGrid-columnHeader': {
                                    background: theme.palette.common.white,
                                    color: theme.palette.primary.main
                                }
                            }}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default AccountTransactions;
