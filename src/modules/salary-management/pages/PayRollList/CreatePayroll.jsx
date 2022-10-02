import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import DialogForm from "../../../../components/DialogForm";
import Label from "../../../../components/DialogForm/Label";
import TextField from "../../../../components/DialogForm/TextField";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import DatePicker from "../../../../components/DialogForm/DatePicker";

import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useCreatePayroll } from "../../../../client/payrollService";

import dayjs from "dayjs";
import * as yup from "yup";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
});

export default function CreatePayroll({ closeDialogCb }) {
    const navigate = useNavigate();

    const { method: createPayroll } =
        useCreatePayroll();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            fromDate: dayjs().subtract(1, 'month'),
            toDate: dayjs(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createPayroll(values);
        }
    });

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới Payroll"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên payroll"} />
                            <TextField id="name"
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

                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Từ ngày"} />
                            <DatePicker id="fromDate"
                                name="fromDate"
                                value={formik.values.fromDate}
                                onChange={(value) => formik.setFieldValue("fromDate", value)}
                                error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
                                helperText={formik.touched.fromDate && formik.errors.fromDate}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Đến ngày"} />
                            <DatePicker id="toDate"
                                name="toDate"
                                onChange={(value) => { formik.setFieldValue("toDate", value) }}
                                value={formik.values.toDate}
                                error={formik.touched.toDate && Boolean(formik.errors.toDate)}
                                helperText={formik.touched.toDate && formik.errors.toDate}
                            />
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Mô tả"} />
                        <TextField
                            id="description"
                            multiline
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