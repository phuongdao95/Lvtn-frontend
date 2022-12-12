import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { grey } from '@mui/material/colors';

export default function RankingTable({ category = 'None', rows = [] }) {
    return (
        <TableContainer component={Paper}>
            <Table size='small' aria-label="simple table"
                sx={{ border: `1px solid ${grey[400]}`, minWidth: 200 }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tài khoản</TableCell>
                        <TableCell align="right">{category}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.username}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>

                            <TableCell align="right">{row.value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}