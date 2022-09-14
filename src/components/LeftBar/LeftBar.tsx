import './LeftBar.scss';
import {
    Box,
    Button, Tab, Tabs, Tooltip
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import {showSettings} from "../../redux/settings/actions/settings";
import Logo from '../../assets/images/logo-black.png';
import {useLocation, useNavigate} from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import explorer from "../../utils/dappflow";
import {RootState} from "../../redux/store";
import {shadedClr, shadedClr1} from "../../utils/common";
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import GavelIcon from '@mui/icons-material/Gavel';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ShowerIcon from '@mui/icons-material/Shower';
import InsertChartIcon from '@mui/icons-material/InsertChart';



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

                  <Tabs value={route} orientation={"vertical"} sx={{'.Mui-selected': {
                          backgroundColor: shadedClr1,
                      },
                      '.MuiTabs-indicator': {
                            display: "none"
                      }
                  }}>
                      <Tab icon={<StorageIcon></StorageIcon>} iconPosition="start" label="Explorer" value="explorer" onClick={() => {
                          navigate('/explorer');
                      }}/>
                      <Tab icon={<CodeIcon></CodeIcon>} iconPosition="start" label="Developer API" value="developer-api" onClick={() => {
                          navigate('/developer-api');
                      }}/>
                      <Tab icon={<GavelIcon></GavelIcon>} iconPosition="start" label="ARC Portal" value="arc-portal" onClick={() => {
                          navigate('/arc-portal');
                      }}/>
                      <Tab icon={<DeveloperBoardIcon></DeveloperBoardIcon>} iconPosition="start" label="ABI Studio" value="abi-studio" onClick={() => {
                          navigate('/abi-studio');
                      }}/>
                      <Tab icon={<ShowerIcon></ShowerIcon>} iconPosition="start" label="Dispenser" value="dispenser" onClick={() => {
                          navigate('/dispenser');
                      }}/>
                      <Tab icon={<InsertChartIcon></InsertChartIcon>} iconPosition="start" label="Node Status" value="node-status" onClick={() => {
                          navigate('/node-status');
                      }}/>

                  </Tabs>




              </div>

              <div className="footer">

                  <Button variant={"text"}
                          size={"large"}
                          fullWidth
                          startIcon={<SettingsIcon></SettingsIcon>}
                          onClick={() => {
                              dispatch(showSettings());
                          }}
                  >Settings</Button>

                  <div className="node" onClick={(ev) => {
                      dispatch(showSettings());
                      ev.stopPropagation();
                      ev.preventDefault();
                  }}>

                      <Box className="node-url" sx={{ color: 'grey.700'}}>
                          <Tooltip title={connection.success ? 'Connected' : 'Unable to connect'}>
                              <CircleIcon color={connection.success ? 'success' : 'secondary'} fontSize={"small"} sx={{fontSize: 14, marginTop: -5}}></CircleIcon>
                          </Tooltip>
                          {explorer.network.getAlgodUrl()}
                      </Box>
                  </div>



              </div>

          </div>
      </div>
  );
}

export default LeftBar;
