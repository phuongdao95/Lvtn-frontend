import * as React from 'react';
import { Grid, InputLabel, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router';
import * as workflowService from '../../../client/workflowService';
import DatePicker from '../../../components/DialogForm/DatePicker';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledSwitches from '../../shares/common/ControlledSwitches';

const validationSchema = yup.object({
    isBeforehand: yup
        .boolean(),
    startDate: yup
        .date()
        .required('Ngày bắt đầu không được trống!'),
});

const NghiThaiSanContent = ({ realData }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isNew = id === 'new';

    const formik = useFormik({
        initialValues: {
            isBeforehand: false,
            startDate: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const backToList = () => navigate('/approve-workflows/my-requests');
            if (isNew) {
                workflowService.createNghiThaiSan({ isHusband: values.isHusband, startDate: values.startDate }, backToList);
            }
            else {
                workflowService.updateNghiThaiSan({ id, startDate: values.startDate }, backToList);
            }
        }
    });
    React.useEffect(() => {
        if (realData) {
            formik.setValues({
                startDate: realData ? new Date(realData?.startDate) : new Date()
            });
        }
    }, [realData]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <InputLabel>Nghỉ thai sản trước quy định</InputLabel>
                <ControlledSwitches name="isBeforehand" onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={4}>
                <InputLabel>Nghỉ từ ngày</InputLabel>
                <DatePicker id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={(value) => formik.setFieldValue("startDate", value)}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
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
    );
}

const UserNghiThaiSan = () => {
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
            workflowService.getIntialNghiThaiSan().then(res => setInitialData(res));
        }
        else {
            workflowService.getNghiThaiSanById(id).then(res => setRealData(res));
        }
    }, []);


    return (
        <ApproveItemPage content={<NghiThaiSanContent realData={realData} />} isNew={isNew} initialData={initialData} realData={realData} />
    );
}

export default UserNghiThaiSan;