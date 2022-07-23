import React from 'react';
import './App.scss';
import AppRouter from "./AppRouter";



function App(): JSX.Element {

  return (
      <div className="app-root">
          <AppRouter></AppRouter>
      </div>
  );
}

export default App;
