import React, { Fragment } from "react";
import DataGridLayout from "../../../layouts/DataGridLayout";
import DataGrid from "../../../components/DataGrid";
import MenuButton from "../../../components/DataGrid/MenuButton";
import SearchField from "../../../components/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import InfoDialog from "../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Select from "../../../components/DataGrid/Select";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useFetchList } from "../../../client/TimekeepingManageService";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";

const getColumnConfig = (openEditCb) => [
    {
        field: "id",
        width: 50
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
        field: "timeExpect",
        headerName: "Tổng công",
        width: 150,
    },
    {
        field: "timeReal",
        headerName: "Công đã chấm",
        width: 150,
    },
    {
        field: "timeMiss",
        headerName: "Công thiếu",
        width: 150,
    },
    {
        field: "action",
        headerName: "Thao tác",
        width: 250,
        renderCell: ({ id }) => {
            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Chi tiết
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

export default function TimekeepingManage() {
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })
    const resetDialogState = () => setInfoDialogMessage(initialDialogState)
    const [monthYear, setMonthYear] = React.useState(null);
    const [workCount, setWorkCount] = React.useState(0);

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchUserList
    } = useFetchList();

    React.useEffect(() => {
        if (monthYear != null) {
            fetchUserList(monthYear.month() + 1, monthYear.year(), workCount);
        }
    }, [monthYear])

    React.useEffect(() => {
        if (monthYear != null) {
            fetchUserList(monthYear.month() + 1, monthYear.year(), workCount);
        }
    }, [workCount]);

    return (
        <Fragment>
            {isInfoDialogOpen && <InfoDialog
                title={infoDialogMessage.title}
                message={infoDialogMessage.message}
                closeDialogCb={() => {
                    setIsInfoDialogOpen(false);
                    resetDialogState();
                }}
            />}
            <DataGridLayout
                title={"Thống kê công của nhân viên"}
                datagridSection={
                    <DataGrid
                        pageSize={44}
                        rowCount={response?.count ?? 44}
                        paginationMode="server"
                        rows={
                            response?.data.map((item) => ({
                                ...item,
                                gender: item.gender === "male" ? "Nam" : "Nữ"
                            })) ?? []
                        }
                        columns={getColumnConfig(
                            (id) => {
                                console.log(id);
                            })}
                        isError={false}
                        isLoading={false}
                        isSuccess={true}
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={
                    <>
                    <Box sx={{margin: 1}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                views={['year', 'month']}
                                label="Year and Month"
                                maxDate={dayjs()}
                                value={monthYear}
                                onChange={setMonthYear}
                                renderInput={(params) => <TextField {...params} helperText={null} sx={{marginRight: 1}}/>}
                            />
                        </LocalizationProvider>
                        <Select sx={{
                                    width: 200,
                                    height: 55
                                }}
                            value={workCount == 0 ? "Đủ công" : workCount == 1 ? "Dư công" : "Thiếu công"}
                            options={
                                [
                                    {
                                        label: "Đủ công",
                                        handler: () => setWorkCount(0)
                                    },
                                    {
                                        label: "Thiếu công",
                                        handler: () => setWorkCount(-1)
                                    },
                                    {
                                        label: "Dư công",
                                        handler: () => setWorkCount(1)
                                    }
                                ]
                            }
                        />
                    </Box>
                    </>
                }
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
