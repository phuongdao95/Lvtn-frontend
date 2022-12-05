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
import { useCreateWorkingShiftRegistration, useDeleteWorkingShift, useFetchListWorkingShiftRegistration } from "../../../client/workingShiftService";
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

const getColumnConfig = (openEditCb) => [
    {
        field: "action",
        headerName: "Thao tác",
        width: 100,
        renderCell: ({ id }) => {
            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Đăng ký
                </ActionButton>
            </Box>
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

export default function WorkingShiftRegistrationList() {
    const [currentMonth, setCurrentMonth] = React.useState(dayjs().format('MM/YYYY'))
    const [shiftId, setShiftId] = React.useState(null);
    const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
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
    } = useFetchListWorkingShiftRegistration();

    const {
        isSuccess: isDeleteSuccess,
        isPending: isDeletePending,
        isError: isDeleteError,
        method: deleteWorkingShift
    } = useDeleteWorkingShift();

    const {
        isSuccess: isCreateSuccess,
        isPending: isCreatePending,
        isError: isCreateError,
        method: createWorkingShiftRegistration
    } = useCreateWorkingShiftRegistration();

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
            fetchWorkingShifts(0, 0, currentMonth, "month");
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
        {isRegisterOpen &&
            <ConfirmDialog
                title={"Xác nhận"}
                message="Bạn có đăng ký ca làm này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setShiftId(null);
                        setIsRegisterOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        createWorkingShiftRegistration({
                            userId: getCurrentUserId(),
                            WorkingShiftRegistrationId: parseInt(shiftId),
                        });
                        setIsRegisterOpen(false);
                        setShiftId(null);
                    }
                }}
            />}


        <DataGridLayout
            title={"Đăng ký ca làm"}
            datagridSection={
                <DataGrid
                    rowCount={response?.total ?? 0}
                    rows={response?.data?.map((shift) => ({
                        ...shift,
                        startDate: dayjs(shift.startDate).format("DD/MM/YYYY HH:mm"),
                        endDate: dayjs(shift.endDate).format("DD/MM/YYYY HH:mm"),
                        workingShiftStartDate: dayjs(shift.workingShiftStartTime).format("DD/MM/YYYY"),
                        workingShiftStartTime: dayjs(shift.workingShiftStartTime).format("HH:mm"),
                        workingShiftEndTime: dayjs(shift.workingShiftEndTime).format("HH:mm"),
                    })) ?? []}
                    columns={getColumnConfig(
                        (id) => {
                            setShiftId(id);
                            setIsRegisterOpen(true);

                        },
                    )}
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