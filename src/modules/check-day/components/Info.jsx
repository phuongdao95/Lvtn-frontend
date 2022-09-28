import { Box, Card, CardContent, Button, FormControl, MenuItem, Select } from '@mui/material';
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
// data sample 
const listType = [
    {
        "Id" : 1,
        "Name" : "Ngày bình thường",
        "StartTime" : "8:00",
        "EndTime" : "17:00", 
        "Coefficient" : 1,
    },
    {
        "Id" : 2,
        "Name" : "OT",
        "StartTime" : "19:00",
        "EndTime" : "20:00", 
        "Coefficient" : 2,
    },
]
const Info = ({takePicture}) => {
    const currTime = new Date();
    const format = formatDate(currTime);
    const [recognized, setRecognized] = useState(false);
    const [name, setName] = useState('');
    const [value, setValue] = useState(listType[0].Id);

    const welcomeText = welcome(name);

    const clickTakePicture = () => {
        takePicture(() => {
            setName('Dao Thanh Phuong');
            setRecognized(true);
        });
    }
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const groupButton = () => {
        return (
        <>
        <FormControl sx={{ m: 3, width: 200 }}>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Loại công</FormLabel>  */}
            <Select
                row
                displayEmpty
                value={value}
                onChange={handleChange}
            >
                {listType.map((item, index) => (
                    <MenuItem value={item.Id} key={index} >{item.Name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant="contained" 
            onClick={clickTakePicture}
            // disabled={value ? true : false}
            color="primary"
            sx={{ display: 'flex-block', mt: 2, mr: 1 }}>
            Chấm giờ vào
        </Button>
        <Button variant="contained" 
            onClick={clickTakePicture}
            // disabled={value ? true : false}
            color="secondary"
            sx={{ display: 'flex-block', mt: 2, ml: 1 }}>
            Chấm giờ ra
        </Button>
        </>
        );
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
                    :   <>{groupButton()}</>}
                </CardContent>
            </Card>
        </Box>
    );
}

export default Info;