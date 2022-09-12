import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./AppRouter";
import {useDispatch} from "react-redux";
import {loadNodeVersions} from "../../redux/network/actions/node";



function App(): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNodeVersions());
    }, []);

  return (
      <div className="app-root">
          <AppRouter></AppRouter>
      </div>
  );
}

export default App;
