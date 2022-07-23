import './LeftBar.scss';
import {
    Box,
    Button, Tab, Tabs, Tooltip
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import {showSettings} from "../../redux/actions/settings";
import Logo from '../../assets/images/logo-black.png';
import {useLocation, useNavigate} from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import explorer from "../../utils/dappflow";
import {RootState} from "../../redux/store";
import {shadedClr} from "../../utils/common";


function LeftBar(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const liveData = useSelector((state: RootState) => state.liveData);
    const location = useLocation();

    const {connection} = liveData;
    let route = location.pathname;
    route = route.substring(1);
    route = route.split('/')[0];


  return (
      <div className="left-bar-wrapper">
          <div className="left-bar-container" style={{background: shadedClr}}>
              <div className="logo" onClick={() => {
                  navigate('/');
              }}>
                  <div className="text">
                      <img src={Logo} alt="logo"/>
                      Dappflow
                  </div>

              </div>

              <div className="menu-list">

                  <Tabs value={route} orientation={"vertical"}>
                      <Tab label="Explorer" value="explorer" onClick={() => {
                          navigate('/explorer');
                      }}/>
                      <Tab label="Developer API" value="developer-api" onClick={() => {
                          navigate('/developer-api');
                      }}/>
                      <Tab label="ARC's" value="arcs" onClick={() => {
                          navigate('/arcs');
                      }}/>

                  </Tabs>




              </div>

              <div className="footer">

                  <div className="node" onClick={(ev) => {
                      dispatch(showSettings());
                      ev.stopPropagation();
                      ev.preventDefault();
                  }}>

                      <Box className="node-url" sx={{ color: 'grey.500'}}>
                          <Tooltip title={connection.success ? 'Connected' : 'Unable to connect'}>
                              <CircleIcon color={connection.success ? 'success' : 'secondary'} fontSize={"small"} sx={{fontSize: 14, marginTop: -5}}></CircleIcon>
                          </Tooltip>
                          {explorer.network.getAlgodUrl()}
                      </Box>
                  </div>

                  <Button variant={"text"}
                          size={"large"}
                          fullWidth
                          startIcon={<SettingsIcon></SettingsIcon>}
                          onClick={() => {
                              dispatch(showSettings());
                          }}
                  >Settings</Button>

              </div>

          </div>
      </div>
  );
}

export default LeftBar;
