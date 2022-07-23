import React from 'react';
import './ArcPortal.scss';
import {Outlet} from "react-router-dom";


function ArcPortal(): JSX.Element {


  return (
      <div className="arc-portal-root">
          <div style={{marginTop: 200, fontSize: 30}}>Coming soon ...</div>
          <Outlet />
      </div>
  );
}

export default ArcPortal;
