import './AppCallTxnGlobalStateDelta.scss';
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {
    dataGridCellConfig,
    dataGridStylesBlackHeader
} from "../../../../../../../../../theme/styles/datagrid";
import NumberFormat from "react-number-format";
import {A_GlobalStateDelta} from "../../../../../../../../../packages/core-sdk/types";
import {CoreGlobalState} from "../../../../../../../../../packages/core-sdk/classes/core/CoreGlobalStateDelta";
import {Grid} from "@mui/material";


function AppCallTxnGlobalStateDelta(props): JSX.Element {

    let globalStateDelta: A_GlobalStateDelta[] = props.state;
    if (!globalStateDelta) {
        globalStateDelta = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'key',
            headerName: 'Key',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {gStateDeltaInstance.getKey()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {gStateDeltaInstance.getType()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'action',
            headerName: 'Action',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {gStateDeltaInstance.getActionDisplayValue()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'value',
            headerName: 'Value',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                const action = gStateDeltaInstance.getAction();
                return <div>
                    {action === 2 ? <NumberFormat
                        value={gStateDeltaInstance.getValue()}
                        displayType={'text'}
                        thousandSeparator={true}
                    ></NumberFormat> : gStateDeltaInstance.getValue()}
                </div>;
            }
        }
    ];

    return (<div className={"app-call-txn-global-state-delta-wrapper"}>
        <div className={"app-call-txn-global-state-delta-container"}>


            <div className="props">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="property">
                            <div className="key">
                                Global state delta
                            </div>
                            <div className="value" style={{marginTop: 20}}>
                                <div style={{ width: '100%' }}>
                                    <DataGrid
                                        rows={globalStateDelta}
                                        columns={columns}
                                        rowsPerPageOptions={[]}
                                        disableSelectionOnClick
                                        autoHeight
                                        sx={{
                                            ...dataGridStylesBlackHeader
                                        }}
                                        getRowId={(row) => {
                                            return row.key;
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    </div>);
}

export default AppCallTxnGlobalStateDelta;
