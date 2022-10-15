import {theme} from "../index";
import {shadedClr} from "../../utils/common";

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
    '.MuiDataGrid-row:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.white
    },
    // '.MuiDataGrid-row:nth-of-type(even)': {
    //     backgroundColor: shadedClr
    // },
    '.MuiDataGrid-row:hover': {
        backgroundColor: shadedClr + ' !important'
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

export const dataGridStylesBlackHeader = {
    ...dataGridStyles,
    '.MuiDataGrid-columnHeader': {
        background: theme.palette.common.black,
        color: theme.palette.common.white
    }
};