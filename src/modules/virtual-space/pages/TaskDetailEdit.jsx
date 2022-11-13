import React, { Fragment } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import Dialog from "../../../components/Dialog";
import DialogForm from "../../../components/DialogForm";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import Label from "../../../components/DialogForm/Label";
import TextField from "../../../components/DialogForm/TextField";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox";
import DatePicker from "../../../components/DialogForm/DatePicker";
import AutoComplete from "../../../components/DialogForm/AutoComplete";
import { useUpdateTask, useFetchOneTask, useFetchTaskLabelsOfTask } from '../../../client/taskService';
import { useFetchUsersOfBoard, useFetchTaskLabelsOfBoard, useFetchTaskColumnsOfTaskBoard } from '../../../client/taskboardService';
import { useParams } from "react-router";
import dayjs from "dayjs";

export default function TaskDetailEdit({ reload, taskId, closeDialogCb }) {
    const { id: boardId } = useParams();

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
        isPending: isTaskColumnsPending,
        isSuccess: isTaskColumnsSuccess,
        method: fetchTaskColumns,
        data: taskColumnsResponse,
    } = useFetchTaskColumnsOfTaskBoard();

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
            point: 3,
        },
        onSubmit: (values) => {
            const labelIds = values.labels.map(label => label.id);
            const inChargeId = values.inCharge.id;
            const reportToId = values.reportTo.id;
            const columnId = values.column.id;

            updateTask(taskId, {
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

            const { name, point, fromDate, toDate, description } = taskDetail;

            formik.setValues({
                name, point: point, fromDate, toDate,
                reportTo,
                inCharge,
                column,
                labels: []
            })
        }
    }, [isFetchDetailSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            closeDialogCb();
            reload();
        }
    }, [isSuccess])

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
            console.log({ labels });
            formik.setFieldValue("labels", labels.data.map(label => ({ id: label.id, name: label.name })))
        }
    }, [isFetchLabelsSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Sửa thông tin task"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isPending} />
            <Fragment>
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
            </Fragment>
        </DialogForm>
    </Dialog >;
}