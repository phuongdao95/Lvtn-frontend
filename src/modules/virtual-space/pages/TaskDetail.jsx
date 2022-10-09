import React, { Fragment } from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import TextField from '../../../components/DialogForm/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import TaskDetailHeader from "../components/TaskDetailHeader";
import OneColumnBox from '../../../components/DialogForm/OneColumnBox';
import Label from '../../../components/DialogForm/Label';
import TwoColumnBox from '../../../components/DialogForm/TwoColumnBox';
import RichTextEditor from '../components/RichTextEditor';

export default function TaskDetail({ closeCb = () => { } }) {
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
                onClose={closeCb}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DialogTitle>Thông tin Task</DialogTitle>
                    <IconButton>
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 2
                    }}>
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <TaskDetailHeader>
                                    Description
                                </TaskDetailHeader>

                                <Button>
                                    edit description
                                </Button>
                            </Box>
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

                                <Button>
                                    write a comment
                                </Button>
                            </Box>
                            <RichTextEditor />
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

                        <OneColumnBox
                            slot={
                                <Fragment>
                                    <Label text={"Trạng thái"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                        <OneColumnBox
                            slot={
                                <Fragment>
                                    <Label text={"Người được gán"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                        <OneColumnBox
                            slot={
                                <Fragment>
                                    <Label text={"Người báo cáo"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                        <OneColumnBox
                            slot={
                                <Fragment>
                                    <Label text={"Nhãn"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                        <TwoColumnBox
                            firstSlot={
                                <Fragment>
                                    <Label text={"Ngày bắt đầu"} />
                                    <TextField />
                                </Fragment>
                            }

                            secondSlot={
                                <Fragment>
                                    <Label text={"Ngày kết thúc"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                        <OneColumnBox
                            slot={
                                <Fragment>
                                    <Label text={"Effort"} />
                                    <TextField />
                                </Fragment>
                            }
                        />

                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
