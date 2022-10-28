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
import { useCreateRole, useFetchOneRole, useFetchPermissionOfRole, useUpdateRole } from "../../../../client/roleService";
import * as yup from "yup";
import { useFetchListPermission } from "../../../../client/permisisonService";


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
    description: yup.string().required(),
});

export default function EditRole({ roleId, closeDialogCb }) {
    const [checkList, setCheckList] = React.useState([]);

    const {
        isError,
        isPending,
        isSuccess,
        method: updateRole
    } = useUpdateRole();

    const {
        isPending: isFetchOnePending,
        isSuccess: isFetchOneSuccess,
        isError: isFetchOneError,
        method: fetchOneRole,
        data: fetchedRole
    } = useFetchOneRole();

    const {
        isPending: isFetchPermissionsPending,
        isSuccess: isFetchPermissionsSuccess,
        isError: isFetchPermissionsError,
        method: fetchRolePermissions,
        data: fetchedRolePermissions
    } = useFetchPermissionOfRole();

    const {
        isPending: isPermissionListPending,
        isSuccess: isPermissionListSuccess,
        data: permissionList,
        method: fetchPermissionList,
    } = useFetchListPermission();

    const formik = useFormik({
        initialValues: {
            roleName: "",
            description: "",
            permissionIds: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateRole({ ...values });
        }
    })

    React.useEffect(() => {
        fetchPermissionList();
        fetchRolePermissions(roleId);
        fetchOneRole(roleId);
    }, []);

    React.useEffect(() => {
        if (isFetchOneSuccess) {
            formik.setValues({
                roleName: fetchedRole.name,
                description: fetchedRole.description,
                permissionIds: formik.values.permissionIds
            })
        }
    }, [isFetchOneSuccess])

    React.useEffect(() => {
        if (isFetchPermissionsSuccess) {
            const permissions = fetchedRolePermissions.data.map((p) => p.id);
            formik.setFieldValue('permissionIds', permissions);
        }
    }, [isFetchPermissionsSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới Role"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên Role"} />
                            <TextField
                                id="roleName"
                                name="roleName"
                                value={formik.values.roleName}
                                onChange={formik.handleChange}
                                error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                                helperText={formik.touched.roleName && formik.errors.name}
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