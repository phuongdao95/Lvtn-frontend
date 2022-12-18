import React, { Fragment } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useFetchOneTaskFile } from "../../../client/taskFileService";
import { useUpdateTaskFile } from "../../../client/taskFileService";
import Dialog from "../../../components/Dialog";
import DialogForm from "../../../components/DialogForm";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function TaskDetailFileEdit({ reload, taskId, fileId, closeDialogCb }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: updateTaskFile,
    } = useUpdateTaskFile();

    const {
        isPending: isFetchOnePending,
        isSuccess: isFetchOneSuccess,
        isError: isFetchOneError,
        method: fetchDetail,
        data: fetchedDetail,
    } = useFetchOneTaskFile();

    const formik = useFormik({
        initialValues: {
            displayName: "",
            description: "",
        },
        onSubmit: (values) => {
            updateTaskFile(fileId, {
                ...values,
            })
        }
    });

    React.useEffect(() => {
        fetchDetail(fileId);
    }, []);

    React.useEffect(() => {
        if (isFetchOneSuccess) {
            formik.setValues({
                displayName: fetchedDetail.displayName,
                description: fetchedDetail.description
            })
        }
    }, [isFetchOneSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            closeDialogCb();
            reload(taskId);
        }
    }, [isSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Sửa file"
    >
        <LoadingOverlay isLoading={isPending} />
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên file"} />
                            <TextField id="displayName"
                                name="displayName"
                                value={formik.values.displayName}
                                onChange={formik.handleChange}
                                error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                                helperText={formik.touched.displayName && formik.errors.displayName}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Mô tả"}
                                id="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                            <TextField />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}