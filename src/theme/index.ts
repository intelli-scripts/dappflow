import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {

    }
    interface ThemeOptions {

    }
}

const primaryColor = '#6633CC';//6633CC//6b46fe

export const theme = createTheme({
    shape: {
        borderRadius: 10,
    },
    palette: {
        primary: {
            main: primaryColor
        },
        secondary: {
            main: '#f44336',
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
                },
                contained: {
                    '&.black-button': {
                        background: '#000'
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
                },
                standardWarning: {
                    color: '#000'
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '&.related-list': {
                        borderBottom: '1px solid #f0f0f0'
                    },
                    '& .MuiTabs-indicator': {
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                    },
                    '& .MuiTabs-indicatorSpan': {
                        maxWidth: '70%',
                        width: '100%',
                        backgroundColor: primaryColor
                    },
                }
            }
        }
    }
});