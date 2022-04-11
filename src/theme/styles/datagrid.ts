import {theme} from "../index";

export const dataGridCellConfig = {
    sortable: false,
    editable: false,
    flex: 1,
    disableColumnMenu: true,
};

export const dataGridStyles = {
    '.MuiDataGrid-columnSeparator': {
        display: 'none',
    },
    '.MuiDataGrid-row:nth-of-type(even)': {
        backgroundColor: theme.palette.grey["100"]
    },
    '.MuiDataGrid-row:hover': {
        backgroundColor: theme.palette.grey["200"] + ' !important'
    },
    '.MuiDataGrid-cell:focus': {
        outline: "none"
    },
    '.MuiDataGrid-columnHeader:focus': {
        outline: "none"
    },
    '.MuiDataGrid-columnHeader': {
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    }
};