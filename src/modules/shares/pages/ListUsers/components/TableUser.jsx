import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const columns = [
    { id: 'name', label: 'Họ và tên', minWidth: 170 },
    { id: 'sex', label: 'Giới tính', minWidth: 100 },
    {
        id: 'role',
        label: 'Chức vụ',
        minWidth: 170,
    },
    {
        id: 'birth',
        label: 'Ngày sinh',
        minWidth: 170,
    },
    {
        id: 'address',
        label: 'Địa chỉ',
        minWidth: 170,
    },
    {
        id: 'mail',
        label: 'Email',
        minWidth: 170,
    },
    {
        id: 'phone',
        label: 'Số điện thoại',
        minWidth: 170,
    },
];

const createData = (name, sex, role, birth, address, mail, phone) => {
    return { name, sex, role, birth, address, mail, phone };
}

const rows = [
    createData('Nguyễn Văn A', 'Nam', 'Nhân viên', '01/01/2000', '32 Nguyễn Phú Thọ',
        'a.nguyenvan@gmail.com', '0947852361'),
    createData('Nguyễn Văn A', 'Nam', 'Nhân viên', '01/01/2000', '32 Nguyễn Phú Thọ',
         'a.nguyenvan@gmail.com', '0947852361'),
    createData('Nguyễn Văn A', 'Nam', 'Nhân viên', '01/01/2000', '32 Nguyễn Phú Thọ',
         'a.nguyenvan@gmail.com', '0947852361'),
    createData('Nguyễn Văn A', 'Nam', 'Nhân viên', '01/01/2000', '32 Nguyễn Phú Thọ',
         'a.nguyenvan@gmail.com', '0947852361'),
    createData('Nguyễn Văn A', 'Nam', 'Nhân viên', '01/01/2000', '32 Nguyễn Phú Thọ',
         'a.nguyenvan@gmail.com', '0947852361'),
];

const TableUser = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </StyledTableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}
export default TableUser;