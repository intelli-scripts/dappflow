import './Home.scss';
import React from "react";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import {Button, InputAdornment, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";
import {theme} from "../../theme";

function Home(): JSX.Element {
    return (<div className={"home-wrapper"}>
        <div className={"home-container"}>
            <div className="home-body">
                <DeveloperBoardIcon className="logo"></DeveloperBoardIcon>
                <div className="tag-line">
                    Algorand Blockchain Explorer
                </div>
                <div className="search-container">
                    <InputBase
                        placeholder="Address / Transaction / Asset / Application"
                        style={{marginRight: 20,
                            width: 420,
                            padding: 6,
                            border: '1px solid ' + theme.palette.grey["200"]
                        }}
                        startAdornment={<InputAdornment position="start">
                            <Search />
                        </InputAdornment>}
                        onChange={(ev) => {

                        }}
                        fullWidth/>
                    <Button variant={"contained"} color={"primary"} size={"large"}>Explore</Button>
                </div>
            </div>
        </div>
    </div>);
}

export default Home;
