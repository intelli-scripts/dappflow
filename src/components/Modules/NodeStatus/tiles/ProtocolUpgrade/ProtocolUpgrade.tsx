import './ProtocolUpgrade.scss';
import React from "react";
import {Card, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import humanizeDuration from 'humanize-duration';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {CoreNode} from "../../../../../packages/core-sdk/classes/core/CoreNode";
import LinkToBlock from "../../../Explorer/Common/Links/LinkToBlock";


function ProtocolUpgrade(): JSX.Element {


    const node = useSelector((state: RootState) => state.node);
    const {status, loading, versionsCheck, genesis, health} = node;

    const coreNodeInstance = new CoreNode(status, versionsCheck, genesis, health);
    const hasProtocolUpgrade = coreNodeInstance.hasProtocolUpgrade();

    return (<div className={"protocol-upgrade-wrapper"}>
        <div className={"protocol-upgrade-container"}>

            <React.Fragment>
                <Card variant="outlined" className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Protocol upgrade
                            </div>
                        </div>

                        <div className="tile-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>
                                {hasProtocolUpgrade ? <div className="tile-status">
                                    <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                    <span>Protocol Upgrade planned</span>
                                </div> : <div className="tile-status">
                                    <ErrorOutlineIcon fontSize={"large"} color={"warning"}></ErrorOutlineIcon>
                                    <span>No protocol upgrade is planned</span>
                                </div>}

                                {hasProtocolUpgrade ? <div className="tile-details">
                                    <div className="tile-detail">
                                        <div className="key">Upgrade round : </div>
                                        <div className="value">
                                            <LinkToBlock id={coreNodeInstance.getProtocolUpgradeBlock()}></LinkToBlock>
                                        </div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">current round : </div>
                                        <div className="value">
                                            <LinkToBlock id={health.round}></LinkToBlock>
                                        </div>
                                    </div>
                                    <div className="tile-detail">
                                        <div className="key">Protocol upgrade approaching in (Estimated) : </div>
                                        <div className="value">{humanizeDuration(coreNodeInstance.getProtocolUpgradeRemainingSeconds(), { largest: 2 })}</div>
                                    </div>
                                </div> : ''}


                            </div>
                            }
                        </div>


                    </CardContent>

                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default ProtocolUpgrade;
