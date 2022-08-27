import { Box, Card, CardContent, Button } from '@mui/material';
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
        bgcolor: 'info.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 'auto'
    }}>
        Welcome!
        <br></br> 
        Dao Thanh Phuong.
    </Box>
);
const InfoComponent = ({takePicture, isRecognized}) => {
    const currTime = new Date();
    const format = formatDate(currTime);
    const clickTakePicture = () => {
        takePicture();
    }
    return (
        <Box sx={{
            mx: 'auto',
            py: 1,
            minWidth: 200,
        }}>
            <Card sx={{
                mx: 'auto',
                textAlign: 'center',
            }}>
                <CardContent sx={{
                    maxWidth: "100%",
                    height: "auto",
                }}>
                    {(isRecognized) ? 
                    <>
                    {format}
                    {welcome}
                    </>
                    :
                    <Button variant="contained" 
                        onClick={clickTakePicture}
                        color="primary">
                        Check
                    </Button>
                    }
                </CardContent>
            </Card>
        </Box>
    );
}

export default InfoComponent;