import { Typography } from "@mui/material";
import Dialog from "./Dialog";


export default function InfoDialog({
    title,
    message,
    closeDialogCb = () => { }
}) {

    return <Dialog title={title}
        secondaryAction={{ text: "Close", handler: closeDialogCb }}
    >
        <Typography>{message}</Typography>
    </Dialog>;
}