import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ rows, columns }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        {columns.map(({ headerName, ...rest }) =>
                            <TableCell {...rest}>{headerName}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return <TableRow
                            key={row.id}
                            sx={{ border: 0 }}
                        >
                            {columns.map(({ field, headerName, ...rest }) =>
                                <TableCell key={row[field]} {...rest}>
                                    {row[field]}
                                </TableCell>
                            )}
                        </TableRow>

                    })}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
