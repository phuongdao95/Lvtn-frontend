import React from "react";
import { useFormik } from "formik";
import { useUpdateTaskDescription } from "../../../client/taskService";
import Dialog from "../../../components/Dialog";
import RichTextEditor, { initialValue } from "./RichTextEditor";

export default function DescriptionDialog({ taskId, closeDialogCb, description }) {
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

    return <Dialog title={"Edit Description"}
        primaryAction={{
            handler: () => {
                formik.submitForm();
            },
            text: "Post"
        }}
        secondaryAction={{
            handler: closeDialogCb,
            text: "Cancel"
        }}
    >
        <RichTextEditor
            onChange={(value) => {
                setFormDescription(value);
            }}
            value={formDescription ?? initialValue}
        />
    </Dialog>;
}