import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import dayjs from 'dayjs';
import {useFetchListByUser} from '../../../client/workingShiftTimekeeping.js';
import {useGetByUser} from '../../../client/workingShiftEvent.js';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 700,
    bgcolor: '#FBF8F8',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const ModalDay = ({open, setOpen, date}) => {
    const handleClose = () => setOpen(false);
    const [data, setData] = React.useState([]);
    const [dataShift, setDataShift] = React.useState([]);
    let {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchList
    } = useFetchListByUser();
    React.useEffect(() => {
        if (date === null || date === '' || date === undefined) {
            fetchList(window.localStorage.getItem('user_id'), dayjs().format('YYYY-M-D'));
        } else {
            let dateArr = date.split('/');
            date = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
            fetchList(window.localStorage.getItem('user_id'), dayjs(date).format('YYYY-M-D'));
        }
    }, [date])
    React.useEffect(() => {
        if (response) {
            let temples = [];
            response.forEach(item => {
                let tem = {
                    id: item.workingShiftEventId,
                    name: item.workingShiftEvent.name,
                    startTime: item.workingShiftEvent.startTime != null ? dayjs(item.workingShiftEvent.startTime).format('h:mm a') : '',
                    endTime: item.workingShiftEvent.endTime != null ? dayjs(item.workingShiftEvent.endTime).format('h:mm a') : '',
                    checkinTime: item.checkinTime != null ? dayjs(item.checkinTime).format('h:mm a') : '',
                    checkoutTime: item.checkoutTime != null ? dayjs(item.checkoutTime).format('h:mm a') : '',
                }
                temples.push(tem);
            } )
            setData(temples);
        }
    }, [response])
    const {
        isPending: isShiftPending,
        isSuccess: isShiftSuccess,
        isError: isShiftError,
        data: responseShift,
        method: fetchListShift
    } = useGetByUser();
    React.useEffect(() => {
        if (window.localStorage.getItem('user_id') !== undefined) {
            fetchListShift(window.localStorage.getItem('user_id'));
        }
    }, [])
    React.useEffect(() => {
        if (responseShift) {
            let shiftDate;
            if (date === null || date === '' || date === undefined) {
                shiftDate = dayjs().get('day');
            } else {
                let dateArr = date.split('/');
                date = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
                shiftDate = dayjs(date).get('day');
            }
            let da = [];
            responseShift.data.forEach(item => {
                if (item.isCheck && dayjs(item.startTime).get('day') === shiftDate) {
                    da.push({
                        id: item.id,
                        name: item.name,
                        startTime: dayjs(item.startTime).format('h:mm a'),
                        endTime: dayjs(item.endTime).format('h:mm a'),
                        checkinTime: '',
                        checkoutTime: '',
                    });
                }
            });
            console.log(da);
            setDataShift(da);
        }
    }, [date])
    const renderTable = (data1, data2) => {
        let renderData = [];
        renderData = [...data1];
        let lstId = [];
        data1.forEach(item => lstId.push(item.id));
        data2.forEach(item => {
            if (!lstId.includes(item.id)) {
                renderData.push(item);
            }
        })
        console.log('renderData', renderData);
        return (
            <>
            {renderData.length > 0 ? renderData.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.startTime}</TableCell>
                <TableCell align="right">{row.endTime}</TableCell>
                <TableCell align="right">{row.checkinTime}</TableCell>
                <TableCell align="right">{row.checkoutTime}</TableCell>
                </TableRow>
            )) 
            : 
            <TableRow>
                <TableCell>Không có ca làm</TableCell>
            </TableRow>
            }
            </>
        )
    }
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Ngày {date}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead sx={{backgroundColor: 'black'}}>
                    <TableRow>
                        <TableCell sx={{color: 'white'}}>Ca làm</TableCell>
                        <TableCell align="right" sx={{color: 'white'}}>Giờ vào</TableCell>
                        <TableCell align="right" sx={{color: 'white'}}>Giờ ra</TableCell>
                        <TableCell align="right" sx={{color: 'white'}}>Giờ chấm vào</TableCell>
                        <TableCell align="right" sx={{color: 'white'}}>Giờ chấm ra</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {data.length > 0 ? data.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.startTime}</TableCell>
                        <TableCell align="right">{row.endTime}</TableCell>
                        <TableCell align="right">{row.checkinTime}</TableCell>
                        <TableCell align="right">{row.checkoutTime}</TableCell>
                        </TableRow>
                    )) 
                    : 
                    null
                    } */}
                    {renderTable(data, dataShift)}
                    {/* {dataShift.length > 0 ? dataShift.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.startTime}</TableCell>
                        <TableCell align="right">{row.endTime}</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    )) 
                    : 
                    null}
                    {data.length == 0 && dataShift.length == 0 ? 
                    <TableRow>
                        <TableCell>Không có ca làm</TableCell>
                    </TableRow>
                    : null
                    } */}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </Modal>
        </div>
    );
}
export default ModalDay;