import React from "react";
import Dialog from "../../../../components/Dialog";
import DialogForm from "../../../../components/DialogForm";
import { useUploadAvatar } from "../../../../client/userService";
import { getCurrentUserId } from "../../../../client/autheticationService";

export default function UpdateAvatar({ closeDialogCb, userId }) {
    const [file, setFile] = React.useState(null);

    const {
        isPending,
        isError,
        isSuccess,
        method: uploadAvatar,
        data
    } = useUploadAvatar();

    return <Dialog
        primaryAction={{
            text: "Lưu",
            handler: () => {
                if (file !== null) {
                    const formData = new FormData();
                    formData.append('file', file);
                    uploadAvatar(getCurrentUserId(), formData);
                    closeDialogCb();
                } else {
                    alert('Bạn chưa chọn file');
                }
            },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title="Cập nhật avatar"
    >
        <DialogForm>

            <input type={"file"} onChange={(event) => setFile(event.target.files[0])} />
        </DialogForm>
    </Dialog >;
}