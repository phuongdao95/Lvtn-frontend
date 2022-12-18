import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as workflowService from '../../client/workflowService';
import { useParams } from 'react-router';
import { Grid, TextField, InputLabel, Button, Box } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';

const currentYear = new Date().getFullYear();

const validationSchema = yup.object({
    year: yup
        .number()
        .required('Không được để trống!')
        .test('limit', 'Chỉ được đặt năm trong giới hạn 2 năm gần nhất', val => val <= currentYear + 2 && val >= currentYear - 2),
    totalDays: yup
        .number()
        .required('Không được để trống!'),
});

const EditMemberLeaveBalance = () => {
    const { id } = useParams();

    const [balances, setBalances] = React.useState([]);
    const [memberName, setMemberName] = React.useState('');

    const formik = useFormik({
        initialValues: {
            year: 0,
            totalDays: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            workflowService.addOrUpdateLeaveBalance({ userId: id, year: values.year, totalDays: values.totalDays })
                .then(() => window.location.reload(false))
                .catch(err => toast.error(err));
        }
    });

    React.useEffect(() => {
        workflowService.getLeaveOfOneMember(id)
            .then((res) => {
                setBalances(res.leaveBalances);
                setMemberName(res.name);
            });
    }, []);

    return (<>
        <h3>Tên nhân viên: {memberName}</h3>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Số thứ tự</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Năm</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Tổng số ngày nghỉ phép</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Tổng số ngày đã sử dụng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {balances.length == 0 ? <h3 style={{ paddingLeft: '30px', fontWeight: 'normal' }}>Không có dữ liệu để hiển thị</h3> : null}
                    {balances.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{index}</TableCell>
                            <TableCell align="right">{item.year}</TableCell>
                            <TableCell align="right">{item.totalDays}</TableCell>
                            <TableCell align="right">{item.takenDays}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container component={Paper} sx={{ padding: '30px', mt: '20px' }}>
            <Grid item xs={6}>
                <InputLabel>Năm</InputLabel>
                <TextField
                    size="small"
                    type='number'
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}></TextField>
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Tổng số ngày nghỉ</InputLabel>
                <TextField
                    size="small"
                    type='number'
                    name="totalDays"
                    onChange={formik.handleChange}
                    value={formik.values.totalDays}
                    error={formik.touched.totalDays && Boolean(formik.errors.totalDays)}
                    helperText={formik.touched.totalDays && formik.errors.totalDays}></TextField>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color="info"
                    type="submit"
                    sx={{ fontWeight: 'bold', mt: '30px' }}
                    onClick={(e) => { formik.handleSubmit(e); }}>
                    Sửa đổi</Button>
            </Grid>
        </Grid>
    </>);
}

export default EditMemberLeaveBalance;