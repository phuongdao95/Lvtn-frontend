import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Checkbox } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import DialogFormTableLayout from "../../../../layouts/DialogFormTableLayout";
import BasicTable from "../../../../components/BasicTable/BasicTable";
import SearchField from "../../../../components/SearchField";

import { useFormik } from "formik";
import { useState } from "react";
import { useFetchOneRole, useFetchPermissionOfRole, useUpdateRole } from "../../../../client/roleService";

const getPermissionColumnConfig = () => {
    return [
        {
            field: "module",
            headerName: "Module",
            size: "small"
        },
        {
            field: "create",
            headerName: "Create",
            size: "small"

        },

        {
            field: "retrieve",
            headerName: "Retreive",
            size: "small"

        },

        {
            field: "update",
            headerName: "Update",
            size: "small"

        },

        {
            field: "delete",
            headerName: "Delete",
            size: "small"

        }
    ]
}

const moduleNameList = ["User", "Role", "Permission", "Group", "Department", "DAB", "Formula", "Milestone"]

const getDefaultPermissionInitialState = () => {
    const result = moduleNameList.map((value, index) => {
        const module = `${value.toLowerCase()}`;

        const crudPermissionAsText = ['create', 'retrieve', 'update', 'delete'].map((value) => {
            return `${module}.${value}`;
        })

        return crudPermissionAsText.map((value) => ({ [value]: true }))
            .reduce((acc, current) => ({ ...acc, ...current }), {});
    });

    return result.reduce((acc, current) => ({ ...acc, ...current }));
}


const getDefaultPermissionList = (getPermisison, setPermission) => {
    return moduleNameList.map((value, index) => {
        const moduleName = value.toLowerCase();

        return {
            id: index,
            module: value,
            create: <Checkbox size="small" checked={getPermisison()[`${moduleName}.create`]}
                onChange={(event) => {
                    setPermission({
                        ...getPermisison(),
                        [`${moduleName}.create`]: event.target.checked
                    })
                }} />,
            retrieve: <Checkbox size="small" checked={getPermisison()[`${moduleName}.retrieve`]}
                onClick={(event) => setPermission({
                    ...getPermisison(),
                    [`${moduleName}.retrieve`]: event.target.checked
                })} />,
            update: <Checkbox size="small" checked={getPermisison()[`${moduleName}.update`]}
                onClick={(event) => setPermission({
                    ...getPermisison(),
                    [`${moduleName}.update`]: event.target.checked
                })} />,
            delete: <Checkbox size="small" checked={getPermisison()[`${moduleName}.delete`]}
                onClick={(event) => setPermission({
                    ...getPermisison(),
                    [`${moduleName}.delete`]: event.target.checked
                })} />,

        }
    });
}

const convertPermissionResponseToInitialState = (permission) => {
    const permissionList = permission?.data;
    const initialState = getDefaultPermissionInitialState();

    const initialStateSetToFalse = Object.entries(initialState)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: false }), {});

    const mappedPermission = permissionList
        .map((value) => value.name)
        .reduce((acc, current) => ({ ...acc, [current]: true }), {});

    return {
        ...initialStateSetToFalse,
        ...mappedPermission
    }

}

export default function EditRole({ closeDialogCb, roleId }) {
    const [permisisonMap, setPermissionMap] = useState(getDefaultPermissionInitialState());

    const {
        method: editRole
    } = useUpdateRole();

    const {
        data: fetchedPermissionResponse,
        method: fetchPermission
    } = useFetchPermissionOfRole();

    const {
        isPending: isFetchRolePending,
        isSuccess: isFetchRoleSuccess,
        isError: isFetchRoleError,
        data: fetchedRoleResponse,
        method: fetchRole
    } = useFetchOneRole();

    React.useEffect(() => {
        if (roleId) {
            fetchRole(roleId);
        }
    }, [])

    React.useEffect(() => {
        if (fetchedRoleResponse) {
            formik.setValues({
                ...fetchedRoleResponse
            })
        }
    }, [fetchedRoleResponse])


    React.useEffect(() => {
        if (roleId) {
            fetchPermission(roleId);
        }
    }, [])

    React.useEffect(() => {
        if (fetchedPermissionResponse) {
            const newInitialState =
                convertPermissionResponseToInitialState(fetchedPermissionResponse);

            setPermissionMap(newInitialState);
        }
    }, [fetchedPermissionResponse])

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        onSubmit: (values) => {
            const pMap = permisisonMap;
            const pList = Object.entries(pMap).reduce((acc, [key, value]) => {
                return value ? [...acc, key] : [...acc];
            }, [])

            const formData = { permissionNames: pList, ...values };
            editRole(roleId, formData);
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
        title="Chỉnh sửa chức vụ"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên chức vụ"} />
                            <TextField id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange} />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}

                            />
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={<DialogFormTableLayout
                        title={"Danh sách quyền"}
                        actionSection={<SearchField />}
                        searchSection={<Fragment></Fragment>}
                        tableSection={<BasicTable
                            rows={getDefaultPermissionList(() => permisisonMap,
                                (value) => {
                                    setPermissionMap(value);
                                })}
                            columns={getPermissionColumnConfig()}
                            maxHeight={'250px'}
                        />}
                    />}
                />

            </Box>
        </DialogForm>
    </Dialog >;
}