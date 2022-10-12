import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import CreateSalaryGroup from "./CreateSalaryGroup";
import EditSalaryGroup from "./EditSalaryGroup";

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
        field: "description",
        headerName: "Mô tả",
        width: 150,
    },

    {
        field: "groupName",
        headerName: "Nhóm",
        width: 150
    },

    {
        field: "action",
        headerName: "Thao tác",
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

export default function SalaryGroupList() {
    const navigate = useNavigate();
    const [salaryGroupId, setSalaryGroupId] = React.useState(null);
    const [isCreateSalaryGroupOpen, setIsCreateSalaryGroupOpen] = React.useState(false);
    const [isEditSalaryGroupOpen, setIsEditSalaryGroupOpen] = React.useState(false);
    const [isDeleteSalaryGroupOpen, setIsDeleteSalaryGroupOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchUserList
    } = useFetchListUser();

    const {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteUser,
    } = useDeleteUser();

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
            {isCreateSalaryGroupOpen && <CreateSalaryGroup
                closeDialogCb={
                    () => setIsCreateSalaryGroupOpen(false)}
                createSuccessCb={() => {
                    setIsCreateSalaryGroupOpen(false);
                    fetchUserList()
                }} />}
            {isEditUserOpen &&
                <EditSalaryGroup closeDialogCb={
                    () => setIsEditUserOpen(false)}
                    userId={userId} />}

            {isDeleteSalaryGroupOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa chức vụ này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setSalaryGroupId(null);
                            setIsDeleteSalaryGroupOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteSalaryGroupOpen(false);
                            setSalaryGroupId(null);
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
                                setSalaryGroupId(id);
                                setIsEditSalaryGroupOpen(true);
                            },
                            (id) => {
                                setSalaryGroupId(id);
                                setIsDeleteSalaryGroupOpen(true);
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
                                        setIsCreateSalaryGroupOpen(true);
                                    }
                                },
                            ]
                        }
                    />
                }
                secondaryButtonSection={
                    <Fragment></Fragment>
                }
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}