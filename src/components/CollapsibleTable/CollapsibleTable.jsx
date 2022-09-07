import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';

export default function CollapsibleTable({
    rows, columns
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {
                            columns.map((column) =>
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name}
                            row={row}
                            columns={columns}
                            collapsibleSection={row.collapsibleContent} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
