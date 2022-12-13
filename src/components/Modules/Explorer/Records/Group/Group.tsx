import './Group.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {Grid, Tab, Tabs} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {loadGroup} from "../../../../../redux/explorer/actions/group";
import {CoreGroup} from "../../../../../packages/core-sdk/classes/core/CoreGroup";
import LinkToBlock from "../../Common/Links/LinkToBlock";
import {Alert} from "@mui/lab";


function Group(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id, blockId} = params;

    const group = useSelector((state: RootState) => state.group);

    const groupInstance = new CoreGroup(group.information);

    const txnTypes = groupInstance.getTransactionsTypesCount();
    let txnTypesList: string[] = [];
    if (txnTypes) {
        txnTypesList = txnTypes.split(",");
    }

    useEffect(() => {
        dispatch(loadGroup({id, blockId: Number(blockId)}));
    }, [dispatch, id, blockId]);

    return (<div className={"group-wrapper"}>
        <div className={"group-container"}>
            <div className="group-header">
                <div>
                    Group transactions overview
                </div>
            </div>

            {group.loading ? <LoadingTile></LoadingTile> : <div className="group-body">
                <div className="id">
                    {groupInstance.getId()}
                </div>


                <div className="props">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <div className="property">
                                <div className="key">
                                    Block
                                </div>
                                <div className="value">
                                    <LinkToBlock id={groupInstance.getBlock()}></LinkToBlock>
                                </div>
                            </div>

                            <div className="property">
                                <div className="key">
                                    Timestamp
                                </div>
                                <div className="value">
                                    {groupInstance.getTimestampDisplayValue()}
                                </div>
                            </div>

                            <div className="property">
                                <div className="key">
                                    Age
                                </div>
                                <div className="value">
                                    {groupInstance.getTimestampDuration()} Ago
                                </div>
                            </div>


                            <div className="property">
                                <div className="key">
                                    Total transactions : {groupInstance.getTransactionsCount()}
                                    <div>
                                        {txnTypesList.map((type) => {
                                            return <Alert key={type} color={'success'} icon={false} className="mini-alert">
                                                {type}
                                            </Alert>
                                        })}
                                    </div>
                                </div>
                                <div className="value">


                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </div>



                <div className="group-tabs">

                    <Tabs TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}} value="transactions" className="related-list">
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

export default Group;
