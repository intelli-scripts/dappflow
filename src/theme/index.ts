import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {

    }
    interface ThemeOptions {

    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3f50b5',
        },
        secondary: {
            main: '#f44336'
        },
    },
});