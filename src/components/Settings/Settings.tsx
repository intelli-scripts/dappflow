import './Settings.scss';

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import React from "react";
import {hideSettings} from "../../redux/actions/settings";
import {CancelOutlined} from "@mui/icons-material";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";

function Settings(): JSX.Element {

    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);
    const {show} = settings;

    return (<div>
        {show ? <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={show}
        >
            <DialogTitle >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>

                    </div>
                    <IconButton color="primary" onClick={() => {
                        dispatch(hideSettings());
                    }}>
                        <CancelOutlined />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="settings-wrapper">
                    <div className="settings-container">
                        Settings
                    </div>
                </div>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog> : ''}
    </div>);
}

export default Settings;
