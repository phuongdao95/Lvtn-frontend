import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import DialogForm from "../../../../components/DialogForm";
import Label from "../../../../components/DialogForm/Label";
import TextField from "../../../../components/DialogForm/TextField";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";

import { useFormik } from "formik";
import { useCreatePayroll } from "../../../../client/payrollService";

import dayjs from "dayjs";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox";
import Select from "../../../../components/DialogForm/Select";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
});

function generateYears() {
    return Array.from({ length: 5 }, (_, i) => i + 2020)
}

export default function CreateIssue({ reload, closeDialogCb }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: createPayroll
    } = useCreatePayroll();

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

    React.useEffect(() => {
        if (isSuccess) {
            closeDialogCb();
            reload();
        }
    }, [isSuccess])

    return <Dialog
        primaryAction={{
            text: "Lưu",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title="Tạo mới Payroll"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isPending} />
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