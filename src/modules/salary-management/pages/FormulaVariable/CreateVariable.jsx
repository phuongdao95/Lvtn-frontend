import React from "react";
import { Fragment } from "react";
import { Box } from "@mui/system";

import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DialogForm/Select";

import { checkIfVariableDefineValid, checkIfVariableNameValid, useCreateVariable } from "../../../../client/variableService";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    displayName: yup.string().required(),
    value: yup.string().required(),
    describe: yup.string()
});

export default function CreateVariable({ closeDialogCb, id }) {
    const {
        isSuccess: isCreateVariableSuccess,
        method: createVariable,
    } = useCreateVariable();

    const [nameError, setNameError] = React.useState(null);
    const [formulaDefineError, setFormulaDefineError] = React.useState(null);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            displayName: "",
            value: "",
            dataType: "Integer",
            description: "",
            area: 'salaryconfig',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const doesSalaryNameExist = await checkIfVariableNameValid(values);
            const isSalaryDefineValid = await checkIfVariableDefineValid(values);

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
                createVariable(values)
            }
        }
    })

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới biến"
    >
        <DialogForm>
            <Box>
                {isInfoDialogOpen && <InfoDialog
                    closeDialogCb={() => setIsInfoDialogOpen(false)}
                    title={"Lỗi"}
                    message={<>
                        {nameError} <br />
                        {formulaDefineError}
                    </>}
                />}
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên biến"} />
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
                    firstSlot={<Fragment>
                        <Label text={"Datatype"} />
                        <Select
                            id="dataType"
                            name="dataType"
                            menu={[
                                { label: "Boolean", value: "Boolean" },
                                { label: "Integer", value: "Integer" },
                                { label: "Text", value: "Text" },
                                { label: "Decimal", value: "Decimal" }]}
                            value={formik.values.dataType}
                            onChange={formik.handleChange}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
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
                                id="value"
                                name="value"
                                onChange={formik.handleChange}
                                value={formik.values.value}
                                error={formik.touched.value && Boolean(formik.errors.value)}
                                helperText={formik.touched.value && formik.errors.value}
                            />
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"mô tả"} />
                            <TextField
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
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