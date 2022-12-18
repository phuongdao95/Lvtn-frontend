import React, { Fragment } from "react";
import { Box } from "@mui/system";
import DataGridLayout from "../../../layouts/DataGridLayout";
import DataGrid from "../../../components/DataGrid";
import MenuButton from "../../../components/DataGrid/MenuButton";
import SearchField from "../../../components/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Select from "../../../components/DialogForm/Select";

import WorkingShiftDayConfigCreate from "./WorkingShiftDayConfigCreate";
import WorkingShiftDayConfigEdit from "./WorkingShiftDayConfigEdit";

import { useDeleteWorkingShiftDayConfig, useFetchListWorkingShiftDayConfig } from "../../../client/workingShiftService";
import dayjs from "dayjs";



const generateMonth = () => {
    const date = dayjs();
    const sixMonthsBeforeNow = date.subtract(6, 'month');
    const sixMonthsAfterNow = date.add(6, 'month');

    const result = [];
    for (let month = sixMonthsBeforeNow;
        month.isBefore(sixMonthsAfterNow, 'month');
        month = month.add(1, 'month')
    ) {
        result.push(month.format('MM/YYYY'))
    }
    return result;
}

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
        width: 250,
    },

    {
        field: "date",
        headerName: "Ngày",
        width: 250,
    },

    {
        field: "type",
        headerName: "Loại",
        width: 250,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 250,
        renderCell: ({ id }) => {
            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={() => openDeleteCb(id)}>
                    Xóa
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

export default function WorkingShiftDayConfigList() {
    const [currentMonth, setCurrentMonth] = React.useState(dayjs().format('MM/YYYY'))
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
    } = useDeleteWorkingShiftDayConfig();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchUserList
    } = useFetchListWorkingShiftDayConfig();

    React.useEffect(() => {
        fetchUserList(0, 0, currentMonth, "month");
    }, [])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchUserList(0, 0, currentMonth, "month");
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
            {isCreateUserOpen && <WorkingShiftDayConfigCreate
                closeDialogCb={
                    () => setIsCreateUserOpen(false)}
                reloadList={() => {
                    setIsCreateUserOpen(false);
                    fetchUserList(0, 0, currentMonth, "month");
                }} />}
            {isEditUserOpen &&
                <WorkingShiftDayConfigEdit closeDialogCb={
                    () => setIsEditUserOpen(false)}
                    userId={userId} />}

            {isDeleteUserOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa ngày này"
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
                title={"Danh sách Ngày nghỉ"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchUserList((nextPageIndex) * limit, limit)
                        }}
                        rowCount={response?.total ?? 0}
                        paginationMode="server"
                        rows={response?.data?.map(item => ({
                            ...item,
                            date: dayjs(item.date).format("DD/MM/YYYY")
                        })) ?? []}
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
                                    text: "Tạo mới ngày nghỉ",
                                    handler: () => {
                                        setIsCreateUserOpen(true);
                                    }
                                },
                            ]
                        }
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: 200,
                        marginBottm: 10,
                        gap: 2
                    }}>
                        <Select
                            id="month"
                            name="month"
                            value={currentMonth}
                            onChange={(event) => {
                                setCurrentMonth(event.target.value);
                            }}
                            menu={generateMonth().map((month) => ({
                                label: month,
                                value: month
                            }))}
                        />
                    </Box>
                </Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
