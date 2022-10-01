import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },

    {
        field: "description",
        headerName: "Description"
    },

    {
        field: "fromDate",
        headerName: "From Date"
    },

    {
        field: "toDate",
        headerName: "To Date"
    },

    {
        field: "totalDeduction",
        headerName: "Total Deduction",
    },

    {
        field: "totalBonus",
        headerName: "Total Bonus",
    },

    {
        field: "totalAllowance",
        headerName: "Total Allowance"
    },

    {
        field: "totalBaseSalary",
        headerName: "Total Base Salarys"
    },

    {
        field: "totalAmount",
        headerName: "Total Amount"
    },


    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: () => {
            return <Box sx={{ display: "flex", gap: 0.5 }}>
                <ActionButton>
                    Chỉnh sửa
                </ActionButton>
            </Box>
        }
    }
];


export default function PayslipDetail() {
    const navigate = useNavigate();

    return (
        <Fragment>
            <DataGridLayout
                title={"Payroll Detail"}
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
                                {
                                    text: "Tạo mới",
                                    handler: () => {

                                    }
                                },
                                { text: "Gửi ", handler: () => { } },
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
