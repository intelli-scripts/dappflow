import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {hideSnack} from '../../redux/common/actions/snackbar';
import {Alert, Snackbar} from "@mui/material";
import {theme} from "../../theme";


function AppSnackbar(): JSX.Element {
    const snackbar = useSelector((state: RootState) => state.snackbar)
    const dispatch = useDispatch();

    // @ts-ignore
    return (<Snackbar
        style={{bottom: 20}}
        open={snackbar.show}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom',
            horizontal: 'right' }}
        onClose={() => {dispatch(hideSnack())}}>
            <Alert
                sx={{
                        color: theme.palette.common.black,
                        borderRadius: 0,
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        minWidth: '400px',
                    borderLeft: '4px solid ' + theme.palette.grey[600]
                    }}
                icon={false}
                severity={snackbar.severity}
                onClose={() => {dispatch(hideSnack())}}>
                <span dangerouslySetInnerHTML={{__html: snackbar.message}}></span>
            </Alert>
    </Snackbar>);
}

export default AppSnackbar;
