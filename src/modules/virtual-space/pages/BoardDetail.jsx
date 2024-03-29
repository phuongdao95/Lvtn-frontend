import { Box, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import MenuButton from "../../../components/DataGrid/MenuButton";
import FilterButton from "../../../components/DataGrid/FilterButton";
import TaskBoard from "../components/TaskBoard";

import { grey } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router";
import {
    useFetchOneTaskBoard,
    useFetchTaskColumnsOfTaskBoard,
    useFetchTasksOfTaskColumns
} from "../../../client/taskboardService";
import TaskCreate from "./TaskCreate";
import TaskFilter from "../components/TaskFilter";
import ActionButton from "../../../components/DataGrid/ActionButton";
import dayjs from "dayjs";

export default function BoardDetail() {
    const navigate = useNavigate();
    const { id } = useParams()

    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [shouldApplyFilter, setShouldApplyFilter] = React.useState(false);

    const [filters, setFilters] = React.useState({
        inChargeds: [],
        reportTos: [],
        labels: [],
        taskType: 'basic',
        startDate: dayjs(),
        endDate: dayjs(),
        isDisabled: false,
        options: [],
    });

    const [taskColumns, setTaskColumns] = React.useState();
    const [shouldReload, setShouldReload] = React.useState(false);

    const {
        isSuccess,
        isError,
        isPending,
        method: fetchDetail,
        data: detail
    } = useFetchOneTaskBoard();

    const {
        isSuccess: isFetchColumnsSuccess,
        isError: isFetchColumnsError,
        isPending: isFetchColumnsPending,
        method: fetchColumnList,
        data: columnList
    } = useFetchTaskColumnsOfTaskBoard();

    const {
        isError: isFetchTasksError,
        isSuccess: isFetchTasksSuccess,
        data: fetchedColumns,
        method: fetchTasks,
    } = useFetchTasksOfTaskColumns();

    React.useEffect(() => {
        if (shouldApplyFilter) {
            fetchTasks(columnList.data, filters);
        }
    }, [shouldApplyFilter]);

    React.useEffect(() => {
        fetchDetail(id);
        fetchColumnList(id);
    }, [id])

    React.useEffect(() => {
        if (isFetchColumnsSuccess) {
            fetchTasks(columnList.data);
        }
    }, [isFetchColumnsSuccess])

    React.useEffect(() => {
        if (shouldReload) {
            fetchTasks(columnList.data);
            setShouldReload(false);
        }
    }, [shouldReload])

    React.useEffect(() => {
        if (isFetchTasksSuccess) {
            const mapped = fetchedColumns.map((column) => ({
                id: `${column.id}`,
                prefix: column.name,
                elements: [...column.items]
            }));

            mapped.forEach((column, index, array) => {
                column.elements.forEach(item => {
                    item.onClick = (id) => {
                        setTaskId(id);
                        setIsTaskDetailOpen(true);
                    }
                })
            })

            const processed = mapped.reduce((acc, value) => ({
                ...acc,
                [value.prefix]: value.elements
            }), {});

            setTaskColumns(processed)
        }
    }, [isFetchTasksSuccess])

    const [taskId, setTaskId] = React.useState(null);
    const [isTaskDetailOpen, setIsTaskDetailOpen] = React.useState(false);
    const [isTaskCreateOpen, setIsTaskCreateOpen] = React.useState(false);

    return <Fragment>
        {
            isTaskCreateOpen &&
            <TaskCreate
                reload={() => {
                    setShouldReload(true);
                }}
                closeCb={() => {
                    setIsTaskCreateOpen(false);
                }} />
        }

        <Box sx={{ padding: 2, background: 'white' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    Bảng công việc
                </Typography >

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 0.5 }}>
                    <ActionButton onClick={() => navigate(-1)}>
                        Quay lại
                    </ActionButton>
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                {
                                    text: "Thêm Công việc",
                                    handler: () => {
                                        setIsTaskCreateOpen(true);
                                    }
                                },
                                {
                                    text: "Danh sách Nhãn",
                                    handler: () => {
                                        navigate(`label`)
                                    }
                                },
                                {
                                    text: "Danh sách cột",
                                    handler: () => {
                                        navigate(`column`)
                                    }
                                }
                            ]
                        }
                    />
                </Box>
            </Box>

            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <FilterButton
                        onClick={() => { setIsFilterOpen(true) }}
                    />
                </Box>
            </Box>

            {
                isFilterOpen &&
                <TaskFilter
                    boardId={id}
                    closeDialogCb={() => setIsFilterOpen(false)}
                    applyFilter={() => {
                        setIsFilterOpen(false);
                        fetchTasks(columnList.data, filters)
                    }}
                    setFilters={setFilters}
                    filters={filters}
                />
            }

            <TaskBoard
                taskId={id}
                taskColumns={taskColumns}
                reloadList={() => setShouldReload(true)}
                setShouldReload={setShouldReload}
            />
        </Box>
    </Fragment>
}