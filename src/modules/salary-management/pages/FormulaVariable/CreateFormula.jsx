import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { checkIfSalaryDefineValid, checkIfSalaryNameValid, useCreateFormula } from "../../../../client/formulaService";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "../../../../components/DialogForm/Select";
import InfoDialog from "../../../../components/Dialog/InfoDialog";

const validationSchema = yup.object().shape({
    name: yup.string()
        .matches(/[_a-z][_a-z0-9]{0,30}/, "Tên hiển thị phải viết liền không dấu, viết thường, bao gồm a-z,0-9 và có thể cách nhau bởi dấu '_'")
        .required("Tên là trường bắt buộc"),
    displayName: yup.string().required("Tên hiển thị là trường bắt buộc"),
    define: yup.string().required("Định nghĩa công thức là trường bắt buộc"),
    description: yup.string()
});

export default function CreateFormula({ closeDialogCb }) {
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [nameError, setNameError] = React.useState(null);
    const [formulaDefineError, setFormulaDefineError] = React.useState(null);

    const {
        method: createFormula
    } = useCreateFormula();

    const formik = useFormik({
        initialValues: {
            name: "",
            displayName: "",
            define: "",
            description: "",
            formulaArea: "salaryconfig",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const doesSalaryNameExist = await checkIfSalaryNameValid(values);
            const isSalaryDefineValid = await checkIfSalaryDefineValid(values);

            if (!isSalaryDefineValid) {
                setNameError('Định nghĩa công thức không hợp lệ')
            }

            if (doesSalaryNameExist) {
                setFormulaDefineError('Tên công thức đã tồn tại');
            }

            if (doesSalaryNameExist || !isSalaryDefineValid) {
                setIsInfoDialogOpen(true);
            }

            if (!doesSalaryNameExist && isSalaryDefineValid) {
                createFormula(values);
            }
        }
    })

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.handleSubmit() },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới công thức"
    >
        {isInfoDialogOpen && <InfoDialog
            closeDialogCb={() => setIsInfoDialogOpen(false)}
            title={"Lỗi"}
            message={<>
                {nameError} <br />
                {formulaDefineError}
            </>}
        />}
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
                            <Label text={"formulaArea"} />
                            <Select
                                id="formulaArea"
                                name="formulaArea"
                                value={formik.values.formulaArea}
                                onChange={(event, value) => {
                                    formik.setFieldValue("formulaArea", event.target.value)
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
                                error={formik.touched.formulaArea && Boolean(formik.errors.formulaArea)}
                                helperText={formik.touched.formulaArea && formik.errors.formulaArea}
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