import React, {Fragment, useState, useEffect} from 'react';
import {Box} from '@mui/system'
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { TextField as MuiTextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string("Tên bị bỏ trống")
        .required("Nhập tên"),
    startTime: yup
        .string("")
        .required("Nhập giờ vào"),
    endTime: yup
        .string("")
        .required("Nhập giờ nghỉ"),
})

const Update = ({setOpen, id}) => {
    const handleClose = () => setOpen(false);
    const [data, setData] = useState({});
    useEffect(() => {
        let items = {
            name: 'Ca ' + id,
            startTime: new Date(),
            endTime: new Date(),
            coefficient: 2,
        };
        formik.setValues({...items});
    }, [])
    const formik = useFormik({
        initialValues: {
            name: '',
            startTime: '',
            endTime: '',
            coefficient: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            console.log(values.startTime.valueOf()); // timestamp
            console.log(values.startTime.format('HH:mm:ss')); // string of time
        }
    })

    return (
    <Dialog
        primaryAction={{
            text: "Cập nhật",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: handleClose
        }}
        title="Cập nhật"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Tên"} required />
                            <TextField id="name"
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
                            <Label text={"Giờ vào"} required />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    value={formik.values.startTime}
                                    onChange={(newValue) => {
                                        formik.setFieldValue("startTime", newValue);
                                    }}
                                    renderInput={(params) => <MuiTextField {...params} 
                                    error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                    helperText={formik.touched.startTime && formik.errors.startTime}
                                    />}
                                />
                            </LocalizationProvider>
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Giờ nghỉ"} required />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    value={formik.values.endTime}
                                    onChange={(newValue) => {
                                        formik.setFieldValue("endTime", newValue);
                                    }}
                                    renderInput={(params) => <MuiTextField {...params}
                                    error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                    helperText={formik.touched.endTime && formik.errors.endTime}
                                    />}
                                />
                            </LocalizationProvider>
                        </Fragment>
                    }
                />
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Hệ số lương"} />
                            <TextField id="coefficient"
                                name="coefficient"
                                type='number'
                                value={formik.values.coefficient}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >
    );
}
export default Update;