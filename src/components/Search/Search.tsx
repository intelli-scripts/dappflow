import './Search.scss';
import React, {useState} from "react";
import {IconButton, InputBase} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {theme} from "../../theme";
import {isValidAddress} from "algosdk";
import {useNavigate} from "react-router-dom";

interface SettingsState{
    searchStr: string
}
const initialState: SettingsState = {
    searchStr: ''
};

function Search(): JSX.Element {
    const navigate = useNavigate();

    const [
        {searchStr},
        setState
    ] = useState(initialState);

    function doSearch() {
        if (!searchStr) {
            return;
        }
        if (isValidAddress(searchStr)) {
            setState(prevState => ({...prevState, searchStr: ""}));
            navigate('/account/' + searchStr);
            return;
        }
        if (searchStr.length === 52) {
            setState(prevState => ({...prevState, searchStr: ""}));
            navigate('/transaction/' + searchStr);
            return;
        }
    }

    return (<div className={"search-wrapper"}>
        <div className={"search-container"}>
            <InputBase
                placeholder="Address / Transaction / Asset / Application"
                style={{
                    padding: 3,
                    paddingLeft: 20,
                    fontSize: 14,
                    border: '1px solid ' + theme.palette.grey["200"]
                }}
                value={searchStr}
                endAdornment={<IconButton color="primary" onClick={() => {
                    doSearch();
                }}>
                    <SearchIcon />
                </IconButton>}
                onChange={(ev) => {
                    setState(prevState => ({...prevState, searchStr: ev.target.value}));
                }}
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        doSearch();
                    }
                }}
                fullWidth/>
        </div>
    </div>);
}

export default Search;
