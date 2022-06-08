import './ApplicationGlobalState.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {CoreApplication} from "../../../../../packages/core-sdk/classes/CoreApplication";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../../../theme/styles/datagrid";
import NumberFormat from "react-number-format";
import {theme} from "../../../../../theme";


function ApplicationGlobalState(): JSX.Element {

    const application = useSelector((state: RootState) => state.application);
    const applicationInstance = new CoreApplication(application.information);
    const globalStorage = applicationInstance.getGlobalStorageDecrypted()

    globalStorage.sort((a, b) => a.key.localeCompare(b.key));

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'key',
            headerName: 'Key',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    {params.row.key}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    {params.row.type}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'value',
            headerName: 'Value',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                return <div>
                    {params.row.type === 'uint' ? <NumberFormat
                        value={params.row.value}
                        displayType={'text'}
                        thousandSeparator={true}
                    ></NumberFormat> : params.row.value}
                </div>;
            }
        }
    ];

    return (<div className={"application-global-state-wrapper"}>
        <div className={"application-global-state-container"}>

            {globalStorage && globalStorage.length > 0 ? <div>
                <div className="application-global-state-header">
                    Global state
                </div>

                <div className="application-global-state-body">


                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={globalStorage}
                            columns={columns}
                            rowsPerPageOptions={[]}
                            disableSelectionOnClick
                            autoHeight
                            sx={{
                                ...dataGridStyles,
                                '.MuiDataGrid-columnHeader': {
                                    background: theme.palette.common.black,
                                    color: theme.palette.common.white
                                }
                            }}
                            getRowId={(row) => {
                                return row.key;
                            }}
                        />
                    </div>


                </div>
            </div> : ''}

        </div>
    </div>);
}

export default ApplicationGlobalState;
