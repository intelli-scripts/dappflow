import './Block.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Grid, Tab, Tabs} from "@mui/material";
import {loadBlock} from "../../../redux/actions/block";
import {TIMESTAMP_DISPLAY_FORMAT} from "../../../packages/core-sdk/constants";
import dateFormat  from "dateformat";
import LoadingTile from "../../Common/LoadingTile/LoadingTile";


function Block(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const block = useSelector((state: RootState) => state.block);

    useEffect(() => {
        dispatch(loadBlock(Number(id)));
    }, [dispatch, id]);

    return (<div className={"block-wrapper"}>
        <div className={"block-container"}>
            <div className="block-header">
                Block overview
            </div>

            {block.loading ? <LoadingTile></LoadingTile> : <div className="block-body">
                <div className="address">
                    #{id}
                </div>


                <div className="props">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Timestamp
                                </div>
                                <div className="value">
                                    {dateFormat(new Date(block.information.timestamp * 1000), TIMESTAMP_DISPLAY_FORMAT) + ' GMT'}
                                </div>
                            </div>



                            <div className="property">
                                <div className="key">
                                    Txn count
                                </div>
                                <div className="value">
                                    {block.information.transactions.length}
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </div>



                <div className="block-tabs">

                    <Tabs value="transactions" className="related-list">
                        <Tab label="Transactions" value="transactions" onClick={() => {
                            navigate('/block/' + id + '/transactions');
                        }}/>
                    </Tabs>

                    <Outlet />


                </div>
            </div>}

        </div>
    </div>);
}

export default Block;
