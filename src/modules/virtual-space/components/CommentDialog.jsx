import React from "react";
import { useFormik } from "formik";
import { useAddTaskComment } from "../../../client/taskService";
import { getCurrentUserId } from "../../../client/autheticationService";
import Dialog from "../../../components/Dialog";
import RichTextEditor, { initialValue } from "./RichTextEditor";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function CommentDialog({ taskId, reload, closeDialogCb }) {
    const [comment, setComment] = React.useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        method: addTaskComment,
    } = useAddTaskComment();

    React.useEffect(() => {
        if (isSuccess) {
            reload();
            closeDialogCb();
        }
    }, [isSuccess])

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
        <LoadingOverlay isLoading={isPending}/>
        <RichTextEditor
            onChange={(value) => {
                setComment(value);
            }}
            value={comment ?? initialValue}
        />
    </Dialog>;
}