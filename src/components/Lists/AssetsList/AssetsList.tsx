import './AssetsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    CircularProgress,
    Link, Pagination, Tooltip
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
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToAsset from "../../Common/Links/LinkToAsset";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {A_Asset} from "../../../packages/core-sdk/types";

interface AssetsListProps {
    assets: A_Asset[];
    loading?: boolean;
    reachedLastPage?: Function
}

function AssetsList({assets = [], loading = false, reachedLastPage = () => {}}: AssetsListProps): JSX.Element {
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
            field: 'unit',
            headerName: 'Unit',
            renderCell: (params: GridValueGetterParams) => {
                const assetInstance = new CoreAsset(params.row);
                return <div>
                    {assetInstance.getUnitName()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'url',
            headerName: 'Url',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const assetInstance = new CoreAsset(params.row);
                const url = assetInstance.getUrl();
                return <div>
                    {url ? <Link href={url} target={"_blank"}>{url}</Link> : '--None--'}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'creator',
            headerName: 'Creator',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const assetInstance = new CoreAsset(params.row);
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, assetInstance.getCreator(), 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToAccount address={assetInstance.getCreator()} strip={30}></LinkToAccount>
                </div>;
            }
        }
    ];

    return (<div className={"assets-list-wrapper"}>
        <div className={"assets-list-container"}>
            <div className="assets-list-body">

                <div style={{ height: 700, width: '100%' }}>
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

export default AssetsList;
