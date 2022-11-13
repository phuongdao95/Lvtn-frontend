import * as React from 'react';
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ComponentDatePicker from '../../shares/common/ComponentDatePicker';
import { useNavigate, useParams } from 'react-router';
import * as workflowService from '../../../client/workflowService';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    reason: yup
        .string('Nhập lý do')
        .required('Lý do nghỉ phép không được trống!'),
    startDate: yup
        .date()
        .required('Ngày bắt đầu không được trống!'),
    endDate: yup
        .date()
        .required('Ngày kết thúc không được trống!'),
});


const NghiPhepContent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isNew = id === 'new';

    const formik = useFormik({
        initialValues: {
            reason: '',
            startDate: new Date(),
            endDate: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const backToList = () => navigate('/approve-workflows/my-requests');
            workflowService.createNghiPhep({ reason: values.reason, startDate: new Date(), endDate: new Date() }, backToList);
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputLabel>Số ngày nghỉ phép còn lại (ngày)</InputLabel>
                <TextField fullWidth disabled size='small' defaultValue="4"></TextField>
            </Grid>

            <Grid item xs={6}>
                <InputLabel>Lý do xin phép</InputLabel>
                <TextField
                    fullWidth placeholder="Vì lý do..." multiline maxRows={4} size="small"
                    name="reason"
                    onChange={formik.handleChange}
                    value={formik.values.reason}
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}></TextField>
            </Grid>

            <Grid item xs={3}>
                <ComponentDatePicker label='Nghỉ từ ngày' date={new Date()} isReadOnly={false}
                    onChange={formik.handleChange}
                    value={formik.values.startDate} />
            </Grid>
            <Grid item xs={3}>
                <ComponentDatePicker label='Nghỉ đến ngày' date={new Date()} isReadOnly={false} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                <Button variant="contained" startIcon={<SaveIcon />} type="submit" onClick={(e) => { formik.handleSubmit(e); }}>
                    {isNew ? 'Tạo mới' : 'Chỉnh sửa'}
                </Button>
            </Grid>
        </Grid>
    )
}


const UserNghiPhep = () => {

    return (
        <ApproveItemPage content={<NghiPhepContent />} />
    );
}

export default UserNghiPhep;