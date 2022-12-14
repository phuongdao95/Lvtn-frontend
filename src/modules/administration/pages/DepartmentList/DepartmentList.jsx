import React, { Fragment } from "react";
import { Box } from "@mui/system";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import CreateDepartment from "./CreateDepartment";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import EditDepartment from "./EditDepartment";
import InfoDialog from "../../../../components/Dialog/InfoDialog";

import { useNavigate } from "react-router";
import { useFetchListDepartment, useDeleteDepartment } from "../../../../client/departmentService";

const getColumnConfig = (openEditCb, openDeleteCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150
    },

    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "parentDepartmentName",
        headerName: "Phòng ban cha",
        width: 250
    },

    {
        field: "managerName",
        headerName: "Quản lý",
        width: 200
    },

    {
        field: "detail",
        headerName: "Mô tả",
        width: 300,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={() => openDeleteCb(id)}>
                    Xóa
                </ActionButton>
            </Box >
        }
    }
];


const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function DepartmentList() {
    const [departmentId, setDepartmentId] = React.useState(null);

    const navigate = useNavigate();

    const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = React.useState(false);
    const [isEditDepartmentOpen, setIsEditDepartmentOpen] = React.useState(false);
    const [isDeleteDepartmentOpen, setIsDeleteDepartmentOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchDepartmentList
    } = useFetchListDepartment();

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteDepartment,
    } = useDeleteDepartment();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchDepartmentList();
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess, isDeleteError])


    return (
        <Fragment>
            {isCreateDepartmentOpen && <CreateDepartment
                reloadList={fetchDepartmentList}
                closeDialogCb={() => setIsCreateDepartmentOpen(false)} />}

            {isEditDepartmentOpen && <EditDepartment
                departmentId={departmentId}
                reloadList={fetchDepartmentList}
                closeDialogCb={() => setIsEditDepartmentOpen(false)}
            />}

            {isDeleteDepartmentOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa Department này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setDepartmentId(null);
                            setIsDeleteDepartmentOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteDepartmentOpen(false);
                            setDepartmentId(null);
                            deleteDepartment(departmentId);
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
                title={"Danh sách department"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchDepartmentList((nextPageIndex) * limit, limit)
                        }}
                        rowCount={response?.total ?? 0}
                        paginationMode="server"
                        rows={response?.data ?? []}
                        columns={getColumnConfig(
                            (id) => {
                                setDepartmentId(id);
                                setIsEditDepartmentOpen(true);
                            },
                            (id) => {
                                setDepartmentId(id);
                                setIsDeleteDepartmentOpen(true);
                            }
                        )}
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
                                    text: "Tạo mới Department", handler: () => {
                                        setIsCreateDepartmentOpen(true);
                                    }
                                },
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
