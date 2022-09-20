import './IndexerVersion.scss';
import React from "react";
import {Card, CardContent} from "@mui/material";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";



function IndexerVersion(props): JSX.Element {

    const loading: boolean = props.loading ? true : false;


    return (<div className={"indexer-version-wrapper"}>
        <div className={"indexer-version-container"}>

            <React.Fragment>
                <Card variant="outlined" sx={{background: shadedClr}} className="tile">
                    <CardContent>
                        <div className="tile-header">
                            <div className="tile-title">
                                Indexer version
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
                </Card>

            </React.Fragment>
        </div>
    </div>);
}

export default IndexerVersion;
