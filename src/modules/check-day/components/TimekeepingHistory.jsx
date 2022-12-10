import Dialog from "../../../components/Dialog";

export default function TimekeepingHistory({ closeDialogCb, date }) {
    return <Dialog
        sx={{ position: 'relative' }}
        primaryAction={{
            text: "Submit",
            handler: () => {
            },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Lịch sử chấm công ngày"
    >
    </Dialog>;
}