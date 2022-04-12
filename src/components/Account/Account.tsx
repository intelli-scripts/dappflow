import './Account.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadAccount} from "../../redux/actions/account";
import {RootState} from "../../redux/store";
import {Chip, Grid, Tab, Tabs} from "@mui/material";
import {AccountClient} from "../../packages/core-sdk/clients/accountClient";
import explorerSdk from "../../utils/explorerSdk";
import NumberFormat from "react-number-format";
import {microalgosToAlgos} from "algosdk";
import AlgoIcon from "../AlgoIcon/AlgoIcon";


function Account(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {address} = params;

    const account = useSelector((state: RootState) => state.account);
    console.log(account.information);

    useEffect(() => {
        dispatch(loadAccount(address));
    }, [dispatch, address]);

    return (<div className={"account-wrapper"}>
        <div className={"account-container"}>
            <div className="account-header">
                Account overview
            </div>
            <div className="account-body">
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
                                        value={microalgosToAlgos(new AccountClient(explorerSdk.network).getBalance(account.information))}
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

                        </Grid>
                    </Grid>
                </div>



                <div className="account-tabs">

                    <Tabs value="transactions">
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/account/' + address + '/transactions');
                        }}/>
                    </Tabs>

                    <Outlet />


                </div>
            </div>
        </div>
    </div>);
}

export default Account;
