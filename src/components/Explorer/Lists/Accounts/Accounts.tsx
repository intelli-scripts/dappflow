import './Accounts.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAccounts} from "../../../../redux/actions/accounts";
import {RootState} from "../../../../redux/store";
import {
    CircularProgress, Pagination,
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
import {dataGridCellConfig, dataGridStyles} from "../../../../theme/styles/datagrid";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyContent} from "../../../../utils/common";
import AlgoIcon from "../../AlgoIcon/AlgoIcon";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";

function Accounts(): JSX.Element {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const {list, loading} = accounts;

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
                            dispatch(loadAccounts());
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
                    <LinkToAccount address={params.row.address} strip={30}></LinkToAccount>
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
                        loading={loading}
                        rows={list}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        getRowId={(row) => {
                            return row.address;
                        }}
                        disableSelectionOnClick
                        sx={dataGridStyles}
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

export default Accounts;
