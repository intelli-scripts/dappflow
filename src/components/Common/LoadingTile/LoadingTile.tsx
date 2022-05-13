import './LoadingTile.scss';
import React from "react";

interface TilesProps {
    count?: number
}

function LoadingTile({count = 5}: TilesProps): JSX.Element {
    return (<div className={"loading-tile-wrapper"}>
        <div className={"loading-tile-container"}>

            <div className="wrapper">
                <div className="wrapper-cell">
                    <div className="text">

                        {[...Array(count)].map((value, index) => {
                            return <div className="text-line" key={index}></div>;
                        })}

                    </div>
                </div>
            </div>


        </div>
    </div>);
}

export default LoadingTile;
