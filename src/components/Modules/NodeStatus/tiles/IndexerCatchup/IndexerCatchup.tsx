import './IndexerCatchup.scss';
import React from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";



function IndexerCatchup(props): JSX.Element {

    const loading: boolean = props.loading ? true : false;


    return (<div className={"indexer-catchup-wrapper"}>
        <div className={"indexer-catchup-container"}>

            <React.Fragment>
                <Card variant="outlined" sx={{background: shadedClr}} className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Indexer catchup
                            </div>
                        </div>

                        <div className="tile-body">
                            {loading ? <div>
                                <LoadingTile count={3}></LoadingTile>
                            </div> : <div>

                            </div>
                            }
                        </div>


                    </CardContent>
                    <CardActions sx={{textAlign: 'right'}}>
                        <Button size="small" color={"warning"} onClick={() => {
                            window.open("https://developer.algorand.org/docs/run-a-node/setup/install/#sync-node-network-using-fast-catchup", "_blank");
                        }}>Learn More</Button>
                    </CardActions>
                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default IndexerCatchup;