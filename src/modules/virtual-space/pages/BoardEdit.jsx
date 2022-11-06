import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DialogForm from "../../../components/DialogForm";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox";
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import { useFormik } from "formik"

import { useFetchOneTaskBoard, useUpdateTaskBoard } from "../../../client/taskboardService";
import { getCurrentUserId } from "../../../client/autheticationService";

export default function BoardEdit({ boardId, closeDialogCb = () => { }, createSuccessCb = () => { } }) {
    const {
        isPending: isFetchDetailPending,
        isSuccess: isFetchDetailSuccess,
        isError: isFetchDetailError,
        method: fetchDetail,
        data: detail
    } = useFetchOneTaskBoard();

    const {
        isPending,
        isSuccess,
        isError,
        method: updateTaskBoard,
    } = useUpdateTaskBoard();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        onSubmit: (values) => {
            updateTaskBoard(boardId, { ...values, userId: getCurrentUserId() })
        }
    });

    React.useEffect(() => {
        fetchDetail(boardId);
    }, [])

    React.useEffect(() => {
        if (detail) {
            formik.setValues({
                name: detail.name,
                description: detail.description
            })
        }
    }, [isFetchDetailSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa Board"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên Board"} />
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