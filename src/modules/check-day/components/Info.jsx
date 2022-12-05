import { Box, Card, CardContent, Button, ButtonGroup, FormControl, MenuItem, Select, Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';

import {useGetByUser, useFetchOne} from "./../../../client/workingShiftEvent";
import { useFetchList } from "./../../../client/workingShiftTimekeeping";
import dayjs from 'dayjs';

const OFFSET = new Date().getTimezoneOffset();
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
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const [isCheckin, setIsCheckin] = useState(true);
    const [isCheckout, setIsCheckout] = useState(true);
    const [formWorkShiftTimekeeping, setFormWorkShiftTimekeeping] = useState({});
    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchList
    } = useGetByUser();
    const {
        isSuccess: isFetchSuccess,
        isPending: isFetchPending,
        data: fetchResponse,
        method: fetchOne
    } = useFetchOne();
    let {
        isSuccess: isFetchListSuccess,
        isPending: isFetchListPending,
        data: fetchListResponse,
        method: fetchListTimekeeping
    } = useFetchList();
    useEffect(() => {
        if (window.localStorage.getItem('user_id')) {
            fetchList(window.localStorage.getItem('user_id'));
        }
    }, [])
    useEffect(() => {
        if (isSuccess) {
            let lst = [];
            let lstCheck = [];
            response.data.map((item, index) => {
                console.log({index, item});

                if (dayjs().get('day') === dayjs(item.startTime).get('day') 
                    && item.isCheck) {
                        let data = {
                            id: item.id,
                            name: item.name,
                            startTime: dayjs(item.startTime).format('h:mm a'),
                            endTime: dayjs(item.endTime).format('h:mm a'),
                            showName: item.name + ' ' + dayjs(item.startTime).format('h:mm a') + ' ' + dayjs(item.endTime).format('h:mm a'),
                        };
                        lst.push(data);
                }
            });
            setData(lst);
        }
    }, [isSuccess])

    const welcomeText = welcome(name);

    const clickTakePicture = () => {
        takePicture(formWorkShiftTimekeeping, () => {
            setName(window.localStorage.getItem('name'));
            setRecognized(true);
        });
    }
    const handleChange = (event) => {
        setValue(event.target.value);
        // fetchOne(event.target.value);
        isFetchListSuccess = false;
        fetchListTimekeeping(window.localStorage.getItem('user_id'), dayjs().format('YYYY-MM-DD'), parseInt(event.target.value));
    };
    useEffect(() => {
        if (fetchListResponse?.data) {
            const currentDate = dayjs().format('YYYY-MM-DD');
            let data = fetchListResponse.data;
            if (data.length > 0 && currentDate === dayjs(data[0].checkinTime).format('YYYY-MM-DD')) {
                let form = data[0];
                form = data[0];
                form.CheckoutTime = dayjs().add(-OFFSET, 'minute').toISOString();
                form.DidCheckout = true;
                setFormWorkShiftTimekeeping({...form});
                setIsCheckout(false);
                setIsCheckin(true);
            } else {
                setIsCheckout(true);
                setIsCheckin(false);
                let form = {};
                form = {
                    DidCheckIn : true,
                    CheckinTime : dayjs().add(-OFFSET, 'minute').toISOString(),
                    DidCheckout: false,
                    EmployeeId: parseInt(window.localStorage.getItem('user_id')),
                    WorkingShiftEventId: value,
                };
                setFormWorkShiftTimekeeping({...form});
            }
        }
    }, [isFetchListSuccess])

    const groupButton = () => {
        return (
        <>
        <Grid container spacing={2} sx={{ p: 2}}>
            <Grid item xs={12}>
                <FormControl sx={{ m: 3, minWidth: 200 }}>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Loại công</FormLabel>  */}
                    <Select
                        row
                        displayEmpty
                        value={value}
                        onChange={handleChange}
                    >
                        {data.map((item, index) => (
                            <MenuItem value={item.id} key={index} >{item.showName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup sx={{
                    '& > *': {
                    m: 1,
                    },
                }}>
                    <Button variant="contained" 
                        onClick={clickTakePicture}
                        disabled={isCheckin}
                        color="primary"
                        sx={{ display: 'flex-block', mt: 2, mr: 1, width: "auto" }}>
                        Chấm giờ vào
                    </Button>
                    <Button variant="contained" 
                        onClick={clickTakePicture}
                        disabled={isCheckout}
                        color="secondary"
                        sx={{ display: 'flex-block', mt: 2, ml: 1, width: "auto" }}>
                        Chấm giờ ra
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
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