import React, { Fragment } from 'react';
import { Box, Button, Chip, IconButton } from '@mui/material';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import { useDeleteTaskFromEpic, useFetchOneTask, useFetchTaskLabelsOfTask, useFetchTasksOfEpic, useRemoveTaskLabelFromTask } from '../../../client/taskService';
import dayjs from 'dayjs';
import RTEContent from '../components/RTEContent';
import TaskDetailComments from './TaskDetailComment';
import DescriptionDialog from '../components/DescriptionDialog';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { Typography } from '@mui/material';
import TaskDetailEdit from "./TaskDetailEdit";
import TaskDetailNewLabel from './TaskDetailNewLabel';
import TaskSubCreate from './TaskSubCreate';
import TaskDetail from './TaskDetail';
import TaskReopen from './TaskReopen';
import { blue, grey, red } from '@mui/material/colors';
import { lowerCase } from 'lodash';

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function TaskDetailInfo({ taskId }) {
    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = React.useState(false);
    const [isTaskDetailEditOpen, setIsTaskDetailEditOpen] = React.useState(false);
    const [isAddLabelOpen, setIsAddLabelOpen] = React.useState(false);
    const [description, setDescription] = React.useState(null);
    const [labelId, setLabelId] = React.useState();
    const [isRemoveLabelOpen, setIsRemoveLabelOpen] = React.useState(false);
    const [isTaskCreateOpen, setIsTaskCreateOpen] = React.useState(false);
    const [isSubtaskOpen, setIsSubtaskOpen] = React.useState(false);
    const [activeSubtask, setActiveSubtask] = React.useState(null);
    const [isDeleteLinkTaskOpen, setIsDeleteLinkTaskOpen] = React.useState(false);
    const [subTaskToBeDeleted, setSubTaskToBeDeleted] = React.useState(null)
    const [isReopenTaskOpen, setIsReopenTaskOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const [labelList, setLabelList] = React.useState([]);

    const {
        isSuccess: isRemoveLabelSuccess,
        isPending: isRemoveLabelPending,
        isError: isRemoveLabelError,
        method: removeTaskLabelFromTask
    } = useRemoveTaskLabelFromTask();

    const {
        isPending: isDeleteTaskFromEpicPending,
        isSuccess: isDeleteTaskFromEpicSuccess,
        isError: isDeleteTaskFromEpicError,
        method: deleteTaskFromEpic,
    } = useDeleteTaskFromEpic();



    React.useEffect(() => {
        if (isRemoveLabelError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra từ server'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isRemoveLabelError]);

    const {
        isPending: isFetchLabelsPending,
        isSuccess: isFetchLabelsSuccess,
        isError: isFetchLabelsError,
        method: fetchLabels,
        data: labels,
    } = useFetchTaskLabelsOfTask();

    const {
        isPending: isFetchDetailPending,
        isSuccess: isFetchDetailSuccess,
        isError: isFetchDetailError,
        method: fetchTaskDetail,
        data: taskDetail
    } = useFetchOneTask();

    React.useEffect(() => {
        fetchTaskDetail(taskId);
        fetchLabels(taskId);
    }, []);
    React.useEffect(() => {
        if (isDeleteTaskFromEpicSuccess) {
            fetchSubtasks(taskId)
        }
    }, [isDeleteTaskFromEpicSuccess])

    React.useEffect(() => {
        if (isRemoveLabelSuccess) {
            fetchLabels(taskId);
        }
    }, [isRemoveLabelSuccess])

    const [detail, setDetail] = React.useState({
        type: 0,
        name: "",
        point: "",
        fromDate: "",
        toDate: "",
        reportToName: "",
        inChargeName: "",
        columnName: "",
        taskType: null,
        estimatedDate: '',
    });

    const [subTasks, setSubtasks] = React.useState([]);

    const {
        isPending: isSubtasksPending,
        isSuccess: isSubtasksSuccess,
        isError: isSubtasksError,
        method: fetchSubtasks,
        data: fetchedSubtasks,
    } = useFetchTasksOfEpic();

    React.useEffect(() => {
        if (detail.type === 1) {
            fetchSubtasks(taskId);
        }
    }, [detail.type])

    React.useEffect(() => {
        if (isSubtasksSuccess) {
            const data = fetchedSubtasks.data.map((item) => ({ id: item.id, name: item.name, point: item.point }))
            setSubtasks(data);
        }
    }, [isSubtasksSuccess])

    React.useEffect(() => {
        if (isFetchDetailSuccess) {
            setDescription(JSON.parse(taskDetail.description));
            
            let ceiled = Math.ceil(taskDetail.estimated);
            setDetail({
                type: taskDetail.type,
                name: taskDetail.name,
                point: taskDetail.point,
                fromDate: dayjs(taskDetail.fromDate).format('DD/MM/YYYY'),
                toDate: dayjs(taskDetail.toDate).format('DD/MM/YYYY'),
                reportToName: taskDetail.reportToName,
                inChargeName: taskDetail.inChargeName,
                columnName: taskDetail.columnName,
                taskType: taskDetail.taskType,
                estimated: taskDetail.estimated,
                estimatedDate: dayjs(taskDetail.fromDate).add(ceiled, 'day').format('DD/MM/YYYY')
            })
        }
    }, [isFetchDetailSuccess])

    React.useEffect(() => {
        if (isFetchLabelsSuccess) {
            setLabelList(labels.data.map(label => ({ id: label.id, name: label.name })))
        }
    }, [isFetchLabelsSuccess])

    return <Fragment>
        {isTaskCreateOpen &&
            <TaskSubCreate
                taskId={taskId}
                closeCb={() => {
                    setIsTaskCreateOpen(false);
                    fetchSubtasks(taskId);
                }}
            />
        }

        {isDescriptionDialogOpen &&
            <DescriptionDialog taskId={taskId} reloadDescription={() => {
                setDescription(null);
                fetchTaskDetail(taskId);
            }}
                closeDialogCb={() => setIsDescriptionDialogOpen(false)} description={description} />}

        {isTaskDetailEditOpen &&
            <TaskDetailEdit
                reload={() => { fetchTaskDetail(taskId) }}
                taskId={taskId}
                closeDialogCb={() => setIsTaskDetailEditOpen(false)} />}

        {isReopenTaskOpen &&
            <TaskReopen
                reload={() => { fetchTaskDetail(taskId) }}
                taskId={taskId}
                closeDialogCb={() => setIsReopenTaskOpen(false)} />}

        {isAddLabelOpen &&
            <TaskDetailNewLabel
                reloadLabels={() => fetchLabels(taskId)}
                taskId={taskId}
                closeDialogCb={() => setIsAddLabelOpen(false)} />
        }

        {isRemoveLabelOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa nhãn này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setLabelId(null);
                        setIsRemoveLabelOpen(false);
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setLabelId(null);
                        setIsRemoveLabelOpen(false);
                        removeTaskLabelFromTask(taskId, labelId);
                    }
                }}
            />}

        {isDeleteLinkTaskOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa liên kết subtask này"
                cancelAction={{
                    text: "Hủy",
                    handler: () => {
                        setSubTaskToBeDeleted(null);
                        setIsDeleteLinkTaskOpen(false);
                    },
                }}
                confirmAction={{
                    text: "Xác nhận",
                    handler: () => {
                        setSubTaskToBeDeleted(null);
                        setIsDeleteLinkTaskOpen(false);
                        deleteTaskFromEpic(subTaskToBeDeleted);
                    }
                }}
            />}


        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                flex: 2
            }}>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TaskDetailHeader>
                            Mô Tả
                        </TaskDetailHeader>

                        <Button onClick={() => setIsDescriptionDialogOpen(true)}>
                            cập nhật mô tả
                        </Button>
                    </Box>

                    {description ?
                        <RTEContent
                            value={description}
                        /> :
                        <Typography fontStyle={"italic"}>
                            Chưa có mô tả nào.
                        </Typography>
                    }
                </Box>
                <Box>
                    <TaskDetailComments taskId={taskId} />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                flex: 1,
            }}>
                <Box sx={{
                    position: 'relative',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TaskDetailHeader>
                            Danh sách nhãn
                        </TaskDetailHeader>

                        <Button size='small' onClick={() => setIsAddLabelOpen(true)}>
                            Thêm nhãn
                        </Button>
                    </Box>

                    {isFetchLabelsSuccess && labelList.length > 0 ?
                        labelList.map((label) =>
                            <Chip variant="outlined"
                                id={label.id}
                                label={label.name}
                                onDelete={() => {
                                    setIsRemoveLabelOpen(true);
                                    setLabelId(label.id)
                                }}
                            />) :
                        <Typography fontStyle={"italic"}>Chưa có nhãn nào</Typography>
                    }

                    {isFetchLabelsPending &&
                        <LoadingOverlay isLoading={isFetchLabelsPending} />
                    }
                </Box>
                <Box sx={{ position: 'relative' }}>
                    {isFetchDetailPending &&
                        <LoadingOverlay isLoading={isFetchDetailPending} />
                    }

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TaskDetailHeader>
                            Chi tiết
                        </TaskDetailHeader>

                        {
                            taskDetail && lowerCase(taskDetail.columnName) !== "done" &&
                            <Button onClick={() => setIsTaskDetailEditOpen(true)}>
                                Cập nhật task
                            </Button>
                        }
                        {
                            taskDetail && lowerCase(taskDetail.columnName) === "done" &&
                            <Button onClick={() => setIsReopenTaskOpen(true)}>
                                Mở lại task
                            </Button>
                        }
                    </Box>


                    <Fragment>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                            position: 'relative'
                        }}>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 400,
                            }}>
                                <OneColumnBox
                                    slot={
                                        <Fragment>
                                            <Label text={"Tiêu đề"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.name}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Trạng thái"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.columnName}
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Effort"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.point}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Người được gán"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.inChargeName ?? "Chưa gán"}
                                            </Typography>
                                        </Fragment>
                                    }
                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Người báo cáo"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.reportToName ?? "Chưa gán"}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Ngày bắt đầu"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.fromDate}
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Ngày kết thúc"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.toDate}
                                            </Typography>
                                        </Fragment>
                                    }
                                />


                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Dự kiến hoàn thành"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                { detail.estimatedDate                                                }
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                        </Fragment>
                                    }
                                />
                            </Box>
                        </Box>
                    </Fragment>

                    {
                        subTasks && subTasks.length > 0 &&
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'relative',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                                gap: 2,
                            }}>

                                <TaskDetailHeader>
                                    Task liên quan
                                </TaskDetailHeader>
                                {detail.type == 1 &&
                                    <Button onClick={() => setIsTaskCreateOpen(true)}>
                                        Liên kết subtask
                                    </Button>
                                }

                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{
                                    display: 'flex', justifyContent: 'space-between', paddingY: 0.35,
                                    paddingX: 1,
                                }}>
                                    <Box sx={{ fontWeight: 'bold', color: grey[700] }}>Id</Box>
                                    <Box sx={{ fontWeight: 'bold', color: grey[700] }}>Tên</Box>
                                </Box>
                                {subTasks && subTasks.map((item) => <Box
                                    onClick={() => {
                                        setActiveSubtask(item.id)
                                        setIsSubtaskOpen(true);
                                    }}
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        paddingY: 0.35,
                                        paddingX: 1,
                                        background: blue[50],
                                        '&:hover': {
                                            background: blue[100],
                                        }
                                    }}
                                    key={item.id}>
                                    <Box>
                                        {item.id}
                                    </Box>
                                    <Box>
                                        {item.name}
                                    </Box>
                                    <Box sx={{
                                        position: 'absolute',
                                        left: '100%',
                                        bottom: '0px',
                                        padding: '5px',
                                        fontSize: '14px',
                                        '&:hover': {
                                            background: red[400]
                                        }
                                    }} onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setIsDeleteLinkTaskOpen(true);
                                        setSubTaskToBeDeleted(item.id)
                                    }}>
                                        x
                                    </Box>
                                </Box>)}
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>

            {isSubtaskOpen && activeSubtask &&
                <TaskDetail taskId={activeSubtask} closeCb={() => {
                    setIsSubtaskOpen(false)
                    setActiveSubtask(null);
                }} />
            }
        </Box>
    </Fragment>;
}