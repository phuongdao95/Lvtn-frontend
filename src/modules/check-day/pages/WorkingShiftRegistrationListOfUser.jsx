import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGridLayout from "../../../layouts/DataGridLayout";
import DataGrid from "../../../components/DataGrid";
import MenuButton from "../../../components/DataGrid/MenuButton";
import SearchField from "../../../components/DataGrid/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import CreateWorkingShift from "./CreateWorkingShift";
import EditWorkingShift from "./EditWorkingShift";
import Select from "../../../components/DialogForm/Select";
import { useDeleteWorkingShift, useFetchListWorkingShift } from "../../../client/workingShiftService";
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
        width: 100
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "date",
        headerName: "Ngày",
        width: 100,
    },

    {
        field: "startTime",
        headerName: "Bắt đầu",
        width: 100,
    },

    {
        field: "endTime",
        headerName: "Kết thúc",
        width: 100,
    },

    {
        field: "formulaName",
        headerName: "Công thức chấm công",
        width: 150,
    },

    {
        field: "type",
        headerName: "Loại",
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

export default function WorkingShiftRegistrationList() {
    const [currentMonth, setCurrentMonth] = React.useState(dayjs().format('MM/YYYY'))
    const [shiftId, setShiftId] = React.useState(null);
    const [isCreateShiftOpen, setIsCreateShiftOpen] = React.useState(false);
    const [isEditShiftOpen, setIsEditShiftOpen] = React.useState(false);
    const [isDeleteShiftOpen, setIsDeleteShiftOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess,
        isPending,
        isError,
        data: response,
        method: fetchWorkingShifts
    } = useFetchListWorkingShift();

    const {
        isSuccess: isDeleteSuccess,
        isPending: isDeletePending,
        isError: isDeleteError,
        method: deleteWorkingShift
    } = useDeleteWorkingShift();

    React.useEffect(() => {
        if (isError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra từ server, xin vui lòng load lại trang hoặc đăng nhập với quyền cao hơn'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isError]);

    React.useEffect(() => {
        fetchWorkingShifts(0, 0, currentMonth, "month");
    }, [currentMonth])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchWorkingShifts();
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess, isDeleteError])

    return <Fragment>
        {isCreateShiftOpen && <CreateWorkingShift
            closeDialogCb={
                () => setIsCreateShiftOpen(false)}
            createSuccessCb={() => {
                setIsCreateShiftOpen(false);
                fetchWorkingShifts()
            }}
            reload={() => {
            }}
            />}
        {isEditShiftOpen &&
            <EditWorkingShift closeDialogCb={
                () => setIsEditShiftOpen(false)}
                shiftId={shiftId} />}

        {isDeleteShiftOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa đăng ký này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setShiftId(null);
                        setIsDeleteShiftOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setIsDeleteShiftOpen(false);
                        setShiftId(null);
                        deleteWorkingShift(shiftId);
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
            title={"Quản lý ca làm việc"}
            datagridSection={
                <DataGrid
                    rowCount={response?.total ?? 0}
                    rows={response?.data?.map((shift) => ({
                        ...shift,
                        date: dayjs(shift.startTime).format("DD/MM/YYYY"),
                        startTime: dayjs(shift.startTime).format("HH:mm"),
                        endTime: dayjs(shift.endTime).format("HH:mm"),
                    })) ?? []}
                    columns={getColumnConfig(
                        (id) => {
                            setShiftId(id);
                            setIsEditShiftOpen(true);
                        },
                        (id) => {
                            setShiftId(id);
                            setIsDeleteShiftOpen(true);
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
                                text: "Tạo mới một ca",
                                handler: () => {
                                    setIsCreateShiftOpen(true);
                                }
                            },
                            {
                                text: "Tạo mới nhiều ca",
                                handler: () => {
                                    setIsCreateShiftOpen(true);
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
}