import React from 'react';
import {Box, Grid} from '@mui/material';
import Register from './components/Register';
import AiCam from './components/AiCam';

const TimekeepingRegister = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <AiCam />
                </Grid>
                <Grid xs={4}>
                    <Register />
                </Grid>
            </Grid>
        </Box>
    );
}

export default TimekeepingRegister;