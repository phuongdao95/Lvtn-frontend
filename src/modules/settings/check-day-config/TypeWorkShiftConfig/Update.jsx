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

import { useFetchOne, useUpdate } from "../../../../client/workingShiftEvent";
import {useFetchListFormula} from "../../../../client/formulaService.js";
import dayjs from 'dayjs';
import Snackbar from '../../../../components/Snackbar/Snackbar';

import { useFormik } from "formik";
import * as yup from "yup";
const lookUp = (id, lst) => {
    let re = lst.filter(item => parseInt(id, 10) === item.id);
    return re && re[0] ? re[0] : null;
}
const listDateOfWeek = [
    {
        id: 1,
        name: "Thứ hai",
    },
    {
        id: 2,
        name: "Thứ ba",
    },
    {
        id: 3,
        name: "Thứ tư",
    },
    {
        id: 4,
        name: "Thứ năm",
    },
    {
        id: 5,
        name: "Thứ sáu",
    },
    {
        id: 6,
        name: "Thứ bảy",
    },
    {
        id: 0,
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

const Update = ({setOpen, id, done}) => {
    const handleClose = () => setOpen(false);
    const [lstFormula, setLstFormula] = useState([]);
    // useEffect(() => {
    //     let items = {
    //         name: 'Ca ' + id,
    //         dateOfWeek: 'Thứ ba',
    //         startTime: new Date(),
    //         endTime: new Date(),
    //         coefficient: 2,
    //     };
    //     formik.setValues({...items});
    // }, []);
    const {
        isPending: isUpdatePending,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        method: update
    } = useUpdate();

    const {
        isSuccess: isFetchListFormulaSuccess,
        data: fetchedFormulaList,
    } = useFetchListFormula();
    useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setLstFormula(fetchedFormulaList.data);
        }
    }, [isFetchListFormulaSuccess])
    const {
        isPending: isFetchPending,
        isSuccess: isFetchSuccess,
        isError: isFetchError,
        data: fetchedResponse,
        method: fetch
    } = useFetchOne();
    React.useEffect(() => {
        if (id) {
            fetch(id);
        }
    }, []);

    React.useEffect(() => {
        if (fetchedResponse) {
            let item = {
                name: fetchedResponse.name,
                dateOfWeek: dayjs(fetchedResponse.startTime).get('day'),
                startTime: dayjs(fetchedResponse.startTime),
                endTime: dayjs(fetchedResponse.endTime),
                formula: parseInt(fetchedResponse.formula),
                description: fetchedResponse.description,
            }
            formik.setValues({...item});
        }
    }, [fetchedResponse]);

    const formik = useFormik({
        initialValues: {
            name: "",
            dateOfWeek: 1,
            startTime: '',
            endTime: '',
            description: '',
            breakHours: 0,
            formula: 1,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const offset = new Date().getTimezoneOffset();
            let startTime = dayjs(values.startTime.toISOString()).set('day', values.dateOfWeek).add(-offset, 'minute');
            let endTime = dayjs(values.endTime.toISOString()).set('day', values.dateOfWeek).add(-offset, 'minute');
            const form = {
                name: values.name,
                description: values.description,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                formula: values.formula.toString(),
            };
            console.log(form);
            update(id, form);
        }
    })
    useEffect(() => {
        if (isUpdateSuccess) {
            // fetchList();
            setState({
                open: true,
                type: 'success',
                message: 'Tạo mới thành công',
            });
            handleClose();
            done();
        } else if (isUpdateError) {
            setState({
                open: true, 
                type: 'error',
                message: 'Tạo mới thất bại',
            });
        } else if (isFetchError) {
            setState({
                open: true, 
                type: 'error',
                message: 'Không tìm thấy ca làm',
            });
        }
    }, [isUpdateSuccess]);
    const [state, setState] = useState({
        open: false,
        type: 'info',
        message: '',
    });

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
        <Snackbar state={state} close={() => setState({...state, open: false})} />
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
                                sx={{minWidth: '300px'}}
                            >
                                {listDateOfWeek.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.id}
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
                                    renderInput={(params) => <MuiTextField sx={{minWidth: '300px',}} size='small' {...params} 
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
                                    renderInput={(params) => <MuiTextField sx={{minWidth: '300px',}} size='small' {...params}
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
                            <Label text={"Công thức"} />
                            <Select id="formula"
                                name="formula"
                                value={formik.values.formula}
                                onChange={(event, value) => {
                                    formik.setFieldValue("formula", event.target.value);
                                }}
                                error={formik.touched.formula && Boolean(formik.errors.formula)}
                                helperText={formik.touched.formula && formik.errors.formula}
                                size='small'
                                sx={{minWidth: '300px'}}
                            >
                                {lstFormula.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.id}
                                    >
                                        {item.displayName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Fragment>
                    }
                />
                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField id="description"
                                name="description"
                                type='text'
                                value={formik.values.description}
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