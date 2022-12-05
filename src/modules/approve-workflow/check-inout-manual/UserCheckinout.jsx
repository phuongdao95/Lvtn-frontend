import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router';
import * as React from 'react';
import * as workflowService from '../../../client/workflowService';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';
import { Grid, InputLabel, Button } from "@mui/material";
import moment from 'moment';

const CheckinContent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNew = id === 'new';

    const onSubmit = () => {
        const backToList = () => navigate('/approve-workflows/my-requests');
        workflowService.createCheckInout({ checkedTime: new Date() }, backToList);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <InputLabel>Điểm danh vào lúc: {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</InputLabel>

            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                {isNew && <Button variant="contained" startIcon={<SaveIcon />} type="submit" onClick={onSubmit}>
                    Tạo mới
                </Button>}
            </Grid>
        </Grid>
    );
}

const UserCheckinout = () => {
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
            workflowService.getIntialCheckin().then(res => setInitialData(res));
        }
        else {
            workflowService.getCheckInoutById(id).then(res => setRealData(res));
        }
    }, []);

    return (
        <ApproveItemPage content={<CheckinContent />} isNew={isNew} initialData={initialData} realData={realData} />
    );
}

export default UserCheckinout;