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
import { useFetchOneSalaryGroup, useUpdateSalaryGroup } from "../../../../client/salaryGroupService";
import { useFetchListFormula } from "../../../../client/formulaService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function EditSalaryGroup({ id, closeDialogCb }) {
    const [groupOptions, setGroupOptions] = React.useState([]);
    const [formulaOptions, setFormulaOptions] = React.useState([]);

    const {
        isSuccess: isFetchListFormulaSuccess,
        isPending: isFetchListFormulaPending,
        isError: isFetchListFormulaError,
        method: fetchFormulaList,
        data: fetchedFormulaList
    } = useFetchListFormula();

    const {
        isSuccess,
        isError,
        isPending,
        method: updateGroup,
    } = useUpdateSalaryGroup();

    const {
        isPending: isFetchListGroupPending,
        isSuccess: isFetchListGroupSuccess,
        method: fetchGroups,
        data: fetchedGroups
    } = useFetchListGroup();

    const {
        isError: isFetchDetailError,
        isSuccess: isFetchDetailSuccess,
        isPending: isFetchDetailPending,
        method: fetchDetail,
        data: fetchedDetail,
    } = useFetchOneSalaryGroup();

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            formulaName: null,
            group: {
                id: "",
                name: "",
            }
        },

        onSubmit: (values) => {
            const groupId = values.group.id;
            updateGroup(id, {
                ...values,
                groupId: groupId,
                formulaName: values.formulaName?.id
            })
        }
    });

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulaOptions(fetchedFormulaList.data.map((formula) => ({ id: formula.name })))
        }
    }, [isFetchListFormulaSuccess])

    React.useEffect(() => {
        fetchDetail(id)
        fetchGroups();
        fetchFormulaList();
    }, [])

    React.useEffect(() => {
        if (isFetchDetailSuccess) {
            const { priority, description, formulaName, groupId, groupName, id, name } = fetchedDetail;

            formik.setValues({
                priority,
                name,
                description,
                formulaName,
                group: {
                    id: groupId,
                    name: groupName,
                },
                formulaName: { id: formulaName }
            })
        }
    }, [isFetchDetailSuccess])

    React.useEffect(() => {
        if (isFetchListGroupSuccess) {
            const groupOptions = fetchedGroups.data.map((group) =>
                ({ id: group.id, name: group.name }));
            setGroupOptions(groupOptions)
        }
    }, [isFetchListGroupSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            fetchDetail(id);
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
        title="Chỉnh sửa nhóm lương"
    >
        <LoadingOverlay isLoading={isPending || isFetchDetailPending || isFetchListGroupPending} />
        <DialogForm>
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
                            <AutoComplete
                                id="formulaName"
                                name="formulaName"
                                options={formulaOptions}
                                value={formik.values.formulaName}
                                getOptionLabel={(option) => option.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, value) => {
                                    formik.setFieldValue("formulaName", value);
                                }}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Độ ưu tiên"} />
                            <TextField
                                id="priority"
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