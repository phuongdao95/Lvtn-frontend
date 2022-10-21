import * as React from 'react';
import { Grid, TextField, InputLabel } from "@mui/material";
import ComponentDatePicker from '../../shares/common/ComponentDatePicker';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';

const NghiPhepContent = () => (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <InputLabel>Số ngày nghỉ phép còn lại (ngày)</InputLabel>
            <TextField fullWidth disabled size='small' defaultValue="4"></TextField>
        </Grid>

        <Grid item xs={6}>
            <InputLabel>Lý do xin phép</InputLabel>
            <TextField fullWidth placeholder="Vì lý do..." multiline maxRows={4} size="small"></TextField>
        </Grid>

        <Grid item xs={3}>
            <ComponentDatePicker label='Nghỉ từ ngày' date={new Date()} isReadOnly={false} />
        </Grid>
        <Grid item xs={3}>
            <ComponentDatePicker label='Nghỉ đến ngày' date={new Date()} isReadOnly={false} />
        </Grid>
    </Grid>
);


const UserNghiPhep = () => {

    return (
        <ApproveItemPage content={<NghiPhepContent />} />
    );
}

export default UserNghiPhep;