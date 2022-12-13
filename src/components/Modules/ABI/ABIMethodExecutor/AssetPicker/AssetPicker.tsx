import './AssetPicker.scss';
import {A_Asset} from "../../../../../packages/core-sdk/types";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {AssetClient} from "../../../../../packages/core-sdk/clients/assetClient";
import dappflow from "../../../../../utils/dappflow";
import {isNumber} from "../../../../../utils/common";
import {handleException} from "../../../../../redux/common/actions/exception";
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    InputBase, InputBaseProps, styled
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {debounce} from "../../../../../packages/core-sdk/utils/common";

const ShadedInput = styled(InputBase)<InputBaseProps>(({ theme }) => {
    return {
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        border: '1px solid ' + theme.palette.grey[200]
    };
});

interface AssetPickerState{
    searchText: string,
    assets: A_Asset[],
    searching: boolean,
    searchBy: string
}

const initialState: AssetPickerState = {
    searchText: '',
    assets: [],
    searching: false,
    searchBy: 'name'
};

interface AssetPickerProps{
    show: boolean,
    title?: string,
    onPick?: Function,
    onClose?: Function
}

function AssetPicker({show = false, title = 'Search assets', onPick = () => {}, onClose = () => {}}: AssetPickerProps): JSX.Element {

    const dispatch = useDispatch();


    const [
        {assets, searchText, searching, searchBy},
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState});
    };

    useEffect(() => {
        async function search() {
            const assetClient = new AssetClient(dappflow.network);
            try {
                setState(prevState => ({...prevState, searching: true, assets: []}));
                let result: any;

                if (searchBy === 'name') {
                    result = await assetClient.searchForAssetsByName(searchText);
                }
                else if (searchBy === 'id') {
                    if (isNumber(searchText)) {
                        result = await assetClient.searchForAssetsByIndex(Number(searchText));
                    }
                    else {
                        setState(prevState => ({...prevState, searching: false}));
                    }
                }

                if (result) {
                    setState(prevState => ({...prevState, assets: result.assets, searching: false}));
                }
            }
            catch (e: any) {
                dispatch(handleException(e));
                setState(prevState => ({...prevState, searching: false}));
            }
        }

        if(searchText) {
            search();
        }
        else {
            setState(prevState => ({...prevState, assets: []}));
        }
    }, [searchText, dispatch, searchBy]);

    function handleClose() {
        clearState();
        onClose();
    }

    return (<div>
        {show ? <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            onClose={handleClose}
            open={show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <div style={{fontWeight: "bold", fontSize: 18}}>{title}</div>
                    </div>
                    <div>
                        <CloseIcon className="modal-close-button" onClick={handleClose}/>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="asset-picker-wrapper">
                    <div className="asset-picker-container">
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <ButtonGroup variant="outlined" color="primary" size={"small"}>
                                    <Button
                                        className="black-button"
                                        variant={searchBy === 'name' ? 'contained' : 'outlined'} onClick={() => {
                                        setState(prevState => ({...prevState, searchBy: 'name'}));
                                    }}>Asset Name</Button>
                                    <Button
                                        className="black-button"
                                        variant={searchBy === 'id' ? 'contained' : 'outlined'} onClick={() => {
                                        setState(prevState => ({...prevState, searchBy: 'id'}));
                                    }}>Asset Id</Button>
                                </ButtonGroup>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <ShadedInput
                                    placeholder={searchBy === 'name' ? 'Planet watch' : '87234773'}
                                    onChange={(ev) => {
                                        debounce(() => {
                                            setState(prevState => ({...prevState, searchText: ev.target.value}));
                                        }, 1000)();
                                    }}
                                    fullWidth/>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                {searching ? <div className="searching">
                                    <CircularProgress style={{marginTop: 100}}/>
                                    <div className="text">searching ...</div>
                                </div> : <div>

                                    {assets.length === 0 ? <div className="no-results">
                                        No results found
                                    </div> : <div className="searched-assets">
                                        {assets.map((asset) => {
                                            return (<div className="asset" key={asset.index} onClick={() => {
                                                onPick(asset);
                                                clearState();
                                            }}>
                                                <span>{asset.params.name}</span>
                                                <div style={{marginTop: '5px'}}>ID: {asset.index}</div>
                                            </div>);
                                        })}
                                    </div>}

                                </div>}

                            </Grid>
                        </Grid>



                        <div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog> : ''}
    </div>);
}

export default AssetPicker;
