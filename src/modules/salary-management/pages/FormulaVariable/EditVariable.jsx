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

const parseAreaFromNumber = (n) => {
    switch (n) {
        case 0:
            return "kpi";
        case 1:
            return "timekeeping";
        case 2:
            return "salaryconfig";
        case 3:
        default:
            return "salarydelta";
    }
}

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
            area: "salaryconfig"
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateVariable(id, values)
        }
    })

    React.useEffect(() => {
        fetchDetail(id);
    }, [])

    React.useEffect(() => {
        if (fetchedDetail) {
            const { name, displayName, value, dataType, description, area } = fetchedDetail;

            formik.setValues({
                name,
                displayName,
                value,
                dataType,
                description,
                area: parseAreaFromNumber(area)
            })
        }
    }, [fetchedDetail]);


    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Ch???nh s???a bi???n"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"T??n bi???n"} />
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                readOnly={true}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"T??n hi???n th???"} />
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
                        <Label text={"Ki???u d??? li???u"} />
                        <Select
                            readOnly
                            id="dataType"
                            name="dataType"
                            menu={[
                                { label: "Boolean", value: "Boolean" },
                                { label: "Integer", value: "Integer" },
                                { label: "Text", value: "Text" },
                                { label: "Decimal", value: "Decimal" },
                            ]}
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
                                readOnly={true}
                                value={formik.values.area}
                                onChange={(event, value) => {
                                    formik.setFieldValue("area", event.target.value)
                                }}
                                menu={[
                                    {
                                        label: "Nh??m l????ng",
                                        value: "salaryconfig",
                                    },
                                    {
                                        label: "T??ng gi???m l????ng",
                                        value: "salarydelta"
                                    },
                                    {
                                        label: "Ch???m c??ng",
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
                            <Label text={"?????nh ngh??a"} />
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
                            <Label text={"M?? t???"} />
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