import { Box, Card, CardContent, Button, ButtonGroup, FormControl, MenuItem, Select, Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';

import {useGetByUser, useFetchOne} from "./../../../client/workingShiftEvent";
import { useFetchList } from "./../../../client/workingShiftTimekeeping";
import dayjs from 'dayjs';
import Snackbar from '../../../components/Snackbar/Snackbar';

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

const Info = ({takePicture, setStateMes}) => {
    // const [stateMes, setStateMes] = useState({
    //     open: false,
    //     type: 'info',
    //     message: '',
    // });
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
                if (dayjs().get('day') === dayjs(item.workingShiftEvent.startTime).get('day') 
                    ) {
                        let data = {
                            id: item.id,
                            name: item.workingShiftEvent.name,
                            startTime: item.workingShiftEvent.startTime,
                            endTime: item.workingShiftEvent.endTime,
                            showName: item.workingShiftEvent.name + ' ' + dayjs(item.workingShiftEvent.startTime).format('h:mm a') + ' ' + dayjs(item.workingShiftEvent.endTime).format('h:mm a'),
                            didCheckIn: item.didCheckIn,
                            didCheckout: item.didCheckout,
                            checkinTime: item.checkinTime,
                            checkoutTime: item.checkoutTime,
                            isCheckInFirst: item.isCheckInFirst,
                            isCheckOutLast: item.isCheckOutLast,
                            workday: item.workingShiftEvent.startTime,
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
        //setValue(event.target.value);
        // fetchOne(event.target.value);
        isFetchListSuccess = false;
        const currentDate = dayjs().format('YYYY-MM-DD');
        let form = {};
        setIsCheckout(true);
        setIsCheckin(true);
        console.log(OFFSET);
        //fetchListTimekeeping(window.localStorage.getItem('user_id'), dayjs().format('YYYY-MM-DD'), parseInt(event.target.value));
        if (data.length > 0) {
            data.forEach(item => {
                if (item.id == event.target.value && currentDate === dayjs(item.workday).format('YYYY-MM-DD')){
                    console.log(item);
                    form.id = item.id;
                    if (!item.didCheckIn) {
                        // first checkin
                        form.Offset = OFFSET;
                        form.didCheckIn = true;
                        form.checkInTime = dayjs().add(-OFFSET, 'minute').toISOString();
                        form.didCheckout = false;
                        form.employeeId = parseInt(window.localStorage.getItem('user_id'));
                        form.workingShiftEventId = event.target.value;
                        form.isCheckInFirst = true;
                        // if (dayjs().add(30, 'minute').format('h:mm a') >= dayjs(item.startTime).format('h:mm a')) {
                        if (dayjs().isAfter(dayjs(item.startTime).add(-30, 'minute'))) {
                            setIsCheckin(false);
                        } else {
                            setStateMes({
                                type: 'warning',
                                message: 'Chưa tới giờ vào ca',
                                open: true,
                            })
                        }
                    // } else if (item.didCheckIn && item.didCheckout && dayjs().add(-30, 'minute').format('h:mm a') <= item.endTime) {
                    } else if (item.didCheckIn && item.didCheckout && dayjs().isBefore(dayjs(item.endTime).add(30, 'minute'))) {
                        // second, ... checkin
                        form.Offset = OFFSET;
                        form.didCheckIn = true;
                        form.checkInTime = dayjs().add(-OFFSET, 'minute').toISOString();
                        form.didCheckout = false;
                        form.employeeId = parseInt(window.localStorage.getItem('user_id'));
                        form.workingShiftEventId = event.target.value;
                        form.isCheckInFirst = false;
                        form.isCheckOutLast = false;
                        // if (dayjs().add(30, 'minute').format('h:mm a') >= item.startTime) {
                        if (dayjs().isAfter(dayjs(item.startTime).add(-30, 'minute'))) {
                            setIsCheckin(false);
                        } else {
                            setStateMes({
                                type: 'warning',
                                message: 'Chưa tới giờ vào ca',
                                open: true,
                            })
                        }
                    } else if (!item.didCheckOut) {
                        // check out
                        form.Offset = OFFSET;
                        form.didCheckIn = true;
                        form.checkoutTime = dayjs().add(-OFFSET, 'minute').toISOString();
                        form.didCheckout = true;
                        form.employeeId = parseInt(window.localStorage.getItem('user_id'));
                        form.workingShiftEventId = event.target.value;
                        form.isCheckOutLast = true;
                        form.isCheckInFirst = false;
                        // if (dayjs().add(-30, 'minute').format('h:mm a') <= item.endTime) {
                        if (dayjs().isBefore(dayjs(item.endTime).add(30, 'minute'))) {
                            setIsCheckout(false);
                        } else {
                            setStateMes({
                                type: 'warning',
                                message: 'Đã hết thời gian chấm tan ca',
                                open: true,
                            })
                        }
                    }
                    setFormWorkShiftTimekeeping({...form});
                    console.log(form);
                    return;
                }
            });
        }
        // if (data.length > 0 && currentDate === dayjs(data[0].checkinTime).format('YYYY-MM-DD') && data[0].didCheckOut == false) {
        //     //form = data[0];
        //     form.id = data[0].id
        //     form.CheckoutTime = dayjs().add(-OFFSET, 'minute').toISOString();
        //     form.DidCheckout = true;
        //     setFormWorkShiftTimekeeping({...form});
        //     setIsCheckout(false);
        //     setIsCheckin(true);
        // } else {
        //     setIsCheckout(true);
        //     setIsCheckin(false);
        //     form = {
        //         DidCheckIn : true,
        //         CheckinTime : dayjs().add(-OFFSET, 'minute').toISOString(),
        //         DidCheckout: false,
        //         EmployeeId: parseInt(window.localStorage.getItem('user_id')),
        //         WorkingShiftEventId: event.target.value,
        //     };
        //     setFormWorkShiftTimekeeping({...form});
        // }
        
    };
    // useEffect(() => {
    //     if (fetchListResponse?.data) {
    //         const currentDate = dayjs().format('YYYY-MM-DD');
    //         let data = fetchListResponse.data;
    //         if (data.length > 0 && currentDate === dayjs(data[0].checkinTime).format('YYYY-MM-DD')) {
    //             let form = data[0];
    //             form = data[0];
    //             form.CheckoutTime = dayjs().add(-OFFSET, 'minute').toISOString();
    //             form.DidCheckout = true;
    //             setFormWorkShiftTimekeeping({...form});
    //             setIsCheckout(false);
    //             setIsCheckin(true);
    //         } else {
    //             setIsCheckout(true);
    //             setIsCheckin(false);
    //             let form = {};
    //             form = {
    //                 DidCheckIn : true,
    //                 CheckinTime : dayjs().add(-OFFSET, 'minute').toISOString(),
    //                 DidCheckout: false,
    //                 EmployeeId: parseInt(window.localStorage.getItem('user_id')),
    //                 WorkingShiftEventId: value,
    //             };
    //             setFormWorkShiftTimekeeping({...form});
    //         }
    //     }
    // }, [isFetchListSuccess])

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
            {/* <Snackbar state={stateMes} close={() => setStateMes({...stateMes, open: false})} /> */}
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