import * as React from 'react';
import Grid from '@mui/material/Grid';
import TableUser from './components/TableUser';
import { Typography } from '@mui/material';
const ListUsers = () => {
    return (
        <Grid container spacing={2} sx={{pt: 1}}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
                <Typography variant='h4'>Danh sách nhân viên</Typography>
            </Grid>
            <Grid item xs={12}>
                <TableUser />        
            </Grid>
        </Grid>
        
    )
}
export default ListUsers;