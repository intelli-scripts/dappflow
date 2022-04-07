import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {hideSnack} from '../../redux/actions/snackbar';
import {Alert, Snackbar} from "@mui/material";


function AppSnackbar(): JSX.Element {
    const snackbar = useSelector((state: RootState) => state.snackbar)
    const dispatch = useDispatch();

    return (<Snackbar
        style={{top: 75}}
        open={snackbar.show}
        anchorOrigin={{ vertical: 'top',
            horizontal: 'center' }}
        autoHideDuration={5000} onClose={() => {dispatch(hideSnack())}}>
        <Alert
            style={{borderRadius: 10}}
            icon={false}
            severity={snackbar.severity}
            onClose={() => {dispatch(hideSnack())}}>
            {snackbar.message}
        </Alert>
    </Snackbar>);
}

export default AppSnackbar;
