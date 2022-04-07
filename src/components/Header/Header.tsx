import './Header.scss';
import React from "react";
import {useNavigate} from "react-router-dom";

function Header(): JSX.Element {
    const navigate = useNavigate();

    return (<div className={"header-wrapper"}>
        <div className={"header-container"}>
            <div className="logo" onClick={() => {
                navigate('/');
            }}>Dappflow</div>
        </div>
    </div>);
}

export default Header;
