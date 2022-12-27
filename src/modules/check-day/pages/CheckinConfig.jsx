import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import {Box} from '@mui/material';
import * as checkinRuleService from '../../../client/checkinConfigService';
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from '../../../components/Snackbar/Snackbar';
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
    ruleMinutes: yup
        .number('Nhập số phút ')
        .required('Số phút không được trống!'),
});

export default function CheckinConfig() {
    // const [checkRuleMinute, setCheckRuleMinute] = useState();
    const [state, setState] = useState({
        open: false,
        type: 'info',
        message: '',
    });
    useEffect(() => {
        checkinRuleService.getRule()
        .then(res => {
            console.log('res checkin rule ', res);
            // setCheckRuleMinute(res.data);
            formik.setValues({
                ruleMinutes: res.data
            });
        })
        .catch(error => {
            console.log('error checkin rule ', error);
        });
    }, [])

    const formik = useFormik({
        initialValues: {
            ruleMinutes: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            checkinRuleService.updateRule(values.ruleMinutes)
                .then(res => {
                    if (res.status == 200) {
                        setState({
                            type: 'success',
                            message: 'Cập nhật thành công',
                            open: true,
                        })
                        return true;
                    }
                    setState({
                        type: 'warning',
                        message: 'Thất bại! Xin hãy thử lại!',
                        open: true,
                    })
                    return false;
                })
                .catch(error => {
                    console.log('respose error ' + JSON.stringify(error));
                    setState({
                        type: 'error',
                        message: 'Thất bại! Xin hãy thử lại!',
                        open: true,
                    })
                    return false;
                });
        }
    });


    return (
    <Fragment>
        <Snackbar state={state} close={() => setState({...state, open: false})} />
        <Box sx={{
            padding: 2,
            background: 'white'
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 4,
                }}>
                    <Typography fontSize={30}
                        textTransform={"capitalize"}
                        fontWeight={500}
                        color={grey[800]}
                    >
                        Cài đặt thời gian cho phép Chấm công
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Button variant="contained" startIcon={<SaveIcon />} 
                            type="submit" onClick={(e) => { formik.handleSubmit(e); }}
                            // sx={{ marginTop: '2%' }}
                        >
                            {'Cập nhật'}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel>Số phút có thể chấm công </InputLabel>
                            <TextField
                                fullWidth size="small"
                                type="number"
                                name="ruleMinutes"
                                onChange={formik.handleChange}
                                value={formik.values.ruleMinutes}
                                error={formik.touched.ruleMinutes && Boolean(formik.errors.ruleMinutes)}
                                helperText={formik.touched.ruleMinutes && formik.errors.ruleMinutes}>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    </Fragment>
    );
}