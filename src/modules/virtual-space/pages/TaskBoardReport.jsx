import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ReportCard from "../components/ReportCard";
import { useFetchTaskBoardListOfUser } from "../../../client/taskboardService";
import { getCurrentUserId } from "../../../client/autheticationService";
import Select from "../../../components/DialogForm/Select";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";



export default function SalaryReport() {
    const [options, setOptions] = React.useState([]);
    const [pickedOption, setPickedOption] = React.useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchTaskBoards,
        data: taskBoards,
    } = useFetchTaskBoardListOfUser();

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


    return <Box sx={{ background: 'white', height: '80vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5, padding: 2 }}>
            <Typography variant='h4'>Số liệu bảng công việc </Typography>
        </Box>

        {<LoadingOverlay isLoading={isPending} />}

        {isSuccess &&
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

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ReportCard name={"Số thành viên"} value={123} />
                    <ReportCard name={"Số task hoàn thành"} value={123} />
                    <ReportCard name={"Số task mới"} value={123} />
                    <ReportCard name={"Số point đã hoàn thành"} value={123} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 3 }}>
                    <Box>
                        Số task hoàn thành theo tuần
                    </Box>
                    <Box>
                        Số point hoàn thành theo ngày
                    </Box>


                    <Box>
                        <Box>
                            Xếp hạng point hoàn thành nhiều nhất theo tuần
                        </Box>


                    </Box>
                </Box>
            </Box>
        }

    </Box>;
}