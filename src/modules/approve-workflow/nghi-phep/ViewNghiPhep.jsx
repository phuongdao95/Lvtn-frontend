import * as React from 'react';
import { Grid, InputLabel } from "@mui/material";
import { useParams } from 'react-router';
import * as workflowService from '../../../client/workflowService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ApproveViewItemPage from '../../shares/pages/Approve/ApproveViewItemPage';


const NghiPhepContent = ({ data }) => {
    return (
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Lý do xin phép</InputLabel>
            </Grid>
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '17px', color: 'black' }}>{data?.reason}</InputLabel>
            </Grid>

            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Nghỉ từ ngày</InputLabel>
            </Grid>
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '17px', color: 'black' }}>{data?.startDate}</InputLabel>
            </Grid>

            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Nghỉ đến ngày</InputLabel>
            </Grid>
            <Grid item xs={6}>
                <InputLabel sx={{ fontSize: '17px', color: 'black' }}>{data?.endDate}</InputLabel>
            </Grid>
        </Grid>
    )
}


const ViewNghiPhep = ({ isApprover = false }) => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    React.useEffect(() => {
        workflowService.getDataNghiPhep(id)
            .then((data) => setData(data))
            .catch((err) => toast.log(err));
    }, [])
    return (
        <>
            <ApproveViewItemPage content={<NghiPhepContent data={data} />} isApprover={isApprover} data={data} flowId={id} />
            <ToastContainer />
        </>
    );
}

export default ViewNghiPhep;