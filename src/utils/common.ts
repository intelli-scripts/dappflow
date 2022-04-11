import copy from "copy-to-clipboard";
import {showSnack} from "../redux/actions/snackbar";

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