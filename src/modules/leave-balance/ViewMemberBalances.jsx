import * as React from 'react';
import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as workflowService from '../../client/workflowService';

const ViewMemberBalances = () => {
    const [members, setMembers] = React.useState([]);
    React.useEffect(() => {
        workflowService.getLeaveMembers(window?.localStorage.user_id)
            .then((res) => setMembers(res == "" ? [] : res));
    }, []);
    const navigate = useNavigate();
    const handler = (value) => navigate(`/leave-balance/member/${value}`);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Số thứ tự</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", fontSize: '1.5rem' }}>Tên nhân viên</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members?.length == 0 ? <h3 style={{ paddingLeft: '30px', fontWeight: 'normal' }}>Không có dữ liệu để hiển thị</h3> : null}
                    {members?.map((member, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center' component="th" scope="row" onClick={() => handler(member.userId)} sx={{ ":hover": 'cursor' }}>
                                {index}
                            </TableCell>
                            <TableCell align='center'>{member.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ViewMemberBalances;