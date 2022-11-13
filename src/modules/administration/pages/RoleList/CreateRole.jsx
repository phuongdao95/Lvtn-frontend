import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Checkbox, Typography } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import DialogFormTableLayout from "../../../../layouts/DialogFormTableLayout";
import BasicTable from "../../../../components/BasicTable/BasicTable";

import { useFormik } from "formik";
import { useCreateRole } from "../../../../client/roleService";
import * as yup from "yup";
import { useFetchListPermission } from "../../../../client/permisisonService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";


const getPermissionColumnConfig = () => {
    return [
        {
            field: 'check',
            size: "small"
        },
        {
            field: "module",
            headerName: "Module",
            size: "small"
        },
        {
            field: "name",
            headerName: "Permission",
            size: "small",
        },
    ]
}

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string()
});

export default function CreateRole({ reloadList, closeDialogCb }) {
    const {
        isError: isCreateRoleError,
        isPending: isCreateRolePending,
        isSuccess: isCreateRoleSuccess,
        method: createRole
    } = useCreateRole();


    const {
        isPending: isPermissionListPending,
        isSuccess: isPermissionListSuccess,
        data: permissionList,
        method: fetchPermissionList,
    } = useFetchListPermission();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            permissionIds: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createRole({ ...values });
        }
    })

    React.useEffect(() => {
        if (isCreateRoleSuccess) {
            reloadList();
            closeDialogCb();
        }
    }, [isCreateRoleSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới chức vụ"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isCreateRolePending} />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên chức vụ"} />
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
                            <Label text={"Mô tả"}
                            />
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

                <OneColumnBox
                    slot={<DialogFormTableLayout
                        searchSection={<Fragment></Fragment>}
                        tableSection={
                            <Fragment>
                                <Typography>Danh sách quyền tài nguyên</Typography>
                                <BasicTable
                                    rows={permissionList?.data?.filter(permission => permission.module !== 'page_access')
                                        .map((permission) => ({
                                            check: <Checkbox size="small" />,
                                            module: <p style={{ textTransform: 'capitalize' }}>
                                                {permission.module}</p>,
                                            name: <p style={{ textTransform: 'capitalize' }}>
                                                {permission.name}</p>,
                                            description: permission.description,
                                        })) ?? []}
                                    columns={getPermissionColumnConfig()}
                                    maxHeight={'250px'}
                                />
                            </Fragment>
                        }
                    />}
                />

                <OneColumnBox
                    slot={<DialogFormTableLayout
                        searchSection={<Fragment></Fragment>}
                        tableSection={
                            <Fragment>
                                <Typography>Danh sách quyền truy cập</Typography>
                                <BasicTable
                                    rows={permissionList?.data?.filter(permission => permission.module === "page_access")
                                        .map((permission) => ({
                                            check: <Checkbox size="small"
                                                checked={formik.values.permissionIds.includes(permission.id)}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        formik.setFieldValue('permissionIds', [
                                                            ...formik.values.permissionIds,
                                                            permission.id
                                                        ]);
                                                    } else {
                                                        formik.setFieldValue('permissionIds', [
                                                            ...formik.values.permissionIds.
                                                                filter(p => p !== permission.id)
                                                        ])
                                                    }
                                                }}
                                            />,
                                            module: <p style={{ textTransform: 'capitalize' }}>
                                                {permission.module.split("_").join(" ")}</p>,
                                            name: <p style={{ textTransform: 'capitalize' }}>
                                                {permission.name.split(".")[1]
                                                    .split("_").join(" ")}</p>,
                                        })) ?? []}
                                    columns={getPermissionColumnConfig()}
                                    maxHeight={'250px'}
                                />
                            </Fragment>
                        }
                    />}
                />

            </Box>
        </DialogForm>
    </Dialog >;
}