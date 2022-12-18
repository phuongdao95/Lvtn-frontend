import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useFetchReportOfBoard, useFetchTaskBoardListOfUser } from "../../../client/taskboardService";
import { getCurrentUserId } from "../../../client/autheticationService";
import ReportCard from "../components/ReportCard";
import Select from "../../../components/DialogForm/Select";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import CustomCharts from "../components/CustomChart";
import dayjs from "dayjs";

export default function TaskBoardReport() {
    const [options, setOptions] = React.useState([]);
    const [pickedOption, setPickedOption] = React.useState(null);

    const {
        isPending,
        isSuccess,
        method: fetchTaskBoards,
        data: taskBoards,
    } = useFetchTaskBoardListOfUser();

    const {
        isPending: isFetchReportPending,
        isSuccess: isFetchReportSuccess,
        method: fetchReport,
        data: reportData
    } = useFetchReportOfBoard();

    React.useEffect(() => {
        fetchTaskBoards(getCurrentUserId());
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const fetchedOptions = taskBoards.data.map(board => ({ label: board.name, value: board.id }))
            setOptions([...fetchedOptions])
            setPickedOption(fetchedOptions[0])
        }
    }, [isSuccess])

    React.useEffect(() => {
        if (pickedOption) {
            fetchReport(pickedOption.value)
        }
    }, [pickedOption])

    return <Box sx={{ background: 'white', height: '80vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5, padding: 2 }}>
            <Typography variant='h4'>Số liệu bảng công việc </Typography>
        </Box>

        {<LoadingOverlay isLoading={isPending} />}

        <Box sx={{ padding: 2 }}>
            <Box sx={{ maxWidth: 200, marginBottom: 2 }}>
                <Select
                    menu={options}
                    value={pickedOption?.value ?? -1}
                    onChange={(x) => {
                        console.log(x);
                        setPickedOption(x.target)
                    }}
                />
            </Box>

            {
                isFetchReportSuccess &&
                <Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <ReportCard name={"Số thành viên"} value={reportData.totalEmployeeCount} />
                        <ReportCard name={"Số task hoàn thành"} value={reportData.totalTaskDone} />
                        <ReportCard name={"Số task mới"} value={reportData.totalTaskNew} />
                        <ReportCard name={"Số point đã hoàn thành"} value={reportData.totalPointFinished} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        rowGap: 0.8, marginTop: 3
                    }}>
                        <Box sx={{ minWidth: 400 }}>
                            <Typography variant='h6'>
                                Số task hoàn thành theo ngày
                            </Typography>

                            <CustomCharts labels={reportData.taskDoneByEightDays.map(item => dayjs(item.Date)
                                .format('DD/MM'))}
                                data={reportData.taskDoneByEightDays.map(item => item.TotalPoint)}
                            />
                        </Box>

                        <Box sx={{ minWidth: 400 }}>
                            <Typography variant='h6'>
                                Số point hoàn thành theo ngày
                            </Typography>

                            <CustomCharts labels={reportData.pointFinishedByEightDays.map(item => dayjs(item.Date)
                                .format('DD/MM'))}
                                data={reportData.taskDoneByEightDays.map(item => item.TotalPoint)}
                            />
                        </Box>
                    </Box>
                </Box>
            }
        </Box>

    </Box>;
}