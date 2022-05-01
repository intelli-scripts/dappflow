import './LoadingTile.scss';
import React from "react";

function LoadingTile(): JSX.Element {
    return (<div className={"loading-tile-wrapper"}>
        <div className={"loading-tile-container"}>


            <div className="wrapper">
                <div className="wrapper-cell">
                    <div className="text">
                        <div className="text-line"></div>
                        <div className="text-line"></div>
                        <div className="text-line"></div>
                        <div className="text-line"></div>
                        <div className="text-line"></div>
                    </div>
                </div>
            </div>


        </div>
    </div>);
}

export default LoadingTile;
