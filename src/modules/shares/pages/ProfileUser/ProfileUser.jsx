import * as React from 'react';
import Grid from '@mui/material/Grid';
import AvatarUser from './components/AvatarUser';
import Info from './components/Info';

const ProfileUser = () => {
    
    return (
    <Grid container spacing={2}>
        <Grid item xs={3} sx={{ borderRight: 1 }}>
            <AvatarUser />
        </Grid>
        <Grid item xs={9}>
            <Info />
        </Grid>
        
    </Grid>
    )
}

export default ProfileUser;