import React, {Fragment, useState, useEffect} from 'react';
import {Box} from '@mui/system'
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string("Tên bị bỏ trống")
        .required("Nhập tên"),
    description: yup
        .string(""),
})

const UpdatedTable = ({setOpen, id}) => {
    const handleClose = () => setOpen(false);
    const [listColumns, setListColumns] = useState([]);
    useEffect(() => {
        let items = {
            name: 'Bang ' + id,
            description: "mo ta",
        };
        formik.setValues({...items});
        let columns = [
            {
                id: '1',
                name: 'col 1',
            },
            {
                id: '2',
                name: 'col 2',
            }
        ];
        setListColumns(columns);
    }, [])
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            console.log(listColumns);
        }
    })
    const handleAddColumn = () => {
        let arr = [...listColumns];
        arr.push({name: ''});
        setListColumns(arr);
    }

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

                {listColumns.map((item, index) => (
                    <OneColumnBox key={index}
                        slot={
                            <Fragment>
                                <Label text={"Cột " + index} />
                                <TextField id={''+index}
                                    value={listColumns[index].name}
                                    onChange={(event, value) => {
                                        let arr = [...listColumns];
                                        arr[index].name = event.target.value;
                                        setListColumns(arr);
                                    }}
                                />
                            </Fragment>
                        }
                    />
                ))}

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Box 
                                sx={{display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',}}>
                                <IconButton color="primary" size="large" onClick={handleAddColumn}>
                                    <AddBoxIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} required />
                            <TextField id="description"
                                name="description"
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
export default UpdatedTable;