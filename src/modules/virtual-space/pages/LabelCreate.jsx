import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DialogForm from "../../../components/DialogForm";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox";
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import { useFormik } from "formik"

import { useCreateTaskLabel } from "../../../client/taskLabelService";
import { useParams } from "react-router";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function LabelCreate({ closeDialogCb = () => { }, reload }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: createTaskLabel,
    } = useCreateTaskLabel();

    const { id: boardId } = useParams();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        onSubmit: (values) => {
            createTaskLabel({ ...values, taskBoardId: boardId })
        }
    });

    React.useEffect(() => {
        if (isSuccess) {
            reload();
            closeDialogCb();
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
        title="Tạo mới Nhãn"
    >
        <LoadingOverlay isLoading={isPending}/>
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên Nhãn"} />
                            <TextField id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}