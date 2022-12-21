import React, { Fragment } from "react";

import { Box } from "@mui/system";

import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import PayrollDetailFormLayout from "../../components/PayrollDetailLayout";
import FormContainer from "../../components/FormContainer";
import OneColumnFieldContainer from "../../components/OneColumnFieldContainer";
import TwoColumnFieldContainer from "../../components/TwoColumnFieldContainer";
import TextField from "../../../../components/DialogForm/TextField";

import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Label from "../../../../components/DialogForm/Label";

const getColumnConfig = () => [
    {
        field: "id",
        headerName: "id",
        width: 100,
    },
    {
        field: "employeeName",
        headerName: "Họ và tên",
        width: 150,
    },
    {
        field: "employeeUsername",
        headerName: "Tên tài khoản",
        width: 150,
    },
    {
        field: "totalAmount",
        headerName: "Tổng lương nhận",
        width: 150,
    },
    {
        field: "baseSalary",
        headerName: "Lương",
        width: 150,
    },
    {
        field: "ded",
        headerName: "Tổng khấu trừ",
        width: 150,
    },
    {
        field: "allowance",
        headerName: "Tổng phụ cấp",
        width: 150,
    },
    {
        field: "bonus",
        headerName: "Tổng thưởng",
        width: 150,
    },
    {
        field: "salaryFormula",
        headerName: "Công thức tính lương",
        width: 250
    },
    {
        field: "action",
        headerName: "Thao tác",
        renderCell: ({ id }) => {
            return <Box>
                <ActionButton>
                    Sửa
                </ActionButton>
            </Box>
        }
    }
]

const rows = [];


export default function EditPayroll() {
    const { id } = useParams();

    React.useEffect(() => {
        console.log({ id: parseInt(id) })
    }, [])

    return (
        <Fragment>
            <PayrollDetailFormLayout
                title={"Payroll 1 - Danh sách Payslip"}
                datagridSection={
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                                marginBottom: 1
                            }}>
                                <SearchField />
                                <SearchButton />
                            </Box>
                        </Box>
                        <DataGrid
                            rows={rows}
                            columns={getColumnConfig()}
                            isError={false}
                            isLoading={false}
                            isSuccess={false}
                        />
                    </Box>
                }
            />
            {/* 
            <DataGridLayout
                title={"Chi tiết Payroll"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig()}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                { text: "Tạo mới", handler: () => { } },
                                { text: "Gửi payslip", handler: () => { } },
                                { text: "Xuất bảng excel", handler: () => { } },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={[{ text: "Danh sách template", handler: () => { } }]}
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                // dropdownFilterSection={<Select />}
                searchButtonSection={<SearchButton />}
            /> */}
        </Fragment>
    );
}
