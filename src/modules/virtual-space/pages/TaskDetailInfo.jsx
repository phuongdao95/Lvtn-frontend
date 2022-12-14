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
import { blue, grey, red } from '@mui/material/colors';

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
                message: 'C?? l???i x???y ra t??? server'
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

            setDetail({
                type: taskDetail.type,
                name: taskDetail.name,
                point: taskDetail.point,
                fromDate: dayjs(taskDetail.fromDate).format('DD/MM/YYYY'),
                toDate: dayjs(taskDetail.toDate).format('DD/MM/YYYY'),
                reportToName: taskDetail.reportToName,
                inChargeName: taskDetail.inChargeName,
                columnName: taskDetail.columnName,
                taskType: taskDetail.taskType
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

        {isAddLabelOpen &&
            <TaskDetailNewLabel
                reloadLabels={() => fetchLabels(taskId)}
                taskId={taskId}
                closeDialogCb={() => setIsAddLabelOpen(false)} />
        }

        {isRemoveLabelOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="B???n c?? mu???n x??a nh??n n??y"
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
                message="B???n c?? mu???n x??a li??n k???t subtask n??y"
                cancelAction={{
                    text: "H???y",
                    handler: () => {
                        setSubTaskToBeDeleted(null);
                        setIsDeleteLinkTaskOpen(false);
                    },
                }}
                confirmAction={{
                    text: "X??c nh???n",
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
                            M?? T???
                        </TaskDetailHeader>

                        <Button onClick={() => setIsDescriptionDialogOpen(true)}>
                            c???p nh???t m?? t???
                        </Button>
                    </Box>

                    {description ?
                        <RTEContent
                            value={description}
                        /> :
                        <Typography fontStyle={"italic"}>
                            Ch??a c?? m?? t??? n??o.
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
                            Danh s??ch nh??n
                        </TaskDetailHeader>

                        <Button size='small' onClick={() => setIsAddLabelOpen(true)}>
                            Th??m nh??n
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
                        <Typography fontStyle={"italic"}>Ch??a c?? nh??n n??o</Typography>
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
                            Chi ti???t
                        </TaskDetailHeader>

                        <Button onClick={() => setIsTaskDetailEditOpen(true)}>
                            C???p nh???t task
                        </Button>
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
                                            <Label text={"Ti??u ?????"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.name}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Tr???ng th??i"} />
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
                                            <Label text={"Ng?????i ???????c g??n"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.inChargeName ?? "Ch??a g??n"}
                                            </Typography>
                                        </Fragment>
                                    }
                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Ng?????i b??o c??o"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.reportToName ?? "Ch??a g??n"}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Ng??y b???t ?????u"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.fromDate}
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Ng??y k???t th??c"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.toDate}
                                            </Typography>
                                        </Fragment>
                                    }
                                />
                            </Box>
                        </Box>
                    </Fragment>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        position: 'relative',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        gap: 2,
                    }}>

                        <TaskDetailHeader>
                            Task li??n quan
                        </TaskDetailHeader>
                        {detail.type == 1 &&
                            <Button onClick={() => setIsTaskCreateOpen(true)}>
                                Li??n k???t subtask
                            </Button>
                        }

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between', paddingY: 0.35,
                            paddingX: 1,
                        }}>
                            <Box sx={{ fontWeight: 'bold', color: grey[700] }}>Id</Box>
                            <Box sx={{ fontWeight: 'bold', color: grey[700] }}>T??n</Box>
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