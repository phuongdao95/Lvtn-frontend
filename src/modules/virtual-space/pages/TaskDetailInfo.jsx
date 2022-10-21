import React, { Fragment } from 'react';
import { Box, Button } from '@mui/material';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import TextField from '../../../components/DialogForm/TextField';
import DatePicker from '../../../components/DialogForm/DatePicker';
import AutoCompleteMultiple from '../../../components/DialogForm/AutoCompleteMultiple';
import AutoComplete from '../../../components/DialogForm/AutoComplete';
import { useUpdateTask, useFetchOneTask, useFetchTaskLabelsOfTask } from '../../../client/taskService';
import { useFetchUsersOfBoard, useFetchTaskLabelsOfBoard, useFetchTaskColumnsOfTaskBoard } from '../../../client/taskboardService';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import RTEContent from '../components/RTEContent';
import TaskDetailComments from './TaskDetailComment';
import CommentDialog from '../components/CommentDialog';
import DescriptionDialog from '../components/DescriptionDialog';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';

export default function TaskDetailInfo({ taskId }) {
    const { id: boardId } = useParams();

    const [isCommentDialogOpen, setIsCommentDialogOpen] = React.useState(false);
    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = React.useState(false);

    const [description, setDescription] = React.useState(null);
    const [labelOptions, setLabelOptions] = React.useState([]);
    const [columnOptions, setColumnOptions] = React.useState([]);
    const [boardUserOptions, setBoardUserOptions] = React.useState([]);

    const {
        isPending,
        isSuccess,
        isError,
        method: updateTask,
    } = useUpdateTask();

    const {
        isPending: isFetchUsersPending,
        isSuccess: isFetchUsersSuccesss,
        isError: isFetchUsersError,
        method: fetchBoardUsers,
        data: boardUsers
    } = useFetchUsersOfBoard();

    const {
        isPending: isFetchLabelsPending,
        isSuccess: isFetchLabelsSuccess,
        isError: isFetchLabelsError,
        method: fetchLabels,
        data: labels,
    } = useFetchTaskLabelsOfTask();

    const {
        isPending: isTaskLabelsPending,
        isSuccess: isTaskLabelsSuccess,
        isError: isTaskLabelsError,
        method: fetchTaskLabels,
        data: taskLabelsResponse
    } = useFetchTaskLabelsOfBoard();

    const {
        isPending: isTaskColumnsPending,
        isSuccess: isTaskColumnsSuccess,
        method: fetchTaskColumns,
        data: taskColumnsResponse,
    } = useFetchTaskColumnsOfTaskBoard();

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
            const labelIds = values.labels.map(label => label.id);
            const inChargeId = values.inCharge.id;
            const reportToId = values.reportTo.id;
            const columnId = values.column.id;

            updateTask({
                ...values,
                taskLabelIds: labelIds,
                inChargeId,
                reportToId,
                description: JSON.stringify(description), columnId
            })
        }
    });

    React.useEffect(() => {
        fetchTaskDetail(taskId);
        fetchTaskLabels(boardId);
        fetchBoardUsers(boardId);
        fetchLabels(taskId);
    }, []);

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
        if (isTaskLabelsSuccess) {
            setLabelOptions(taskLabelsResponse.data.map(
                label => ({ id: label.id, name: label.name })))
        }
    }, [isTaskLabelsSuccess])

    React.useEffect(() => {
        if (isTaskColumnsSuccess) {
            setColumnOptions(taskColumnsResponse.data.map(
                column => ({ id: column.id, name: column.name })))
        }
    }, [isTaskColumnsSuccess])

    React.useEffect(() => {
        if (isFetchUsersSuccesss) {
            const boardUserOptions = boardUsers.data.map(
                (user) => ({ id: user.id, name: user.name }))
            setBoardUserOptions(boardUserOptions);
        }
    }, [isFetchUsersSuccesss])

    React.useEffect(() => {
        if (isFetchLabelsSuccess) {
            formik.setFieldValue("labels", labels.data.map(label => ({ id: label.id, name: label.name })))
        }
    }, [isFetchLabelsSuccess])

    return <Fragment>
        {isCommentDialogOpen &&
            <CommentDialog taskId={taskId} closeDialogCb={
                () => setIsCommentDialogOpen(false)} />}

        {isDescriptionDialogOpen &&
            <DescriptionDialog taskId={taskId} closeDialogCb={
                () => setIsDescriptionDialogOpen(false)} description={description} />}


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
                <Box sx={{ minHeight: 300 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TaskDetailHeader>
                            Description
                        </TaskDetailHeader>

                        <Button onClick={() => setIsDescriptionDialogOpen(true)}>
                            edit description
                        </Button>
                    </Box>

                    <RTEContent
                        value={description}
                    />
                </Box>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TaskDetailHeader>
                            Comment
                        </TaskDetailHeader>

                        <Button onClick={() => setIsCommentDialogOpen(true)}>
                            write a comment
                        </Button>
                    </Box>

                    <TaskDetailComments taskId={taskId} />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TaskDetailHeader>
                        Detail
                    </TaskDetailHeader>

                    <Button>
                        Edit task
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
                        }}>
                            <OneColumnBox
                                slot={
                                    <Fragment>
                                        <Label text={"Tiêu đề"} />
                                        <TextField
                                            id="name"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </Fragment>
                                }
                            />

                            <TwoColumnBox
                                firstSlot={
                                    <Fragment>
                                        <Label text={"Trạng thái"} />
                                        <AutoComplete
                                            id="column"
                                            name="column"
                                            getOptionLabel={(option) => option.name}
                                            options={columnOptions}
                                            value={formik.values.column}
                                            onChange={(event, value) => {
                                                formik.setFieldValue("column", value)
                                            }}
                                        />
                                    </Fragment>
                                }

                                secondSlot={
                                    <Fragment>
                                        <Label text={"Effort"} />
                                        <TextField
                                            id="effort"
                                            type="number"
                                            name="effor"
                                            value={formik.values.effort}
                                            onChange={formik.handleChange}
                                            error={formik.touched.effort && Boolean(formik.errors.effort)}
                                            helperText={formik.touched.effort && formik.errors.effort}
                                        />
                                    </Fragment>
                                }
                            />

                            <TwoColumnBox
                                firstSlot={
                                    <Fragment>
                                        <Label text={"Người được gán"} />
                                        <AutoComplete
                                            id={"inCharge"}
                                            name={"inCharge"}
                                            options={boardUserOptions}
                                            getOptionLabel={(option) => option.id ? `${option.id} - ${option.name}` : `Empty Option`}
                                            value={formik.values.inCharge}
                                            onChange={(event, value) => {
                                                formik.setFieldValue("inCharge", value)
                                            }}
                                        />
                                    </Fragment>
                                }
                                secondSlot={
                                    <Fragment>
                                        <Label text={"Người báo cáo"} />
                                        <AutoComplete
                                            id={"reportTo"}
                                            name={"reportTo"}
                                            options={boardUserOptions}
                                            getOptionLabel={(option) => option.id ? `${option.id} - ${option.name}` : `Empty Option`}
                                            value={formik.values.reportTo}
                                            onChange={(event, value) => {
                                                formik.setFieldValue("reportTo", value)
                                            }}
                                        />
                                    </Fragment>
                                }
                            />

                            <TwoColumnBox
                                firstSlot={
                                    <Fragment>
                                        <Label text={"Ngày bắt đầu"} />
                                        <DatePicker id="fromDate"
                                            name="fromDate"
                                            value={formik.values.fromDate}
                                            onChange={(value) => formik.setFieldValue("fromDate", value)}
                                        />
                                    </Fragment>
                                }

                                secondSlot={
                                    <Fragment>
                                        <Label text={"Ngày kết thúc"} />
                                        <DatePicker id="toDate"
                                            name="toDate"
                                            value={formik.values.toDate}
                                            onChange={(value) => formik.setFieldValue("toDate", value)}
                                        />
                                    </Fragment>
                                }
                            />

                            <OneColumnBox
                                slot={
                                    <Fragment>
                                        <Label text={"Danh sách Nhãn"} />
                                        <AutoCompleteMultiple
                                            id="labels"
                                            name="labels"
                                            getOptionLabel={(option) => option.name}
                                            options={labelOptions}
                                            value={formik.values.labels}
                                            onChange={(event, value) => {
                                                formik.setFieldValue("labels", value)
                                            }}
                                        />
                                    </Fragment>
                                }
                            />
                        </Box>
                    </Box>
                </Fragment>
            </Box>
        </Box>
    </Fragment>;
}