import React, {useEffect} from 'react';
import './App.scss';
import AppRouter from "./AppRouter";
import {useDispatch} from "react-redux";
import {loadNetworkStatus} from "../../redux/network/actions/network";



function App(): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNetworkStatus());
    }, []);

  return (
      <div className="app-root">
          <AppRouter></AppRouter>
      </div>
  );
}

export default App;
