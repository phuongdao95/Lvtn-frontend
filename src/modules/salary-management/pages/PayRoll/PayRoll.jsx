import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";

const columns = [
    {
        field: "employeeCode",
        headerName: "Employee code",
        width: 150,
    },

    {
        field: "employeeName",
        headerName: "Full name",
        width: 150,
    },

    {
        field: "role",
        headerName: "Role",
        width: 150,
    },

    {
        field: "baseSalary",
        headerName: "Base salary",
        width: 150,
    },

    {
        field: "deductionTotal",
        headerName: "Total deduction",
        width: 150,
    },

    {
        field: "allowanceTotal",
        headerName: "Total allowance",
        width: 150,
    },

    {
        field: "bonusTotal",
        headerName: "Total bonus",
        width: 150,
    },

    {
        field: "baseSalary",
        headerName: "Base salary",
        width: 150,
    },

    {
        field: "netSalary",
        headerName: "Net salary",
        width: 150,
    },

    {
        field: "month",
        headerName: "Month",
        width: 150,
    },

    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: () => {
            return <Box sx={{ display: "flex", gap: 0.5 }}>
                <ActionButton>
                    Chi tiết
                </ActionButton>
                <ActionButton>
                    Thêm KT, PC, LT
                </ActionButton>
            </Box>
        }
    }
];

const rows = new Array(32).fill(0).map((index, value, array) => ({
    id: index,
    role: "Engineer",
    employeeCode: "01294857",
    employeeName: "Le Nguyen A",
    totalWorkingHours: 40,
    deductionTotal: 120_000,
    allowanceTotal: 120_000,
    bonusTotal: 120_000,
    baseSalary: 12_000_000,
    netSalary: 12_120_000,
    month: "Tháng 5 2022"
}));


export default function Payroll() {
    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách tiền lương phải trả  theo tháng"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={columns}
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
            />
        </Fragment>
    );
}
