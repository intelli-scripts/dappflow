import './AppCallTxnInnerTxns.scss';
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../../../../../../theme/styles/datagrid";
import {theme} from "../../../../../../../theme";
import {A_SearchTransactionInner} from "../../../../../../../packages/core-sdk/types";
import {CoreTransaction} from "../../../../../../../packages/core-sdk/classes/CoreTransaction";
import LinkToAccount from "../../../../../../Common/Links/LinkToAccount";
import {TXN_TYPES} from "../../../../../../../packages/core-sdk/constants";
import LinkToApplication from "../../../../../../Common/Links/LinkToApplication";
import LinkToInnerTransaction from "../../../../../../Common/Links/LinkToInnerTransaction";


function AppCallTxnInnerTxns(props): JSX.Element {

    let txns: A_SearchTransactionInner[] = props.txns;
    const id = props.id;
    if (!txns) {
        txns = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);
                return <div>
                    <LinkToInnerTransaction id={id} index={0} name={txnInstance.getTypeDisplayValue()}></LinkToInnerTransaction>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);
                return <div>
                    <LinkToAccount address={txnInstance.getFrom()} strip={30}></LinkToAccount>
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const txnInstance = new CoreTransaction(params.row);
                const to = txnInstance.getTo();
                const type = txnInstance.getType();
                const appId = txnInstance.getAppId();

                return <div>
                    {type === TXN_TYPES.PAYMENT || type === TXN_TYPES.ASSET_TRANSFER ? <div>
                        <LinkToAccount address={to} strip={30}></LinkToAccount>
                    </div> : ''}

                    {type === TXN_TYPES.APP_CALL ? <div>
                        <LinkToApplication id={appId} name={'App ID: ' + appId}></LinkToApplication>
                    </div> : ''}
                </div>;
            }
        }
    ];

    return (<div className={"app-call-txn-inner-txns-wrapper"}>
        <div className={"app-call-txn-inner-txns-container"}>
            <div className="app-call-txn-inner-txns-header">
                Inner transactions
            </div>
            <div className="app-call-txn-inner-txns-body">


                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={txns}
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
                            return Math.random();
                        }}
                    />
                </div>


            </div>
        </div>
    </div>);
}

export default AppCallTxnInnerTxns;
