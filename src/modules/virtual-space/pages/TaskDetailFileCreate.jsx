import React, { Fragment } from "react";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useCreateTaskFile } from "../../../client/taskFileService";
import Dialog from "../../../components/Dialog";
import DialogForm from "../../../components/DialogForm";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export default function TaskDetailFileCreate({ reload, taskId, closeDialogCb }) {
    const [file, setFile] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        method: createTaskFile,
    } = useCreateTaskFile();

    const formik = useFormik({
        initialValues: {
            displayName: "",
            description: "",
        },
        onSubmit: async (values) => {
            createTaskFile(taskId, {
                ...values,
                extension: file.name.split('.').pop().toLowerCase(),
                file: await toBase64(file)
            })
        }
    });

    React.useEffect(() => {
        if (isSuccess) { 
            reload(taskId);
            closeDialogCb();
        }
    }, [isSuccess, isError])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Thêm file"
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

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"File đính kèm"} />
                            <input type="file"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFile(file);
                                }}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}