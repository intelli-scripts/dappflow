import './ApplicationsList.scss';
import React from "react";
import {useDispatch} from "react-redux";
import {
    Tooltip
} from "@mui/material";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../theme/styles/datagrid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {copyContent} from "../../../utils/common";
import {CoreApplication} from "../../../packages/core-sdk/classes/CoreApplication";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LinkToApplication from "../../Common/Links/LinkToApplication";


function ApplicationsList(props): JSX.Element {
    const dispatch = useDispatch();
    let {applications} = props;
    if (!applications) {
        applications = [];
    }

    const columns: GridColDef[] = [
        {
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
        {
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
    ];

    return (<div className={"applications-list-wrapper"}>
        <div className={"applications-list-container"}>
            <div className="applications-list-body">

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={applications}
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

export default ApplicationsList;
