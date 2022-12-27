import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as workflowService from '../../client/workflowService';

const ViewMyBalances = () => {
    const [balances, setBalances] = React.useState([]);
    React.useEffect(() => {
        workflowService.getLeaveOfOneMember(window?.localStorage.user_id)
            .then((res) => setBalances(res.leaveBalances));
    }, []);

    return (
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
    );
}

export default ViewMyBalances;