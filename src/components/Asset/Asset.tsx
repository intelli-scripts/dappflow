import './Asset.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Grid, Link, Tab, Tabs} from "@mui/material";
import {loadAsset} from "../../redux/actions/asset";
import {theme} from "../../theme";
import pSBC from 'shade-blend-color';
import {CoreAsset} from "../../packages/core-sdk/classes/CoreAsset";
import NumberFormat from "react-number-format";


function Asset(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const asset = useSelector((state: RootState) => state.asset);
    const shadedClr = pSBC(0.95, theme.palette.primary.main);

    const assetInstance = new CoreAsset(asset.information);

    useEffect(() => {
        dispatch(loadAsset(Number(id)));
    }, [dispatch, id]);

    return (<div className={"asset-wrapper"}>
        <div className={"asset-container"}>
            <div className="asset-header">
                Asset overview
            </div>
            <div className="asset-body">
                <div className="index">
                    #{assetInstance.getIndex()}
                    <div>
                        {assetInstance.getUrl() ? <Link href={assetInstance.getUrl()} target={"_blank"} style={{fontSize: 13, marginTop: 10}}>{assetInstance.getUrl()}</Link> : ''}
                    </div>
                </div>


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Name
                                </div>
                                <div className="value">
                                    {assetInstance.getName()}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Unit
                                </div>
                                <div className="value">
                                    {assetInstance.getUnitName()}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Total supply
                                </div>
                                <div className="value">
                                    <NumberFormat
                                        value={assetInstance.getTotalSupply()}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    ></NumberFormat>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Decimals
                                </div>
                                <div className="value">
                                    {assetInstance.getDecimals()}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Creator
                                </div>
                                <div className="value addr">
                                    <Link href={"/account/" + assetInstance.getCreator()}>{assetInstance.getCreator()}</Link>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <div className="property">
                                <div className="key">
                                    Default frozen
                                </div>
                                <div className="value">
                                    {assetInstance.getDefaultFrozen() ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </Grid>


                    </Grid>
                </div>


                <div className="props" style={{background: shadedClr}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Manager
                                </div>
                                <div className="value addr">
                                    {assetInstance.hasManager() ? <Link href={"/account/" + assetInstance.getManager()}>{assetInstance.getManager()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Reserve
                                </div>
                                <div className="value addr">
                                    {assetInstance.hasReserve() ? <Link href={"/account/" + assetInstance.getReserve()}>{assetInstance.getReserve()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Freeze
                                </div>
                                <div className="value addr">
                                    {assetInstance.hasFreeze() ? <Link href={"/account/" + assetInstance.getFreeze()}>{assetInstance.getFreeze()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div className="property">
                                <div className="key">
                                    Clawback
                                </div>
                                <div className="value addr">
                                    {assetInstance.hasClawback() ? <Link href={"/account/" + assetInstance.getClawback()}>{assetInstance.getClawback()}</Link> : '--None--'}
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>



                <div className="asset-tabs">

                    <Tabs value="transactions">
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/asset/' + id + '/transactions');
                        }}/>
                    </Tabs>

                    <Outlet />


                </div>
            </div>
        </div>
    </div>);
}

export default Asset;
