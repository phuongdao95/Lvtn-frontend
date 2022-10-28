import React from "react";
import { Fragment } from "react";
import { Box } from "@mui/system";

import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox"
import DialogForm from "../../../components/DialogForm";
import AutoComplete from "../../../components/DialogForm/AutoComplete";

import { useParams } from "react-router";
import { useFetchTaskLabelsOfBoard } from "../../../client/taskboardService";
import { useAddTaskLabel, useRemoveTaskLabelFromTask } from "../../../client/taskService";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function TaskDetailNewLabel({ reloadLabels, taskId, closeDialogCb }) {
    const { id: boardId } = useParams();
    const [labelOptions, setLabelOptions] = React.useState([]);
    const [label, setLabel] = React.useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        data: labels,
        method: fetchLabels,
    } = useFetchTaskLabelsOfBoard()

    const {
        isSuccess: isAddTaskLabelSuccess,
        isError: isAddTaskLabelError,
        method: addTaskLabelToTask
    } = useAddTaskLabel();

    const {
        method: removeTaskLabelFromTask
    } = useRemoveTaskLabelFromTask();

    React.useEffect(() => {
        fetchLabels(boardId);
    }, [boardId]);

    React.useEffect(() => {
        if (isAddTaskLabelSuccess) {
            reloadLabels();
            closeDialogCb();
        }
    }, [isAddTaskLabelSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            setLabelOptions(labels.data)
        }
    }, [isSuccess])

    return <Dialog
        primaryAction={{
            text: "Thêm Nhãn",
            handler: () => {
                console.log({ label })
                if (label) {
                    addTaskLabelToTask(taskId, label.id)
                }
            },
        }}
        secondaryAction={{
            text: "Hủy bỏ",
            handler: closeDialogCb
        }}
        title="Thêm Nhãn"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isPending} />

            <Box>
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Nhãn"} />
                            <AutoComplete
                                id="label"
                                name="label"
                                value={label}
                                options={labelOptions}
                                onChange={(event, value) => {
                                    setLabel(value);
                                }}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}