export default function InfoDialog(status = "success") {
    switch (status) {
        case "success":
            return <Dialog title={title}
                primaryAction={confirmAction}
                secondaryAction={cancelAction}
            >
                <Typography>{message}</Typography>
            </Dialog>;
        case "info":
            return <Dialog title={title}
                primaryAction={confirmAction}
                secondaryAction={cancelAction}
            >
                <Typography>{message}</Typography>
            </Dialog>;
        case "failure":
            return <Dialog title={title}
                primaryAction={confirmAction}
                secondaryAction={cancelAction}
            >
                <Typography>{message}</Typography>
            </Dialog>;
    }
}