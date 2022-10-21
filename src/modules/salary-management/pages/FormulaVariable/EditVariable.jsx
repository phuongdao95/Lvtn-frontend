import React, { Fragment } from "react";
import { Box } from "@mui/system";

import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DialogForm/Select";

import { useFetchOneVariable, useUpdateVariable } from "../../../../client/variableService";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    displayName: yup.string().required(),
    value: yup.string().required(),
    describe: yup.string()
});

export default function EditVariable({ closeDialogCb, id }) {
    const {
        isPending: isUpdateVariablePending,
        isError: isUpdateVariableError,
        isSuccess: isCreateVariableSuccess,
        method: updateVariable,
    } = useUpdateVariable();

    const {
        isPending: isFetchDetailPending,
        isError: isFetchDetailError,
        isSuccess: isFetchDetailSuccess,
        method: fetchDetail,
        data: fetchedDetail
    } = useFetchOneVariable();

    const formik = useFormik({
        initialValues: {
            name: "",
            displayName: "",
            value: "",
            dataType: "number",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateVariable(id, values)
        }
    })

    React.useState(() => {
        fetchDetail(id);
    }, []);

    React.useState(() => {
        if (isFetchDetailSuccess) {
            formik.setValues(fetchedDetail);
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
        title="Chỉnh sửa biến"
    >
        <DialogForm>
            <Box>
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
                                { label: "Boolean", value: "boolean" },
                                { label: "Number", value: "number" },
                                { label: "Text", value: "text" }]}
                            value={formik.values.dataType}
                            onChange={formik.handleChange}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
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
                            <Label text={"Description"} />
                            <TextField
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}