import copy from "copy-to-clipboard";
import {showSnack} from "../redux/actions/snackbar";
import {theme} from "../theme";
import pSBC from 'shade-blend-color';

export function copyContent(ev, dispatch, content: string, message: string) {
    copy(content, {
        message: 'Press #{key} to copy',
    });
    ev.preventDefault();
    ev.stopPropagation();
    dispatch(showSnack({
        severity: 'success',
        message
    }));
}

export function isNumber(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function exportData(data: JSON) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
}

export const shadedClr = pSBC(0.95, theme.palette.primary.main);
export const shadedClr1 = pSBC(0.9, theme.palette.primary.main);