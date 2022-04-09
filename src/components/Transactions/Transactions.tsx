import './Transactions.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    Link
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {loadTransactions} from "../../redux/actions/transactions";
import {ellipseString} from "../../packages/explorer-sdk/utils";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";


function Transactions(): JSX.Element {
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactions);
    const {list} = transactions;

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'id',
            headerName: 'Txn ID',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <Link href="/">{ellipseString(params.row.id, 15)}</Link>;
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
                return <NumberFormat
                    value={microalgosToAlgos(params.row.fee)}
                    displayType={'text'}
                    thousandSeparator={true}
                ></NumberFormat>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <Link href="/">{ellipseString(params.row.sender, 15)}</Link>;
            }
        }
    ];

    useEffect(() => {
        dispatch(loadTransactions());
    }, [dispatch]);

    return (<div className={"transactions-wrapper"}>
        <div className={"transactions-container"}>
            <div className="transactions-body">

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={list}
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

export default Transactions;
