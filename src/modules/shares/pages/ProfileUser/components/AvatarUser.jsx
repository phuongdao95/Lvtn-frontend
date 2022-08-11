import * as React from 'react';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
const avatarUser = () => {
    return (
    <>
        <Box
            display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{ p: 2}}>
            <Avatar alt='avatar' src='' 
                sx={{maxWidth: 200, maxHeight: 200, minWidth: 100, minHeight: 100}} />
        </Box>
        <Box display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{flexDirection : "column" }}>
            <Typography display="block"> Nguyen Van A</Typography>
            <Typography>Team Dev</Typography>
             <Typography> Department IT </Typography>            
        </Box>
    </>
    )
}
export default avatarUser;