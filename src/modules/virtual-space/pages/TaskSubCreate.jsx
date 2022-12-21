import React, { Fragment } from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Box, Typography, DialogActions, Button } from '@mui/material';
import { blue } from "@mui/material/colors"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import AutoComplete from '../../../components/DialogForm/AutoComplete';

import { useParams } from 'react-router';
import { useFetchTasksNotBelongToAnyEpicOfBoard, useLinkTask } from '../../../client/taskService';

export default function TaskSubCreate({ taskId: epicId, closeCb = () => { } }) {
    const { id: boardId } = useParams();
    const [taskOptions, setTaskOptions] = React.useState([]);
    const [pickedTask, setPickedTask] = React.useState({
        id: null,
        name: "Chưa gán"
    });


    const {
        isPending: isFetchOrphanTasksPending,
        isSuccess: isFetchOrphanTasksSuccess,
        isError: isFetchOrphanTasksError,
        method: fetchOrphanTasks,
        data: fetchedOrphanTasks
    } = useFetchTasksNotBelongToAnyEpicOfBoard();

    const {
        isPending,
        isError,
        isSuccess,
        method: linkTask,
    } = useLinkTask();

    React.useEffect(() => {
        if (boardId) {
            fetchOrphanTasks(boardId);
        }
    }, [boardId]);

    React.useEffect(() => {
        if (isFetchOrphanTasksSuccess) {
            var taskOptions = fetchedOrphanTasks.data.map((item) => ({ id: item.id, name: `${item.id} ${item.name}` }));
            setTaskOptions(taskOptions);
        }
    }, [isFetchOrphanTasksSuccess]);

    React.useEffect(() => {
        if (isSuccess) {
            closeCb();
        }
    }, [isSuccess])

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
                            {"Liên kết Task"}
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
                            <OneColumnBox
                                slot={
                                    <Fragment>
                                        <Label text={"Task"} />
                                        <AutoComplete
                                            id="task"
                                            name="task"
                                            getOptionLabel={(option) => option.name}
                                            options={taskOptions}
                                            value={pickedTask}
                                            onChange={(event, value) => {
                                                setPickedTask(value);
                                            }}
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
                        <Button variant="contained" onClick={() => {
                            if (pickedTask) {
                                linkTask(epicId, pickedTask.id);
                            }
                        }} >
                            Liên kết task
                        </Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
