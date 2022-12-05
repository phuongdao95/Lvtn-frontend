import React from "react";
import { useFormik } from "formik";
import { useUpdateTaskDescription } from "../../../client/taskService";
import Dialog from "../../../components/Dialog";
import RichTextEditor, { initialValue } from "./RichTextEditor";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function DescriptionDialog({ taskId, closeDialogCb, description, reloadDescription }) {
    const {
        isSuccess,
        isPending,
        isError,
        method: updateTaskDescription
    } = useUpdateTaskDescription();

    const [formDescription, setFormDescription] = React.useState(description);

    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            updateTaskDescription(taskId, JSON.stringify(formDescription))
        }
    })

    React.useEffect(() => {
        if (isSuccess) {
            closeDialogCb();
            reloadDescription();
        }
    }, [isSuccess])

    return <Dialog title={"Cập nhật mô tả"}
        primaryAction={{
            handler: () => {
                formik.submitForm();
            },
            text: "Lưu"
        }}
        secondaryAction={{
            handler: closeDialogCb,
            text: "Hủy"
        }}
    >
        <LoadingOverlay isLoading={isPending}/>
        <RichTextEditor
            onChange={(value) => {
                setFormDescription(value);
            }}
            value={formDescription ?? initialValue}
        />
    </Dialog>;
}