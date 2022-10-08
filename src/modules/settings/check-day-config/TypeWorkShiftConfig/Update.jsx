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
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useFormik } from "formik";
import * as yup from "yup";

const listDateOfWeek = [
    {
        id: 0,
        name: "Thứ hai",
    },
    {
        id: 1,
        name: "Thứ ba",
    },
    {
        id: 2,
        name: "Thứ tư",
    },
    {
        id: 3,
        name: "Thứ năm",
    },
    {
        id: 4,
        name: "Thứ sáu",
    },
    {
        id: 5,
        name: "Thứ bảy",
    },
    {
        id: 6,
        name: "Chủ nhật",
    },
]

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
    useEffect(() => {
        let items = {
            name: 'Ca ' + id,
            dateOfWeek: 'Thứ ba',
            startTime: new Date(),
            endTime: new Date(),
            coefficient: 2,
        };
        formik.setValues({...items});
    }, []);
    const formik = useFormik({
        initialValues: {
            name: "",
            dateOfWeek: "",
            startTime: '',
            endTime: '',
            coefficient: 1,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            console.log(values.startTime.valueOf()); // timestamp
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

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Ngày trong tuần"} />
                            <Select id="dateOfWeek"
                                name="dateOfWeek"
                                value={formik.values.dateOfWeek}
                                onChange={(event, value) => {
                                    formik.setFieldValue("dateOfWeek", event.target.value);
                                }}
                                error={formik.touched.dateOfWeek && Boolean(formik.errors.dateOfWeek)}
                                helperText={formik.touched.dateOfWeek && formik.errors.dateOfWeek}
                                size='small'
                            >
                                {listDateOfWeek.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Giờ vào"} required />
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                                <TimePicker
                                    value={formik.values.startTime}
                                    onChange={(newValue) => {
                                        newValue = newValue == null ? "" : newValue;
                                        formik.setFieldValue("startTime", newValue);
                                    }}
                                    renderInput={(params) => <MuiTextField {...params} 
                                    error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                    helperText={formik.touched.startTime && formik.errors.startTime}
                                    />}
                                    size='small'
                                />
                            {/* </LocalizationProvider> */}
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Giờ nghỉ"} required />
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                                <TimePicker
                                    value={formik.values.endTime}
                                    onChange={(newValue) => {
                                        newValue = newValue == null ? "" : newValue;
                                        formik.setFieldValue("endTime", newValue);
                                    }}
                                    renderInput={(params) => <MuiTextField {...params}
                                    error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                    helperText={formik.touched.endTime && formik.errors.endTime}
                                    />}
                                />
                            {/* </LocalizationProvider> */}
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