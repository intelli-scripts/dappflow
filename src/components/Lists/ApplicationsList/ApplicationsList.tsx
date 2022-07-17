import './ApplicationsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    CircularProgress, Pagination,
    Tooltip
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
import {CoreApplication} from "../../../packages/core-sdk/classes/CoreApplication";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToApplication from "../../Common/Links/LinkToApplication";
import CustomNoRowsOverlay from "../../Common/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {A_Application, A_AppsLocalState} from "../../../packages/core-sdk/types";

interface ApplicationsListProps {
    applications: A_Application[] | A_AppsLocalState[];
    loading?: boolean;
    reachedLastPage?: Function;
    fields?: string[]
}

function ApplicationsList({applications = [], loading = false, fields=['id', 'creator'], reachedLastPage = () => {}}: ApplicationsListProps): JSX.Element {
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

    const fieldsMap = {
        'id': {
            ...dataGridCellConfig,
            field: 'id',
            headerName: 'Application ID',
            renderCell: (params: GridValueGetterParams) => {
                const appInstance = new CoreApplication(params.row);
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, appInstance.getId().toString(), 'Application id copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToApplication id={appInstance.getId()}></LinkToApplication>
                </div>;
            }
        },
        'creator': {
            ...dataGridCellConfig,
            field: 'creator',
            headerName: 'Creator',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const appInstance = new CoreApplication(params.row);
                return <div>
                    <Tooltip title="Click to copy">
                        <ContentCopyIcon className="copy-content" onClick={(ev) => {
                            copyContent(ev, dispatch, appInstance.getCreator(), 'Address copied');
                        }
                        }></ContentCopyIcon>
                    </Tooltip>
                    <LinkToAccount address={appInstance.getCreator()}></LinkToAccount>
                </div>;
            }
        }
    };

    const columns: GridColDef[] = [

    ];

    fields.forEach((field) => {
        columns.push(fieldsMap[field]);
    });

    return (<div className={"applications-list-wrapper"}>
        <div className={"applications-list-container"}>
            <div className="applications-list-body">

                <div style={{ width: '100%' }}>
                    <DataGrid
                        loading={loading}
                        rows={applications}
                        columns={columns}
                        pageSize={10}
                        autoHeight
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

export default ApplicationsList;
