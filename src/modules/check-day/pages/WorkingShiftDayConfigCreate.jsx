import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../components/DialogForm/TextField";
import DialogForm from "../../../components/DialogForm";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import Select from "../../../components/DialogForm/Select";

import DatePicker from "../../../components/DialogForm/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { useCreateWorkingShiftDayConfig } from "../../../client/workingShiftService";
import dayjs from "dayjs";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string()
});

export default function WorkingShiftDayConfigCreate({ reloadList, closeDialogCb }) {
    const {
        isError: isCreateRoleError,
        isPending: isCreateRolePending,
        isSuccess: isCreateRoleSuccess,
        method: createRole
    } = useCreateWorkingShiftDayConfig();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            date: dayjs(),
            type: 'holiday'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createRole({ ...values });
        }
    })

    React.useEffect(() => {
        if (isCreateRoleSuccess) {
            reloadList();
            closeDialogCb();
        }
    }, [isCreateRoleSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới ngày nghỉ"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isCreateRolePending} />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên ngày nghỉ"} />
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Mô tả"}
                            />
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

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Ngày"} />
                            <DatePicker
                                name="date"
                                value={formik.values.date}
                                onChange={(value) => formik.setFieldValue("date", value)}
                                error={formik.touched.date && Boolean(formik.errors.date)}
                                helperText={formik.touched.date && formik.errors.date}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Loại ngày nghỉ"} />
                            <Select
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                menu={[
                                    {
                                        label: "Holiday",
                                        value: "holiday"
                                    },
                                ]}
                            />
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >;
}