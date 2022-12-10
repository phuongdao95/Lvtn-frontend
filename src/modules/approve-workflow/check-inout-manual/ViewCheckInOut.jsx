import * as React from 'react';
import { Grid, InputLabel } from "@mui/material";
import { useParams } from 'react-router';
import * as workflowService from '../../../client/workflowService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ApproveViewItemPage from '../../shares/pages/Approve/ApproveViewItemPage';


const CheckInContent = ({ data }) => {
    return (
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Thời gian điểm danh</InputLabel>
            </Grid>
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '17px', color: 'black' }}>{"ABC"}</InputLabel>
            </Grid>

            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Loại điểm danh</InputLabel>
            </Grid>
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '17px', color: 'black' }}>{"DEF"}</InputLabel>
            </Grid>
        </Grid>
    )
}


const ViewCheckInOut = ({ isApprover = false }) => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    React.useEffect(() => {
        workflowService.getDataCheckin(id)
            .then((data) => setData(data))
            .catch((err) => toast.log(err));
    }, [])
    return (
        <>
            <ApproveViewItemPage content={<CheckInContent data={data} />} isApprover={isApprover} data={data} flowId={id} />
            <ToastContainer />
        </>
    );
}

export default ViewCheckInOut;