import './OptedAssetsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    CircularProgress,
    Pagination, Tooltip
} from "@mui/material";
import {
    DataGrid,
    GridColDef, gridPageCountSelector,
    gridPageSelector,
    GridValueGetterParams,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../../utils/common";
import {CoreAsset} from "../../../packages/core-sdk/classes/CoreAsset";
import LinkToAsset from "../../Common/Links/LinkToAsset";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {A_AccountInformation, A_Asset} from "../../../packages/core-sdk/types";
import {CoreAccount} from "../../../packages/core-sdk/classes/CoreAccount";
import NumberFormat from "react-number-format";

interface OptedAssetsListProps {
    assets: A_Asset[];
    loading?: boolean;
    reachedLastPage?: Function;
    accountInfo: A_AccountInformation
}

function OptedAssetsList({assets = [], loading = false, reachedLastPage = () => {}, accountInfo}: OptedAssetsListProps): JSX.Element {
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
            field: 'name',
            headerName: 'Name',
            renderCell: (params: GridValueGetterParams) => {
                const assetInstance = new CoreAsset(params.row);
                return <div>
                    <LinkToAsset id={assetInstance.getIndex()} name={assetInstance.getName()}></LinkToAsset>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'index',
            headerName: 'ID',
            renderCell: (params: GridValueGetterParams) => {
                const assetInstance = new CoreAsset(params.row);
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, assetInstance.getIndex().toString(), 'Asset id copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToAsset id={assetInstance.getIndex()}></LinkToAsset>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'balance',
            headerName: 'Balance',
            renderCell: (params: GridValueGetterParams) => {
                const accountInstance = new CoreAccount(accountInfo);
                const bal = accountInstance.getAssetBal(params.row);

                const assetInstance = new CoreAsset(params.row);
                return <div>
                    <NumberFormat
                        value={bal}
                        displayType={'text'}
                        thousandSeparator={true}
                    ></NumberFormat>
                    &nbsp; {assetInstance.getUnitName()}
                </div>;
            }
        }
    ];

    return (<div className={"opted-assets-list-wrapper"}>
        <div className={"opted-assets-list-container"}>
            <div className="opted-assets-list-body">

                <div style={{ width: '100%' }}>
                    <DataGrid
                        loading={loading}
                        rows={assets}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        disableSelectionOnClick
                        sx={dataGridStyles}
                        getRowId={(row) => {
                            return row.index;
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

export default OptedAssetsList;
