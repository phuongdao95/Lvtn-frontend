import { Snackbar } from "@mui/material";

export default function Toast({ open, autoHideDuration, onClose, message, ...rest }) {
    return <Snackbar open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        message={message}
        {...rest}
    />;
}