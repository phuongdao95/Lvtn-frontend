import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGridLayout from "../../../layouts/DataGridLayout";
import DataGrid from "../../../components/DataGrid";
import SearchField from "../../../components/DataGrid/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import CreateWorkingShift from "./CreateWorkingShift";
import EditWorkingShift from "./EditWorkingShift";
import Select from "../../../components/DialogForm/Select";
import { useDeleteRegistrationByIdAndUserId, useFetchRegistrationListOfUser } from "../../../client/workingShiftService";
import dayjs from "dayjs";
import { getCurrentUserId } from "../../../client/autheticationService";


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

const getColumnConfig = (openDeleteCb) => [
    {
        field: "action",
        headerName: "Thao tác",
        width: 140,
        renderCell: ({ id, ...rest }) => {
            const startDate = dayjs(rest.row.startDate.split("/").reverse().join("-"));
            const endDate = dayjs(rest.row.endDate.split("/").reverse().join("-"));
            const now = dayjs();

            const isButtonEnabled = rest.row.workingShiftType !== "Fixed Shift" &&
                (
                    (now.isSame(startDate, 'date') || now.isAfter(startDate, 'date')) &&
                    (now.isSame(endDate, 'date') || now.isBefore(endDate, 'date'))
                )

            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton disabled={!isButtonEnabled} onClick={() => openDeleteCb(id)}>
                    Hủy Đăng ký
                </ActionButton>
            </Box >
        }
    },

    {
        field: "id",
        width: 100
    },
    {
        field: "workingShiftName",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "startDate",
        headerName: "Ngày Bắt đầu đăng ký",
        width: 200,
    },

    {
        field: "endDate",
        headerName: "Ngày kết thúc đăng ký",
        width: 200,
    },

    {
        field: "workingShiftStartDate",
        headerName: "Ngày",
        width: 100,
    },

    {
        field: "workingShiftStartTime",
        headerName: "Bắt đầu ca làm",
        width: 100,
    },

    {
        field: "workingShiftEndTime",
        headerName: "kết thúc ca làm",
        width: 100,
    },

    {
        field: "workingShiftDescription",
        headerName: "Mô tả",
        width: 200,
    },

    {
        field: "workingShiftFormulaName",
        headerName: "Công thức chấm công",
        width: 150,
    },

    {
        field: "workingShiftType",
        headerName: "Loại",
        width: 150
    },
];


const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function RegisteredWorkingShiftList() {
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
    } = useFetchRegistrationListOfUser();

    const {
        isSuccess: isDeleteSuccess,
        isPending: isDeletePending,
        isError: isDeleteError,
        method: deleteWorkingShift
    } = useDeleteRegistrationByIdAndUserId();

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
        fetchWorkingShifts(getCurrentUserId(), currentMonth, "month");
    }, [currentMonth])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchWorkingShifts(getCurrentUserId(), currentMonth, "month");
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
            }} />}
        {isEditShiftOpen &&
            <EditWorkingShift closeDialogCb={
                () => setIsEditShiftOpen(false)}
                shiftId={shiftId} />}

        {isDeleteShiftOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn hủy đăng ký"
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
                        deleteWorkingShift(getCurrentUserId(), shiftId);
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
            title={"Ca làm việc đã đăng ký"}
            datagridSection={
                <DataGrid
                    rowCount={response?.total ?? 0}
                    rows={response?.data?.map((shift) => ({
                        ...shift,
                        startDate: dayjs(shift.startDate).format("DD/MM/YYYY"),
                        endDate: dayjs(shift.endDate).format("DD/MM/YYYY"),
                        workingShiftStartDate: dayjs(shift.workingShiftStartTime).format("DD/MM/YYYY"),
                        workingShiftStartTime: dayjs(shift.workingShiftStartTime).format("HH:mm"),
                        workingShiftEndTime: dayjs(shift.workingShiftEndTime).format("HH:mm"),
                        workingShiftType: shift.workingShiftType === 0 ? "Fixed Shift" : "Overtime Shift"
                    })) ?? []}
                    columns={getColumnConfig(
                        (id) => {
                            setShiftId(id);
                            setIsDeleteShiftOpen(true);
                        })}
                    isError={isError}
                    isLoading={isPending}
                    isSuccess={isSuccess}
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