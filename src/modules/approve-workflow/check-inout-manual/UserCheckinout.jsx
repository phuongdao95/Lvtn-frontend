import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router';
import * as React from 'react';
import * as workflowService from '../../../client/workflowService';
import TimePicker from "../../../components/DialogForm/TimePicker";
import { useFormik } from "formik";
import moment from 'moment/moment';

import ApproveItemPage from '../../shares/pages/Approve/ApproveItemPage';
import { Grid, InputLabel, Button, Select, MenuItem, TextField } from "@mui/material";
import { toast } from 'react-toastify';

function getDaysInMonth() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
    }
    return days;
}

const CheckinContent = ({ realData }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNew = id === 'new';
    const [shifts, setShifts] = React.useState([]);
    const [shiftId, setShitfId] = React.useState();

    const onSubmit = () => {
        if (!shiftId) {
            toast.error("Vui lòng chọn ca làm!");
            //return;
        }
        if (!formik.values.endTime || !formik.values.startTime) {
            toast.error("Vui lòng nhập giờ ra/giờ vào!");
            return;
        }
        if (formik.values.endTime < formik.values.startTime) {
            toast.error("Giờ ra phải lớn hơn giờ vào");
            return;
        }
        const backToList = () => navigate('/approve-workflows/my-requests');
        console.log(formik.values);
        workflowService.createCheckInout({
            userId: window?.localStorage.user_id,
            checkedinTime: formik.values.startTime,
            checkedoutTime: formik.values.endTime,
            timekeepingId: shiftId
        }, backToList);
    }

    const formik = useFormik({
        initialValues: {
            startTime: undefined,
            endTime: undefined
        }
    })

    const daysInMonth = getDaysInMonth();
    const handleChange = (event) => {
        workflowService.getShiftOfMonth({ userId: window?.localStorage.user_id, day: event.target.value })
            .then(res => {
                if (res) {
                    setShifts(res);
                }
            });
        console.log(shifts);
    }
    const handleChangeShift = (event) => setShitfId(event.target.value);

    return (
        <Grid container spacing={2}>
            {isNew && <><Grid item xs={6}>
                <InputLabel>Chọn ngày trong tháng</InputLabel>
                <Select
                    onChange={handleChange}
                    size="small"
                >
                    {daysInMonth.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                </Select>
            </Grid>

                <Grid item xs={6}>
                    <InputLabel>Chọn ca làm trong tháng</InputLabel>
                    <Select
                        onChange={handleChangeShift}
                        size="small"
                    >
                        {shifts.map(shift => <MenuItem key={shift.id} value={shift.id}>{
                            'Ca làm từ ' + shift.checkinTime.replace('T', '-') + ' đến ' + shift.checkoutTime.replace('T', '-')
                        }</MenuItem>)}
                    </Select>
                    <Grid item xs={6}>
                        <InputLabel>Chọn giờ ra (bắt buộc)</InputLabel>
                        <TimePicker
                            value={formik.values.startTime}
                            onChange={(value) => formik.setFieldValue("startTime", value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputLabel>Chọn giờ vào (bắt buộc)</InputLabel>
                        <TimePicker
                            value={formik.values.endTime}
                            onChange={(value) => formik.setFieldValue("endTime", value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid></>}
            {!isNew && <>
                <Grid item xs={6}>
                    <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Giờ vào đã chọn: </InputLabel>
                    <InputLabel>{moment(realData?.checkinTime).format("DD-MM-YYYY h:mm a")}</InputLabel>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Giờ ra đã chọn: </InputLabel>
                    <InputLabel>{moment(realData?.checkoutTime).format("DD-MM-YYYY h:mm a")}</InputLabel>
                </Grid>
            </>}

            <Grid item xs={12}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                {isNew && <Button variant="contained" startIcon={<SaveIcon />} type="submit" onClick={onSubmit}>
                    Tạo mới
                </Button>}
            </Grid>
        </Grid>
    );
}

const UserCheckinout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) {
        navigate("/notfound");
    }
    const isNew = id === 'new';
    const [initialData, setInitialData] = React.useState();
    const [realData, setRealData] = React.useState();
    React.useEffect(() => {
        if (isNew) {
            workflowService.getIntialCheckin().then(res => setInitialData(res));
        }
        else {
            workflowService.getCheckInoutById(id).then(res => setRealData(res));
        }
    }, []);

    return (
        <ApproveItemPage content={<CheckinContent realData={realData} />} isNew={isNew} initialData={initialData} realData={realData} />
    );
}

export default UserCheckinout;