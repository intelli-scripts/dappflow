import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from "./components/App/App";
import { ConfirmProvider } from "material-ui-confirm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ConfirmProvider>
                <App></App>
            </ConfirmProvider>
        </ThemeProvider>
    </Provider>
);
