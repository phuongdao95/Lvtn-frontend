import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
const DAY = ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sar'];
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const padTo2Digits = num => {
    return num.toString().padStart(2, '0');
}
const formatDate = date => {
    return (
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
        + ', ' +
        DAY[date.getDay()]
        + ', ' +
        MONTH[date.getMonth()]
        + ' ' +
        padTo2Digits(date.getDate())
        + ', ' + 
        date.getFullYear()        
    );
}

const welcome = (
    <Box sx={{
        mx: 'auto',
        my: 'auto',
        p: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: '700',
        bgcolor: 'info.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        Welcome!
        <br></br> 
        Dao Thanh Phuong.
    </Box>
);
const InfoComponent = () => {
    const currTime = new Date();
    const format = formatDate(currTime);
    return (
        <div style={{paddingTop: 40}}>
            <Card sx={{
                mx: 'auto',
                py: 20,
                textAlign: 'center'
                }}>
                <CardContent>
                    {format}
                    {welcome}
                </CardContent>
            </Card>
        </div>
    );
}

export default InfoComponent;