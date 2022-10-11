import * as React from 'react';
import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({state, close}) => {
    //type = [success, error, warning, info]
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        close();
    };

    return (
        <MuiSnackbar open={state.open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} >
            <Alert severity={state.type} sx={{ width: '100%' }}>
                {state.message}
            </Alert>
      </MuiSnackbar>
    )
}
export default Snackbar;