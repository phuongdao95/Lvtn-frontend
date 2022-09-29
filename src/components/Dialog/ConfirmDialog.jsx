import { Typography } from "@mui/material";
import Dialog from "./Dialog";

export default function ConfirmDialog({ title, confirmAction, cancelAction, message }) {
    return <Dialog title={title}
        primaryAction={confirmAction}
        secondaryAction={cancelAction}
    >
        <Typography>{message}</Typography>
    </Dialog>
}