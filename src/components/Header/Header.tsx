import './Header.scss';
import React from "react";

function Header(): JSX.Element {
    return (<div className={"header-wrapper"}>
        <div className={"header-container"}>
            <div className="logo">Dappflow</div>
        </div>
    </div>);
}

export default Header;
