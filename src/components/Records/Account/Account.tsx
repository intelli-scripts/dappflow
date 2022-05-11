import './Account.scss';
import React, {useEffect} from "react";
import {matchPath, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadAccount} from "../../../redux/actions/account";
import {RootState} from "../../../redux/store";
import {Chip, Grid, Tab, Tabs} from "@mui/material";
import NumberFormat from "react-number-format";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../../AlgoIcon/AlgoIcon";
import {CoreAccount} from "../../../packages/core-sdk/classes/CoreAccount";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";
import JsonViewer from "../../Common/JsonViewer/JsonViewer";


function Account(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {address} = params;

    const account = useSelector((state: RootState) => state.account);

    let tabValue = 'transactions';
    const { pathname } = useLocation();

    if (matchPath("/account/:address/transactions", pathname)) {
        tabValue = 'transactions';
    }
    else if (matchPath("/account/:address/created-assets", pathname)) {
        tabValue = 'created-assets';
    }
    else if (matchPath("/account/:address/created-applications", pathname)) {
        tabValue = 'created-applications';
    }

    useEffect(() => {
        dispatch(loadAccount(address));
    }, [dispatch, address]);

    return (<div className={"account-wrapper"}>
        <div className={"account-container"}>

            <div className="account-header">
                <div>
                    Account overview
                </div>
                <div>
                    <JsonViewer obj={account.information}></JsonViewer>
                </div>
            </div>

            {account.loading ? <LoadingTile></LoadingTile> : <div className="account-body">
                <div className="address">
                    {account.information.address}
                    <div style={{marginTop: 10}}>
                        <Chip color={"primary"} variant={"outlined"} label={account.information.status} size={"small"}></Chip>
                    </div>

                </div>

                <div className="props">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Balance
                                </div>
                                <div className="value">
                                    <NumberFormat
                                        value={microalgosToAlgos(new CoreAccount(account.information).getBalance())}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    ></NumberFormat>
                                    <AlgoIcon></AlgoIcon>
                                </div>
                            </div>



                            <div className="property">
                                <div className="key">
                                    Created assets
                                </div>
                                <div className="value">
                                    {account.createdAssets.length}
                                </div>
                            </div>

                            <div className="property">
                                <div className="key">
                                    Created applications
                                </div>
                                <div className="value">
                                    {account.createdApplications.length}
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </div>



                <div className="account-tabs">

                    <Tabs value={tabValue} className="related-list">
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/account/' + address + '/transactions');
                        }}/>
                        <Tab label="Created assets" value="created-assets" onClick={() => {
                            navigate('/account/' + address + '/created-assets');
                        }}/>
                        <Tab label="Created applications" value="created-applications" onClick={() => {
                            navigate('/account/' + address + '/created-applications');
                        }}/>
                    </Tabs>

                    <Outlet />


                </div>
            </div>}

        </div>
    </div>);
}

export default Account;
