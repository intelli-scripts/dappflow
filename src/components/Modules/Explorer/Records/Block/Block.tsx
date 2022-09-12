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


function Block(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const block = useSelector((state: RootState) => state.block);

    const blockInstance = new CoreBlock(block.information);

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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <div className="property">
                                    <div className="key">
                                        Timestamp
                                    </div>
                                    <div className="value">
                                        {blockInstance.getTimestampDisplayValue()}
                                    </div>
                                </div>



                                <div className="property">
                                    <div className="key">
                                        Txn count
                                    </div>
                                    <div className="value">
                                        {blockInstance.getTransactionsCount()}
                                    </div>
                                </div>

                                <div className="property">
                                    <div className="key">
                                        Txn types
                                    </div>
                                    <div className="value">
                                        {blockInstance.getTransactionsTypesCount() ? blockInstance.getTransactionsTypesCount() : '-'}
                                    </div>
                                </div>

                            </Grid>
                        </Grid>
                    </div>



                    <div className="block-tabs">

                        <Tabs value="transactions" className="related-list">
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
