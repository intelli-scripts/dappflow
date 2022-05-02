import './Loader.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {CircularProgress} from "@mui/material";

function Loader(): JSX.Element {
    const loader = useSelector((state: RootState) => state.loader);

  return (
      <div>
          {loader.count ? <div>
              <div className="loading-box">
                  <CircularProgress color={"primary"} className="progress-bar"></CircularProgress>
                  <div className="message">
                      {loader.message}
                  </div>
              </div>
              <div className="loader-wrapper">
              </div>
          </div> : ''}
      </div>
  );
}

export default Loader;
