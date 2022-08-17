import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {hideSnack} from '../../redux/common/actions/snackbar';
import {Alert, Snackbar} from "@mui/material";


function AppSnackbar(): JSX.Element {
    const snackbar = useSelector((state: RootState) => state.snackbar)
    const dispatch = useDispatch();

    // @ts-ignore
    return (<Snackbar
        style={{bottom: 50}}
        open={snackbar.show}
        anchorOrigin={{ vertical: 'bottom',
            horizontal: 'center' }}
        autoHideDuration={5000} onClose={() => {dispatch(hideSnack())}}>
        <Alert
            style={{borderRadius: 10}}
            icon={false}
            severity={snackbar.severity}
            onClose={() => {dispatch(hideSnack())}}>
            <span dangerouslySetInnerHTML={{__html: snackbar.message}}></span>
        </Alert>
    </Snackbar>);
}

export default AppSnackbar;
