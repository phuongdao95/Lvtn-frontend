import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

import { useFetchListUser, useDeleteUser } from "../../../../client/userService";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";

const getColumnConfig = (openEditCb, openDeleteCb) => [
    {
        field: "id",
        width: 150
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "gender",
        headerName: "Giới tính",
        width: 100,
    },

    {
        field: "email",
        headerName: "Email",
        width: 250,
    },

    {
        field: "role",
        headerName: "Chức vụ",
        width: 150,
    },

    {
        field: "teamName",
        headerName: "Team",
        width: 150,
    },

    {
        field: "departmentName",
        headerName: "Department",
        width: 150
    },

    {
        field: "action",
        headerName: "Action",
        width: 250,
        renderCell: ({ id }) => {
            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDeleteCb(id)}>
                    Delete
                </ActionButton>
            </Box>
        }
    }
];

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function UserList() {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState(null);
    const [isCreateUserOpen, setIsCreateUserOpen] = React.useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = React.useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteUser,
    } = useDeleteUser();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchUserList
    } = useFetchListUser();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchUserList();
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess, isDeleteError])

    React.useEffect(() => {
        if (isError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra từ server, xin vui lòng load lại trang hoặc đăng nhập với quyền cao hơn'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isError]);

    return (
        <Fragment>
            {isCreateUserOpen && <CreateUser
                closeDialogCb={
                    () => setIsCreateUserOpen(false)}
                reloadList={() => {
                    setIsCreateUserOpen(false);
                    fetchUserList()
                }} />}
            {isEditUserOpen &&
                <EditUser closeDialogCb={
                    () => setIsEditUserOpen(false)}
                    userId={userId} />}

            {isDeleteUserOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa chức vụ này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setUserId(null);
                            setIsDeleteUserOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteUserOpen(false);
                            setUserId(null);
                            deleteUser(userId);
                        }
                    }}
                />}


            {isInfoDialogOpen && <InfoDialog
                title={infoDialogMessage.title}
                message={infoDialogMessage.message}
                closeDialogCb={() => {
                    setIsInfoDialogOpen(false);
                    resetDialogState();
                }}
            />}

            <DataGridLayout
                title={"Danh sách nhân viên"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchUserList((nextPageIndex) * limit, limit)
                        }}
                        rowCount={response?.total ?? 0}
                        paginationMode="server"
                        rows={response?.data ?? []}
                        columns={getColumnConfig(
                            (id) => {
                                setUserId(id);
                                setIsEditUserOpen(true);
                            },
                            (id) => {
                                setUserId(id);
                                setIsDeleteUserOpen(true);
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
                                    text: "Tạo mới người dùng",
                                    handler: () => {
                                        setIsCreateUserOpen(true);
                                    }
                                },
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
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group");
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
                                {
                                    text: "Danh sách chức vụ", handler: () => {
                                        navigate("/role")
                                    }
                                }
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
