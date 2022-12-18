import * as React from 'react';
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router';
import * as workflowService from '../../../client/workflowService';
import DatePicker from '../../../components/DialogForm/DatePicker';

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
        .min(
            yup.ref("startDate"), "Ngày kết thúc phải lớn hơn ngày bắt đầu!"
        )
        .test('inYear', 'Cần tạo 2 yêu cầu nếu nghỉ qua năm!', (val, ctx) => {
            return new Date(val).getFullYear() == new Date(ctx.parent.startDate).getFullYear();
        })
        .required('Ngày kết thúc không được trống!')
});


const NghiPhepContent = ({ initialData, realData }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isNew = id === 'new';

    const formik = useFormik({
        initialValues: {
            reason: realData ? realData.reason : '',
            startDate: realData ? new Date(realData.startDate) : new Date(),
            endDate: realData ? new Date(realData.endDate) : new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const backToList = () => navigate('/approve-workflows/my-requests');
            if (isNew) {
                workflowService.createNghiPhep({ reason: values.reason, startDate: values.startDate, endDate: values.endDate }, backToList);
            }
            else {
                workflowService.updateNghiPhep({ id: id, reason: values.reason, startDate: values.startDate, endDate: values.endDate }, backToList);
            }
        }
    });
    React.useEffect(() => {
        if (realData) {
            formik.setValues({
                reason: realData?.reason ?? '',
                startDate: realData ? new Date(realData?.startDate) : new Date(),
                endDate: realData ? new Date(realData?.endDate) : new Date()
            });
        }
    }, [realData]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputLabel>Số ngày nghỉ phép còn lại (ngày)</InputLabel>
                <TextField fullWidth disabled size='small' defaultValue={initialData?.leaveBalance ?? 0}></TextField>
            </Grid>

            <Grid item xs={6}>
                <InputLabel>Lý do xin phép</InputLabel>
                <TextField
                    fullWidth placeholder="Vì lý do..." multiline maxRows={4} size="small"
                    defaultValue={realData?.reason ?? ''}
                    name="reason"
                    onChange={formik.handleChange}
                    value={formik.values.reason}
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}></TextField>
            </Grid>

            <Grid item xs={3}>
                <InputLabel>Nghỉ từ ngày</InputLabel>
                <DatePicker id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={(value) => formik.setFieldValue("startDate", value)}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                />
            </Grid>
            <Grid item xs={3}>
                <InputLabel>Nghỉ đến ngày</InputLabel>
                <DatePicker id="endDate"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={(value) => formik.setFieldValue("endDate", value)}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }} onClick={() => navigate('/approve-workflows')}>
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
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) {
        navigate("/notfound");
    }
    const isNew = id === 'new';
    const [initialData, setInitialData] = React.useState();
    const [realData, setRealData] = React.useState();
    React.useEffect(() => {
        if (isNew) {
            workflowService.getIntialNghiPhep().then(res => setInitialData(res));
        }
        else {
            workflowService.getNghiPhepById(id).then(res => setRealData(res));
        }
    }, []);

    return (
        <ApproveItemPage content={<NghiPhepContent initialData={initialData} realData={realData} />} isNew={isNew} initialData={initialData} realData={realData} />
    );
}

export default UserNghiPhep;