import './AppCallTxnLocalStateDelta.scss';
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../../../../../../../theme/styles/datagrid";
import NumberFormat from "react-number-format";
import {theme} from "../../../../../../../../../theme";
import {A_LocalStateDelta} from "../../../../../../../../../packages/core-sdk/types";
import {CoreLocalState} from "../../../../../../../../../packages/core-sdk/classes/core/CoreLocalStateDelta";


function AppCallTxnLocalStateDelta(props): JSX.Element {

    let localStateDelta: A_LocalStateDelta[] = props.state;
    if (!localStateDelta) {
        localStateDelta = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'key',
            headerName: 'Key',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreLocalState(params.row);
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
                const gStateDeltaInstance = new CoreLocalState(params.row);
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
                const gStateDeltaInstance = new CoreLocalState(params.row);
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
                const gStateDeltaInstance = new CoreLocalState(params.row);
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

    return (<div className={"app-call-txn-local-state-delta-wrapper"}>
        <div className={"app-call-txn-local-state-delta-container"}>
            <div className="app-call-txn-local-state-delta-header">
                Local state delta
            </div>
            <div className="app-call-txn-local-state-delta-body">


                {localStateDelta.map((accountLocalState) => {
                    return <div className="local-state-account-wrapper" key={accountLocalState.address}>
                        <div className="local-state-account-container">
                            <div className="address">
                                {accountLocalState.address}
                            </div>
                            <div className="state-delta">
                                <div style={{ width: '100%' }}>
                                    <DataGrid
                                        rows={accountLocalState.delta}
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
                        </div>
                    </div>;
                })}


            </div>
        </div>
    </div>);
}

export default AppCallTxnLocalStateDelta;
