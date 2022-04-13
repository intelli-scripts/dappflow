import './AssetsList.scss';
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    Link, Tooltip
} from "@mui/material";
import {loadTransactions} from "../../redux/actions/transactions";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../utils/common";
import {ellipseString} from "../../packages/core-sdk/utils";


function AssetsList(props): JSX.Element {
    const dispatch = useDispatch();
    let {assets} = props;
    if (!assets) {
        assets = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'name',
            headerName: 'Name',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <Link href={"/asset/" + params.row.index}>{params.row.params.name}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'index',
            headerName: 'ID',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, params.row.index, 'Asset id copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <Link href={"/asset/" + params.row.index}>{params.row.index}</Link>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'unit',
            headerName: 'Unit',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    {params.row.params["unit-name"]}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'url',
            headerName: 'Url',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    {params.row.params.url ? <Link href={params.row.params.url} target={"_blank"}>{params.row.params.url}</Link> : '--None--'}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'creator',
            headerName: 'Creator',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, params.row.params.creator, 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <Link href={"/account/" + params.row.params.creator}>{ellipseString(params.row.params.creator, 30)}</Link>
                </div>;
            }
        }
    ];

    useEffect(() => {
        dispatch(loadTransactions());
    }, [dispatch]);

    return (<div className={"assets-list-wrapper"}>
        <div className={"assets-list-container"}>
            <div className="assets-list-body">

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={assets}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        sx={dataGridStyles}
                        getRowId={(row) => {
                            return row.index;
                        }}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default AssetsList;
