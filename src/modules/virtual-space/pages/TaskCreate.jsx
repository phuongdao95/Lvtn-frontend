import React, { Fragment } from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Box, Typography, DialogActions, Button } from '@mui/material';
import { blue } from "@mui/material/colors"
import Dialog from '@mui/material/Dialog';
import TextField from '../../../components/DialogForm/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import AutoComplete from '../../../components/DialogForm/AutoComplete';
import DatePicker from '../../../components/DialogForm/DatePicker';
import { initialValue } from '../components/RichTextEditor';

import { useFormik } from 'formik';
import {
    useFetchTaskColumnsOfTaskBoard,
    useFetchTaskLabelsOfBoard,
    useFetchUsersOfBoard
} from '../../../client/taskboardService';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { useCreateTask } from '../../../client/taskService';
import Select from '../../../components/DialogForm/Select';

export default function TaskCreate({ closeCb = () => { }, reload }) {
    const { id: boardId } = useParams();
    const [description, setDescription] = React.useState(initialValue);
    const [labelOptions, setLabelOptions] = React.useState([]);
    const [columnOptions, setColumnOptions] = React.useState([]);
    const [boardUserOptions, setBoardUserOptions] = React.useState([]);

    const {
        isPending: isFetchUsersPending,
        isSuccess: isFetchUsersSuccesss,
        isError: isFetchUsersError,
        method: fetchBoardUsers,
        data: boardUsers
    } = useFetchUsersOfBoard();

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
        isPending,
        isSuccess,
        isError,
        method: createTask,
    } = useCreateTask();

    const formik = useFormik({
        initialValues: {
            name: "",
            column: { id: null, name: "" },
            inCharge: { id: null, name: "" },
            reportTo: { id: null, name: "" },
            type: "task",
            labels: [],
            fromDate: dayjs(),
            toDate: dayjs().add(10),
            point: 3,
        },
        onSubmit: (values) => {
            const labelIds = values.labels.map(label => label.id);
            const inChargeId = values.inCharge.id;
            const reportToId = values.reportTo.id;
            const columnId = values.column.id;

            createTask({
                ...values,
                taskLabelIds: labelIds,
                inChargeId,
                reportToId,
                description: JSON.stringify(description),
                columnId,
            })
        }
    });

    React.useEffect(() => {
        fetchTaskLabels(boardId);
        fetchTaskColumns(boardId);
        fetchBoardUsers(boardId);
    }, []);

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

            formik.setFieldValue('column', columnOptions[0])
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
        if (isSuccess) {
            closeCb();
            reload();
        }
    }, [isSuccess]);

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={true}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row', bgcolor: blue[500], justifyContent: 'space-between'
                }}>
                    <DialogTitle >
                        <Typography variant="h5" color="white" component="span">
                            {"Tạo task mới"}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={() => closeCb()}>
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ py: 1, px: 2 }}>
                    <Fragment>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <TaskDetailHeader>
                                    Detail
                                </TaskDetailHeader>
                            </Box>

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
                                        <Label text={"Loại task"} />
                                        <Select
                                            id="type"
                                            name="type"
                                            value={formik.values.type}
                                            onChange={formik.handleChange}
                                            menu={[
                                                {
                                                    label: "Normal Task",
                                                    value: "task",
                                                },
                                                {
                                                    label: "Epic Task",
                                                    value: "epic"
                                                }
                                            ]}
                                        />
                                    </Fragment>
                                }
                                secondSlot={
                                    <Fragment>
                                        <Label text={"Effort"} />
                                        <TextField
                                            id="point"
                                            type="number"
                                            name="point"
                                            value={formik.values.point}
                                            onChange={formik.handleChange}
                                            error={formik.touched.point && Boolean(formik.errors.point)}
                                            helperText={formik.touched.point && formik.errors.point}
                                        />
                                    </Fragment>
                                }
                            />

                            <TwoColumnBox
                                firstSlot={
                                    <Fragment>
                                        <Label text={"Người gán"} />
                                        <AutoComplete
                                            id={"inCharge"}
                                            name={"inCharge"}
                                            options={boardUserOptions}
                                            getOptionLabel={(option) => option.id ? `${option.id} - ${option.name}` : `Chưa gán`}
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
                                            getOptionLabel={(option) => option.id ? `${option.id} - ${option.name}` : `Chưa gán`}
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
                        </Box>
                    </Fragment>
                    <DialogActions>
                        <Button onClick={closeCb}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={() => { formik.submitForm() }} >
                            Tạo mới task
                        </Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
