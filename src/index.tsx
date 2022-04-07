import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App></App>
        </ThemeProvider>
    </Provider>
);
