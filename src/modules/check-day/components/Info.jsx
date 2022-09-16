import { Box, Card, CardContent, Button } from '@mui/material';
import React, {useState} from 'react';
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

const welcome = name => {
    return (
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
        {name}
    </Box>
)};
const Info = ({takePicture}) => {
    const currTime = new Date();
    const format = formatDate(currTime);
    const [recognized, setRecognized] = useState(false);
    const [name, setName] = useState('');
    const welcomeText = welcome(name);
    const clickTakePicture = () => {
        takePicture(() => {
            setName('Dao Thanh Phuong');
            setRecognized(true);
        });
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
                    {recognized ? 
                    <>
                        {format}
                        {welcomeText}
                    </>
                    :
                    <Button variant="contained" 
                        onClick={clickTakePicture}
                        color="primary">
                        Chấm công
                    </Button>}
                </CardContent>
            </Card>
        </Box>
    );
}

export default Info;