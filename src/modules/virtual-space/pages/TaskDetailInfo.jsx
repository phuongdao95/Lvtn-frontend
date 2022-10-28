import React, { Fragment } from 'react';
import { Box, Button, Chip } from '@mui/material';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import { useFetchOneTask, useFetchTaskLabelsOfTask, useRemoveTaskLabelFromTask } from '../../../client/taskService';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import RTEContent from '../components/RTEContent';
import TaskDetailComments from './TaskDetailComment';
import DescriptionDialog from '../components/DescriptionDialog';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { Typography } from '@mui/material';
import TaskDetailEdit from "./TaskDetailEdit";
import TaskDetailNewLabel from './TaskDetailNewLabel';

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function TaskDetailInfo({ taskId }) {
    const { id: boardId } = useParams();

    const [isCommentDialogOpen, setIsCommentDialogOpen] = React.useState(false);
    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = React.useState(false);
    const [isTaskDetailEditOpen, setIsTaskDetailEditOpen] = React.useState(false);
    const [isAddLabelOpen, setIsAddLabelOpen] = React.useState(false);
    const [description, setDescription] = React.useState(null);
    const [labelId, setLabelId] = React.useState();
    const [isRemoveLabelOpen, setIsRemoveLabelOpen] = React.useState(false);

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

    const formik = useFormik({
        initialValues: {
            name: "",
            column: { id: null, name: "" },
            inCharge: { id: null, name: "" },
            reportTo: { id: null, name: "" },
            labels: [],
            fromDate: dayjs(),
            toDate: dayjs().add(10),
            effort: 3,
        },
        onSubmit: (values) => {
        }
    });

    React.useEffect(() => {
        fetchTaskDetail(taskId);
        fetchLabels(taskId);
    }, []);


    React.useEffect(() => {
        if (isRemoveLabelSuccess) {
            fetchLabels(taskId);
        }
    }, [isRemoveLabelSuccess])

    React.useEffect(() => {
        if (isFetchDetailSuccess) {
            const reportTo = {
                id: taskDetail.reportToId,
                name: taskDetail.reportToName ?? ""
            }

            const inCharge = {
                id: taskDetail.inChargeId,
                name: taskDetail.inChargeName ?? ""
            }

            const column = {
                id: taskDetail.columnId,
                name: taskDetail.columnName ?? ""
            }

            const { name, effort, fromDate, toDate, description } = taskDetail;

            setDescription(JSON.parse(description));

            formik.setValues({
                name, point: effort, fromDate, toDate,
                reportTo,
                inCharge,
                column,
                labels: []
            })
        }
    }, [isFetchDetailSuccess])

    React.useEffect(() => {
        if (isFetchLabelsSuccess) {
            setLabelList(labels.data.map(label => ({ id: label.id, name: label.name })))
        }
    }, [isFetchLabelsSuccess])

    return <Fragment>


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
                                                {formik.values.name}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Trạng thái"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {formik.values.column.name}
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Effort"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {formik.values.effort ?? "Unset"}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Người được gán"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {formik.values.inChargeName ?? "Unassigned"}
                                            </Typography>
                                        </Fragment>
                                    }
                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Người báo cáo"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {formik.values.reportToName ?? "Unassigned"}
                                            </Typography>
                                        </Fragment>
                                    }
                                />

                                <TwoColumnBox
                                    firstSlot={
                                        <Fragment>
                                            <Label text={"Ngày bắt đầu"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {dayjs(formik.values.fromDate).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Fragment>
                                    }

                                    secondSlot={
                                        <Fragment>
                                            <Label text={"Ngày kết thúc"} />
                                            <Typography sx={{ fontSize: 15 }}>
                                                {dayjs(formik.values.toDate).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Fragment>
                                    }
                                />
                            </Box>
                        </Box>
                    </Fragment>
                </Box>
            </Box>
        </Box>
    </Fragment>;
}