import React, {Fragment, useState, useEffect} from 'react';
import {Box} from '@mui/system'
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '../../../../components/DialogForm/Select';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string("")
        .required("Nhập tên"),
    minutes: yup
        .number("")
        .required("Nhập số phút"),
    isLate: yup
        .string("")
        .required(""),
    punish: yup
        .number("")
        .required("Chọn hình phạt"),
})

const Update = ({setOpen, id}) => {
    const handleClose = () => setOpen(false);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        let items = [
            {
                'value': 1,
                'label': 'Phạt tiền đi muộn 30 phút',
            },
            {
                'value': 2,
                'label': 'Trừ 0,5 công về sớm 30 phút',
            },
        ];
        setMenu(items);
        let data = {
            name: "Phat " + id,
            minutes: '20',
            isLate: 0,
            punish: 2,
        };
        formik.setValues({...data});
    }, []);
    const formik = useFormik({
        initialValues: {
            name: "",
            minutes: '',
            isLate: 1,
            punish: 1,
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
                            <Label text={""} />
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={formik.values.isLate}
                                onChange={(event, value) => {
                                    formik.setFieldValue("isLate", value);
                                }}
                                error={formik.touched.isLate && Boolean(formik.errors.isLate)}
                                helperText={formik.touched.isLate && formik.errors.isLate}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Đi trễ" />
                                <FormControlLabel value={0} control={<Radio />} label="Về sớm" />
                            </RadioGroup>
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Số phút"} required />
                            <TextField id="minutes"
                                name="minutes"
                                type='number'
                                value={formik.values.minutes}
                                onChange={formik.handleChange}
                                error={formik.touched.minutes && Boolean(formik.errors.minutes)}
                                helperText={formik.touched.minutes && formik.errors.minutes}
                            />
                        </Fragment>
                    }
                />
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Hình phạt"} />
                            <Select
                                id="punish"
                                value={formik.values.punish}
                                onChange={(event, value) => {
                                    formik.setFieldValue("punish", value.props.value)
                                }}
                                menu={menu}
                                error={formik.touched.punish && Boolean(formik.errors.punish)}
                                helperText={formik.touched.punish && formik.errors.punish}
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