import React, { Fragment } from 'react';
import { Box, Button, Chip } from '@mui/material';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import { useFetchOneTask, useFetchTaskLabelsOfTask, useRemoveTaskLabelFromTask } from '../../../client/taskService';
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
    });

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
                closeCb={() => setIsTaskCreateOpen(false)}
                reload={() => { }}
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
                message="Bạn có muốn xóa chức vụ này"
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

                        <Button onClick={() => setIsTaskDetailEditOpen(true)}>
                            Cập nhật task
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
                                                {detail.inChargeName ?? "Unassigned"}
                                            </Typography>
                                        </Fragment>
                                    }
                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Người báo cáo"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {detail.reportToName ?? "Unassigned"}
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
                            Task liên quan
                        </TaskDetailHeader>
                        {detail.type == 0 &&
                            <Button onClick={() => setIsTaskCreateOpen(true)}>
                                Tạo subtask
                            </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    </Fragment>;
}