import './Block.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {Grid, Tab, Tabs} from "@mui/material";
import {loadBlock} from "../../../../../redux/explorer/actions/block";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {CoreBlock} from "../../../../../packages/core-sdk/classes/core/CoreBlock";
import CustomError from "../../Common/CustomError/CustomError";
import LinkToBlock from "../../Common/Links/LinkToBlock";
import {Alert} from "@mui/lab";


function Block(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const block = useSelector((state: RootState) => state.block);

    const blockInstance = new CoreBlock(block.information);
    const txnTypes = blockInstance.getTransactionsTypesCount();

    let txnTypesList: string[] = [];
    if (txnTypes) {
        txnTypesList = txnTypes.split(",");
    }

    useEffect(() => {
        dispatch(loadBlock(Number(id)));
    }, [dispatch, id]);

    return (<div className={"block-wrapper"}>
        <div className={"block-container"}>

            {block.error ? <CustomError></CustomError> : <div>
                <div className="block-header">
                    <div>
                        Block overview
                    </div>
                </div>

                {block.loading ? <LoadingTile></LoadingTile> : <div className="block-body">
                    <div className="address">
                        #{blockInstance.getRound()}
                    </div>


                    <div className="props">
                        <Grid container spacing={1}>



                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <div className="property">
                                    <div className="key">
                                        Total transactions : {blockInstance.getTransactionsCount()}

                                    </div>
                                    <div className="value">
                                        {blockInstance.getTransactionsCount() > 0 ? <div>
                                            {txnTypesList.map((type) => {
                                                return <Alert key={type} color={'error'} icon={false} className="mini-alert">
                                                    {type}
                                                </Alert>
                                            })}
                                        </div> : 0}


                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <div className="property">
                                    <div className="key">
                                        Age
                                    </div>
                                    <div className="value">
                                        {blockInstance.getTimestampDuration()} Ago
                                    </div>
                                </div>
                            </Grid>



                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            </Grid>


                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <div className="property">
                                    <div className="key">
                                        Timestamp
                                    </div>
                                    <div className="value">
                                        {blockInstance.getTimestampDisplayValue()}
                                    </div>
                                </div>


                            </Grid>


                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <div className="property">
                                    <div className="key">
                                        Previous round
                                    </div>
                                    <div className="value">
                                        <LinkToBlock id={blockInstance.getRound() - 1}></LinkToBlock>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="property">
                                    <div className="key">
                                        Hash
                                    </div>
                                    <div className="value">
                                        {block.hash}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>



                    <div className="block-tabs">

                        <Tabs TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}} value="transactions" className="related-list">
                            <Tab label="Transactions" value="transactions" onClick={() => {
                                navigate('/explorer/block/' + id + '/transactions');
                            }}/>
                        </Tabs>

                        <Outlet />


                    </div>
                </div>}
            </div>}



        </div>
    </div>);
}

export default Block;
