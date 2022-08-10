import React from 'react';
import {Box, Grid} from '@mui/material';
import InfoComponent from './components/InfoComponent';
import AiCam from './components/AiCam';

const Timekeeping = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <AiCam />
                </Grid>
                <Grid xs={4}>
                    <InfoComponent />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Timekeeping;