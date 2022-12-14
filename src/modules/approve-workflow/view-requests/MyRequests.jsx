import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import * as workflowService from '../../../client/workflowService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const MyRequests = () => {
    let [requests, setRequests] = useState([]);
    useEffect(() => {
        workflowService.getWorkflowRequests().then(data => { setRequests(data) });
    }, []);

    const statusToChip = (status) => {
        switch (status) {
            case 0:
                return <Chip label="Pending" color="warning" />;
            case 1:
                return <Chip label="Accepted" color="success" />;
            default:
                return <Chip label="Denied" color="error" />;
        }
    }

    const getFlowName = (name) => {
        switch (name) {
            case 'nghi-phep':
                return 'Nghỉ phép';
            case 'nghi-thai-san':
                return 'Nghỉ thai sản';
            case 'check-in-out':
                return 'Điểm danh thủ công';
            default:
                return 'Không xác định';
        }
    }

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                    <colgroup>
                        <col width="10%" />
                        <col width="60%" />
                        <col width="20%" />
                        <col width="10%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Index</StyledTableCell>
                            <StyledTableCell align="center">Request Name</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">
                                    <Link to={`/approve-workflows/user-${row.name + (row.status == 0 ? '' : '/view')}/${row.id}`}>
                                        {index + 1}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">{getFlowName(row.name)}</StyledTableCell>
                                <StyledTableCell align="center">{row.createdDate}</StyledTableCell>
                                <StyledTableCell align="center">{statusToChip(row.status)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default MyRequests;