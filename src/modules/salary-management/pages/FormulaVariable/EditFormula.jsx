import React from "react";
import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DataGrid/Select";

import { useUpdateFormula, useFetchOneFormula } from "../../../../client/formulaService";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string()
        .required()
        .matches(/[_a-zA-Z][_a-zA-Z0-9]{0,30}/, "Tên hiển thị phải hiển thị chuẩn"),
    displayName: yup.string().required(),
    define: yup.string().required(),
    description: yup.string()
});

export default function EditFormula({ formulaId, closeDialogCb }) {
    const {
        isSuccess,
        isError,
        isPending,
        method: updateFormula
    } = useUpdateFormula();

    const {
        isSuccess: isFetchOneSuccess,
        isError: isFetchOneError,
        isPending: isFetchOnePending,
        method: fetchFormula,
        data: fetchedFormula,
    } = useFetchOneFormula();

    const formik = useFormik({
        initialValues: {
            name: "",
            displayName: "",
            define: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateFormula(formulaId, values);
        }
    })

    React.useEffect(() => {
        fetchFormula(formulaId);
    }, [])

    React.useEffect(() => {
        if (isFetchOneSuccess) {
            formik.setValues(fetchedFormula)
        }
    }, [isFetchOneSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.handleSubmit() },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa công thức"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên"} />
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
                            <Label text={"Tên hiển thị"} />
                            <TextField
                                id="displayName"
                                name="displayName"
                                value={formik.values.displayName}
                                onChange={formik.handleChange}
                                error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                                helperText={formik.touched.displayName && formik.errors.displayName}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Area"} />
                            <Select
                                id="area"
                                name="area"
                                value={formik.values.area}
                                onChange={(event, value) => {
                                    formik.setFieldValue("area", event.target.value)
                                }}
                                menu={[
                                    {
                                        label: "Nhóm lương",
                                        value: "salaryconfig",
                                    },
                                    {
                                        label: "Tăng giảm lương",
                                        value: "salarydelta"
                                    },
                                    {
                                        label: "Chấm công",
                                        value: "timekeeping"
                                    },
                                    {
                                        label: "KPI",
                                        value: "kpi"
                                    },
                                ]}
                                error={formik.touched.area && Boolean(formik.errors.area)}
                                helperText={formik.touched.area && formik.errors.area}
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
                            <Label text={"Định nghĩa"} />
                            <TextField
                                id="define"
                                name="define"
                                value={formik.values.define}
                                onChange={formik.handleChange}
                                error={formik.touched.define && Boolean(formik.errors.define)}
                                helperText={formik.touched.define && formik.errors.define}
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