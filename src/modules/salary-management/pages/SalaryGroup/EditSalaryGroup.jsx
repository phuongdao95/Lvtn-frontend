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

export default function EditSalaryGroup({ closeDialogCb }) {
    const [groupOptions, setGroupOptions] = React.useState([]);

    const {
        isSuccess,
        method: fetchGroups,
        data: fetchedGroups
    } = useFetchListGroup();

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            formulaName: "",
            group: {
                id: "",
                name: "",
            }
        }
    });

    React.useEffect(() => {
        fetchGroups();
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const groupOptions = fetchedGroups.data.map((group) =>
                ({ id: group.id, name: group.name }));
            setGroupOptions(groupOptions)
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
        title="Chỉnh sửa salary config"
    >
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