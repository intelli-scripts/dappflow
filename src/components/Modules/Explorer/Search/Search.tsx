import './Search.scss';
import React, {useState} from "react";
import {
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputBase
} from "@mui/material";
import {CancelOutlined, Search as SearchIcon} from "@mui/icons-material";
import {theme} from "../../../../theme";
import {isValidAddress} from "algosdk";
import {useNavigate} from "react-router-dom";
import {A_Application, A_Asset, A_Block} from "../../../../packages/core-sdk/types";
import {AssetClient} from "../../../../packages/core-sdk/clients/assetClient";
import {isNumber} from "../../../../utils/common";
import explorer from "../../../../utils/dappflow";
import {ApplicationClient} from "../../../../packages/core-sdk/clients/applicationClient";
import {BlockClient} from "../../../../packages/core-sdk/clients/blockClient";
import {hideLoader, showLoader} from "../../../../redux/common/actions/loader";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux/common/actions/snackbar";


interface searchResult {
    type: string,
    asset?: A_Asset,
    application?: A_Application
    block?: A_Block
}

interface SettingsState{
    searchStr: string,
    searchResults: searchResult[],
    showSearchResults: boolean
}

const initialState: SettingsState = {
    searchStr: '',
    searchResults: [],
    showSearchResults: false
};


function Search(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [
        {searchStr, searchResults, showSearchResults},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    function redirectToSelectedResult(result: searchResult) {
        setState(prevState => ({...prevState, searchStr: ""}));
        if (result.type === 'asset') {
            navigate('/explorer/asset/' + searchStr);
            return;
        }
        if (result.type === 'application') {
            navigate('/explorer/application/' + searchStr);
            return;
        }
        if (result.type === 'block') {
            navigate('/explorer/block/' + searchStr);
            return;
        }
    }

    async function doSearch() {
        if (!searchStr) {
            return;
        }
        if (isValidAddress(searchStr)) {
            setState(prevState => ({...prevState, searchStr: ""}));
            navigate('/explorer/account/' + searchStr);
            return;
        }
        if (searchStr.length === 52) {
            setState(prevState => ({...prevState, searchStr: ""}));
            navigate('/explorer/transaction/' + searchStr);
            return;
        }

        const results:searchResult[] = [];
        if (isNumber(searchStr)) {
            try {
                dispatch(showLoader("Searching ..."));
                const asset = await new AssetClient(explorer.network).get(Number(searchStr));
                results.push({
                    type: 'asset',
                    asset
                });
                dispatch(hideLoader());
            } catch (e) {
                dispatch(hideLoader());
            }
            try {
                dispatch(showLoader("Searching ..."));
                const application = await new ApplicationClient(explorer.network).get(Number(searchStr));
                results.push({
                    type: 'application',
                    application
                });
                dispatch(hideLoader());
            } catch (e) {
                dispatch(hideLoader());
            }
            try {
                dispatch(showLoader("Searching ..."));
                const block = await new BlockClient(explorer.network).get(Number(searchStr));
                results.push({
                    type: 'block',
                    block
                });
                dispatch(hideLoader());
            } catch (e) {
                dispatch(hideLoader());
            }
        }

        if (results.length > 0) {
            if (results.length === 1) {
                redirectToSelectedResult(results[0])
            }
            else {
                setState(prevState => ({...prevState, searchResults: results, showSearchResults: true}));
            }
        }
        else {
            dispatch(showSnack({
                severity: 'error',
                message: 'No results found'
            }));
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

            {showSearchResults ? <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                open={showSearchResults}
            >
                <DialogTitle >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{fontWeight: "bold", fontSize: 18}}>Search results</div>
                        </div>
                        <IconButton color="primary" onClick={() => {
                            setState(prevState => ({...prevState, showSearchResults: false}));
                        }}>
                            <CancelOutlined />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="search-results-wrapper">
                        <div className="search-results-container">
                            <div>
                                {searchResults.map((result) => {
                                    return <Chip
                                        key={result.type}
                                        label={result.type + ' - ' + searchStr}
                                        color={"primary"}
                                        style={{marginLeft: 10}}
                                        onClick={() => {
                                            clearState();
                                            redirectToSelectedResult(result);
                                        }
                                        }
                                        size={"small"}></Chip>
                                })}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog> : ''}


        </div>
    </div>);
}

export default Search;
