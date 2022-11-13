import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DialogForm from "../../../components/DialogForm";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox";
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import { useFormik } from "formik"
import { useParams } from "react-router";
import { useFetchOneTaskColumn, useUpdateTaskColumn } from "../../../client/taskColumnService";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function ColumnEdit({ columnId, closeDialogCb = () => { }, reload = () => { } }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: updateTaskColumn,
    } = useUpdateTaskColumn();

    const {
        isPending: isFetchTaskColumnPending,
        isSuccess: isFetchTaskColumnSuccess,
        isError: isFetchTaskColumnError,
        method: fetchTaskColumn,
        data: taskColumn
    } = useFetchOneTaskColumn();

    const { id: boardId } = useParams();


    const formik = useFormik({
        initialValues: {
            name: "",
            order: 0,
            description: "",
        },
        onSubmit: (values) => {
            updateTaskColumn(columnId, { ...values, boardId: boardId })
        }
    });

    React.useEffect(() => {
        fetchTaskColumn(columnId);
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            reload();
            closeDialogCb();
        }
    }, [isSuccess])

    React.useEffect(() => {
        if (isFetchTaskColumnSuccess) {
            formik.setValues({
                name: taskColumn.name,
                order: taskColumn.order,
                description: taskColumn.description,
            })
        }
    }, [isFetchTaskColumnSuccess]);

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa cột"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isPending || isFetchTaskColumnPending}/>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên Cột"} />
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
                            <Label text={"Thứ tự"} />
                            <TextField id="order"
                                type="number"
                                value={formik.values.order}
                                onChange={formik.handleChange}
                                error={formik.touched.order && Boolean(formik.errors.order)}
                                helperText={formik.touched.order && formik.errors.order}
                            />

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