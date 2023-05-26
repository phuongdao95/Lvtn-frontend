import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useFetchReportOfBoard, useFetchTaskBoardListOfUser } from "../../../client/taskboardService";
import { getCurrentUserId } from "../../../client/autheticationService";
import Select from "../../../components/DialogForm/Select";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import LateTaskCard from "../components/LateTaskCard";
import dayjs from "dayjs";

export default function TaskEstimationReport() {
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
            <Typography variant='h4'>Dự đoán task bị trễ hạn </Typography>
        </Box>

        {<LoadingOverlay isLoading={isPending} />}

        <Box sx={{ padding: 2 }}>
            <Box sx={{ maxWidth: 200, marginBottom: 2 }}>
                <Select
                    menu={options}
                    value={pickedOption?.value ?? -1}
                    onChange={(x) => {
                        setPickedOption(x.target)
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <LateTaskCard item={{
                    id: 123,
                    inChargeName: '123123',
                    name: 'Hello',
                    point: 12,
                    fromDate: '',
                    toDate: '',
                    estimated: '',
                }} />

                <LateTaskCard item={{
                    id: 123,
                    inChargeName: '123123',
                    name: 'Hello',
                    point: 12,
                    fromDate: '',
                    toDate: '',
                    estimated: '',
                }} />        
                
                <LateTaskCard item={{
                    id: 123,
                    inChargeName: '123123',
                    name: 'Hello',
                    point: 12,
                    fromDate: '',
                    toDate: '',
                    estimated: '',
                }} />
            </Box>
        </Box>
    </Box>;
}   