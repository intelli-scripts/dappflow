import React from 'react';
import './ArcPortal.scss';
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import {useDispatch} from "react-redux";
import {loadArcs} from "../../../../redux/arcPortal/actions/arcs";


function ArcPortal(): JSX.Element {
    const dispatch = useDispatch();
    dispatch(loadArcs());

  return (
      <div className="arc-portal-root">
          <div className={"arc-portal-header"}>
              <div>
                  ARC Portal
              </div>
          </div>
          <Header></Header>
          <Outlet />
      </div>
  );

}

export default ArcPortal;
