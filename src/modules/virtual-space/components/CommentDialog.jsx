import React from "react";
import { useFormik } from "formik";
import { useAddTaskComment } from "../../../client/taskService";
import { getCurrentUserId } from "../../../client/autheticationService";
import Dialog from "../../../components/Dialog";
import RichTextEditor, { initialValue } from "./RichTextEditor";

export default function CommentDialog({ taskId, closeDialogCb }) {
    const [comment, setComment] = React.useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        method: addTaskComment,
    } = useAddTaskComment();

    const formik = useFormik({
        initialValues: {

        },
        onSubmit: (values) => {
            addTaskComment(taskId, {
                message: JSON.stringify(comment),
                userId: getCurrentUserId(),
            });
        }
    })

    return <Dialog title={"Write a comment"}
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
                setComment(value);
            }}
            value={comment ?? initialValue}
        />
    </Dialog>;
}