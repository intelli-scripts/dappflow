import './Accounts.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAccounts} from "../../redux/actions/accounts";
import {RootState} from "../../redux/store";
import {
    Link, Tooltip
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {ellipseString} from "../../packages/core-sdk/utils";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyContent} from "../../utils/common";
import AlgoIcon from "../AlgoIcon/AlgoIcon";

function Accounts(): JSX.Element {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const {list} = accounts;

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'address',
            headerName: 'Address',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, params.row.address, 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <Link href={"/account/" + params.row.address}>{ellipseString(params.row.address, 30)}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'amount',
            headerName: 'Balance',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <AlgoIcon></AlgoIcon>
                    <NumberFormat
                        value={microalgosToAlgos(params.row.amount)}
                        displayType={'text'}
                        thousandSeparator={true}
                        style={{marginLeft: 5}}
                    ></NumberFormat>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'status',
            headerName: 'Staus'
        },
        {
            ...dataGridCellConfig,
            field: 'total-created-assets',
            headerName: 'Created assets'
        },
        {
            ...dataGridCellConfig,
            field: 'total-created-apps',
            headerName: 'Created applications'
        }
    ];

    useEffect(() => {
        dispatch(loadAccounts());
    }, [dispatch]);

    return (<div className={"accounts-wrapper"}>
        <div className={"accounts-container"}>
            <div className="accounts-body">
                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={list}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => {
                            return row.address;
                        }}
                        disableSelectionOnClick
                        sx={dataGridStyles}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default Accounts;
