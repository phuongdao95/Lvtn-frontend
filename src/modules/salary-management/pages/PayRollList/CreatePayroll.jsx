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
import { MonthPicker, YearPicker } from "@mui/x-date-pickers";
import Select from "../../../../components/DialogForm/Select";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
});

function generateYears() {
    return Array.from({ length: 200 }, (_, i) => i + 2020)
}

function generateMonths() {
    return Array.from({ length: 12 }, (_, i) => i + 1);
}

export default function CreatePayroll({ closeDialogCb }) {
    const navigate = useNavigate();

    const { method: createPayroll } =
        useCreatePayroll();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            month: 10,
            year: 2022,
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
                            <Label text={"Tháng"} />
                            <Select
                                value={formik.values.month}
                                onChange={(event) => {
                                    formik.setFieldValue("month", event.target.value);
                                }}
                                menu={[
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                                ].map((value) => ({ label: `Tháng ${value}`, value: value }))}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Năm"} />
                            <Select
                                value={formik.values.year}
                                onChange={(event) => {
                                    formik.setFieldValue("year", event.target.value)
                                }}
                                menu={generateYears().map((value) =>
                                    ({ label: `Năm ${value}`, value: value }))}
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