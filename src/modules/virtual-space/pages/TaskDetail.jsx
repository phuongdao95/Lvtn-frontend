import React from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Box, Typography } from '@mui/material';
import { blue } from "@mui/material/colors"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TaskDetailTabs from '../components/TaskDetailTabs';
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailFiles from "./TaskDetailFile";

export default function TaskDetail({ taskId, closeCb = () => { } }) {

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                PaperProps={{
                    sx: {
                        height: '90vh'
                    }
                }}
                maxWidth={'xl'}
                open={true}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor: blue[500], justifyContent: 'space-between' }}>
                    <DialogTitle >
                        <Typography variant="h5" color="white" component="span">
                            {"Thông tin task"}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={() => closeCb()}>
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ py: 1, px: 2 }}>
                    <TaskDetailTabs
                        infoSection={
                            <TaskDetailInfo taskId={taskId} />
                        }
                        fileSection={
                            <TaskDetailFiles taskId={taskId} />
                        }

                    />
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
