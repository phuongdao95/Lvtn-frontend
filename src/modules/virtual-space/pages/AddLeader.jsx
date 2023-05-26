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
import * as yup from 'yup';



export default function AddLeader({ closeCb = () => { }, reload }) {

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
                            {"Thêm thành viên mới"}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={() => closeCb()}>
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ py: 1, px: 2 }}>

                    <DialogActions>
                        <Button onClick={closeCb}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={() => { }} >
                            Bổ nhiệm leader
                        </Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
