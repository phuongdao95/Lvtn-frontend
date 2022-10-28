import React, { Fragment } from "react";
import { Box } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import DialogForm from "../../../../components/DialogForm";
import Label from "../../../../components/DialogForm/Label";
import TextField from "../../../../components/DialogForm/TextField";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";
import { useFormik } from "formik";
import { useFetchListGroup } from "../../../../client/groupService";
import { useCreateSalaryGroup } from "../../../../client/salaryGroupService";

import * as yup from 'yup';
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    formulaName: yup.string().required(),
});

export default function CreateSalaryGroup({ reloadList, closeDialogCb }) {
    const [groupOptions, setGroupOptions] = React.useState([]);

    const {
        isPending: isFetchGroupOptionsPending,
        isSuccess: isFetchGroupOptionsSuccess,
        method: fetchGroups,
        data: fetchedGroups
    } = useFetchListGroup();

    const {
        isPending,
        isSuccess,
        isError,
        method: createSalaryGroup
    } = useCreateSalaryGroup();

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            formulaName: "",
            priority: 1,
            group: {
                id: "",
                name: "",
            }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { group: { id }, ...rest } = values;
            console.log("hello");
            createSalaryGroup({ ...rest, groupId: id })
        }
    });

    React.useEffect(() => {
        fetchGroups();
    }, [])

    React.useEffect(() => {
        if (isFetchGroupOptionsSuccess) {
            const groupOptions = fetchedGroups.data.map((group) =>
                ({ id: group.id, name: group.name }));
            setGroupOptions(groupOptions)
        }
    }, [isFetchGroupOptionsSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            reloadList();
        }
    }, [isSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới salary config"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isFetchGroupOptionsPending || isPending} />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên salary config"} />
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
                            <Label text={"Mô tả"} />
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
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên công thức"} />
                            <TextField
                                id="formulaName"
                                name="formulaName"
                                value={formik.values.formulaName}
                                onChange={formik.handleChange}
                                error={formik.touched.formulaName && Boolean(formik.errors.formulaName)}
                                helperText={formik.touched.formulaName && formik.errors.formulaName}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Độ ưu tiên"} />
                            <TextField
                                id="priority"
                                type="number"
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                error={formik.touched.priority && Boolean(formik.errors.priority)}
                                helperText={formik.touched.priority && formik.errors.priority}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Nhóm người dùng"} />
                            <AutoComplete
                                id="group"
                                name="group"
                                value={formik.values.group}
                                options={groupOptions}
                                onChange={(event, value) => formik.setFieldValue('group', value)}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >;
}