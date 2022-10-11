import React, {Fragment, useState, useEffect} from 'react';
import {Box} from '@mui/system'
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string("")
        .required("Nhập tên"),
    money: yup
        .number(""),
    workDaySubtract: yup
        .number(""),
    description: yup
        .string(""),
})

const Update = ({setOpen, id}) => {
    const handleClose = () => setOpen(false);
    useEffect(() => {
        let data = {
            name: 'hình phạt ' + id,
            money: 20000,
            workDaySubtract: 2,
            description: 'khẩn cấp',
        };
        formik.setValues({...data});
    }, [])
    const formik = useFormik({
        initialValues: {
            name: "",
            money: 0,
            workDaySubtract: 0,
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
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
                            <Label text={"Tiền phạt"} />
                            <TextField id="money"
                                name="money"
                                value={formik.values.money}
                                onChange={formik.handleChange}
                                error={formik.touched.money && Boolean(formik.errors.money)}
                                helperText={formik.touched.money && formik.errors.money}
                            />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Số ngày công bị trừ"} />
                            <TextField id="workDaySubtract"
                                name="workDaySubtract"
                                type='number'
                                value={formik.values.workDaySubtract}
                                onChange={formik.handleChange}
                                error={formik.touched.workDaySubtract && Boolean(formik.errors.workDaySubtract)}
                                helperText={formik.touched.workDaySubtract && formik.errors.workDaySubtract}
                            />
                        </Fragment>
                    }
                />
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
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