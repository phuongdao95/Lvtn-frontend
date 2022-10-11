import { Fragment } from "react";
import { Box } from "@mui/system";

import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DialogForm/Select";

import { useCreateVariable } from "../../../../client/variableService";
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
        isSuccess: isCreateVariableSuccess,
        method: createVariable,
    } = useCreateVariable();

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
            createVariable(values)
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
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên công thức"} />
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
                                { label: "Text", value: "text" },
                                { label: "Datetime", value: "datetime" }]}
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
                            <TextField />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}