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
        headerName: "Tên",
        width: 250,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 300,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Sửa 
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Xóa
                </ActionButton>
            </Box >
        }
    }
];

export default function RoleList() {
    const navigate = useNavigate();

    const [roleId, setRoleId] = React.useState(null);

    const [isDeleteRolePopupOpen, setIsDeleteRolePopupOpen] = React.useState(false);
    const [isCreateRolePopupOpen, setIsCreateRolePopupOpen] = React.useState(false);
    const [isEditRolePopupOpen, setIsEditRolePopupOpen] = React.useState(false);

    const {
        isSuccess: isDeleteSuccess,
        method: deleteRole
    } = useDeleteRole();

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
                <CreateRole
                    reloadList={() => fetchDepartmentList()}
                    closeDialogCb={() => setIsCreateRolePopupOpen(false)} />
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
                            deleteRole(roleId);
                            setIsDeleteRolePopupOpen(false);
                            setRoleId(null);
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
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
