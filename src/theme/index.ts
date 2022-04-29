import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {

    }
    interface ThemeOptions {

    }
}

export const theme = createTheme({
    shape: {
        //borderRadius: 10,
    },
    palette: {
        primary: {
            main: '#635bff',//635bff//3f51b5//#d4a0ff
        },
        secondary: {
            main: '#f44336'
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "none"
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: '#000'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: 10,
                    ":hover": {
                        boxShadow: 'none',
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 15
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    '&.rounded': {
                        borderRadius: 10
                    }
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '&.related-list': {
                        borderBottom: '1px solid #f0f0f0'
                    }
                }
            }
        }
    }
});