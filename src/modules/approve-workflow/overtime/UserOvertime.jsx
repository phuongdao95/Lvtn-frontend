import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ComponentDatePicker from '../../shares/common/ComponentDatePicker';
import { useNavigate } from 'react-router';
import * as workflowService from '../../../client/workflowService';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';
import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, InputLabel, Button } from "@mui/material";
import ControlledSwitches from '../../shares/common/ControlledSwitches';

const validationSchema = yup.object({
    isBeforehand: yup
        .boolean(),
    isHusband: yup
        .boolean(),
    startDate: yup
        .date()
        .required('Ngày bắt đầu không được trống!'),
});

const NghiThaiSanContent = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            isBeforehand: false,
            isHusband: false,
            startDate: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const backToList = () => navigate('/approve-workflows/my-requests');
            workflowService.createNghiThaiSan({ isHusband: values.isHusband, startDate: new Date() }, backToList);
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <InputLabel>Nghỉ thai sản trước quy định</InputLabel>
                <ControlledSwitches name="isBeforehand" onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={4}>
                <InputLabel>Xin nghỉ với tư cách chồng sản phụ</InputLabel>
                <ControlledSwitches name="isHusband" onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={4}>
                <ComponentDatePicker label='Nghỉ từ ngày' date={new Date()} isReadOnly={false} />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                <Button variant="contained" startIcon={<SaveIcon />} type="submit" onClick={(e) => { formik.handleSubmit(e); }}>
                    Tạo mới
                </Button>
            </Grid>
        </Grid>
    );
}

const UserOvertime = () => {

    return (
        <ApproveItemPage content={<NghiThaiSanContent />} />
    );
}

export default UserOvertime;