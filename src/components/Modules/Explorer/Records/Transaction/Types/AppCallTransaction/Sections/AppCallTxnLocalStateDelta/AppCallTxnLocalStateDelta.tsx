import './AppCallTxnLocalStateDelta.scss';
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {
    dataGridCellConfig,
    dataGridStylesBlackHeader
} from "../../../../../../../../../theme/styles/datagrid";
import NumberFormat from "react-number-format";
import {A_LocalStateDelta} from "../../../../../../../../../packages/core-sdk/types";
import {CoreLocalState} from "../../../../../../../../../packages/core-sdk/classes/core/CoreLocalStateDelta";
import {Grid} from "@mui/material";
import LinkToAccount from "../../../../../../Common/Links/LinkToAccount";


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

            <div className="props">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="property">
                            <div className="key">
                                Local state delta
                            </div>
                            <div className="value" style={{marginTop: 20}}>

                                <div className="app-call-txn-local-state-delta-body">

                                    {localStateDelta.map((accountLocalState) => {
                                        return <div className="local-state-account-wrapper" key={accountLocalState.address}>
                                            <div className="local-state-account-container">
                                                <div className="address">
                                                    <LinkToAccount address={accountLocalState.address}></LinkToAccount>
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
                                                                ...dataGridStylesBlackHeader
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
                        </div>
                    </Grid>
                </Grid>
            </div>




        </div>
    </div>);
}

export default AppCallTxnLocalStateDelta;
