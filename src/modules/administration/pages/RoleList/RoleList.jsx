import React, { Fragment } from "react";
import { useNavigate } from "react-router";

import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";

import { useDeleteRole, useFetchListRole } from "../../../../client/roleService";
import { Box } from "@mui/material";
import { useState } from "react";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";

const getColumnConfig = (openEditRoleCb, openDeleteRoleCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },

    {
        field: "name",
        headerName: "Name",
        width: 250,
    },

    {
        field: "description",
        headerName: "Description",
        width: 300,
    },

    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Delete
                </ActionButton>
            </Box >
        }
    }
];

export default function RoleList() {
    const navigate = useNavigate();

    const {
        isSuccess: isDeleteSuccess,
        isPending: isDeletePending,
        method: deleteRole
    } = useDeleteRole();

    const [roleId, setRoleId] = useState(null);

    const [isDeleteRolePopupOpen, setIsDeleteRolePopupOpen] = React.useState(false);
    const [isCreateRolePopupOpen, setIsCreateRolePopupOpen] = React.useState(false);
    const [isEditRolePopupOpen, setIsEditRolePopupOpen] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchDepartmentList
    } = useFetchListRole();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchDepartmentList();
        }
    }, [isDeleteSuccess])

    return (
        <Fragment>
            {isCreateRolePopupOpen &&
                <CreateRole closeDialogCb={() => setIsCreateRolePopupOpen(false)} />
            }

            {isEditRolePopupOpen &&
                <EditRole closeDialogCb={() => setIsEditRolePopupOpen(false)} roleId={roleId} />
            }

            {isDeleteRolePopupOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa chức vụ này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setRoleId(null);
                            setIsDeleteRolePopupOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteRolePopupOpen(false);
                            setRoleId(null);
                            deleteRole(roleId);
                        }
                    }}
                />}

            <DataGridLayout
                title={"Danh sách chức vụ"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchDepartmentList((nextPageIndex) * limit, limit)
                        }}
                        rows={response?.data ?? []}
                        columns={getColumnConfig(
                            (id) => {
                                setRoleId(id);
                                setIsEditRolePopupOpen(true);
                            },
                            (id) => {
                                setRoleId(id);
                                setIsDeleteRolePopupOpen(true);
                            })}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                {
                                    text: "Tạo mới chức vụ",
                                    handler: () => {
                                        setIsCreateRolePopupOpen(true);
                                    }
                                }
                            ]
                        }
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                {
                                    text: "Danh sách người dùng", handler: () => {
                                        navigate("/user");
                                    }
                                },
                                {
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group")
                                    }
                                },
                                {
                                    text: "Danh sách quyền", handler: () => {
                                        navigate("/permission");
                                    }
                                },
                                {
                                    text: "Danh sách team", handler: () => {
                                        navigate("/team");
                                    }
                                },
                                {
                                    text: "Danh sách department", handler: () => {
                                        navigate("/department")
                                    }
                                },
                            ]
                        }
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
