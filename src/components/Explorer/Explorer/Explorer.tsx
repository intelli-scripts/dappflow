import React from 'react';
import './Explorer.scss';
import {useDispatch} from "react-redux";
import {initLivedata} from "../../../redux/actions/liveData";
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";


function Explorer(): JSX.Element {

    const dispatch = useDispatch();
    dispatch(initLivedata());

  return (
      <div className="explorer-root">
          <Header></Header>
          <Outlet />
      </div>
  );
}

export default Explorer;
