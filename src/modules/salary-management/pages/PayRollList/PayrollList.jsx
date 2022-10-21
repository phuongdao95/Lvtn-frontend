import React, { Fragment } from "react";
import { Box } from "@mui/system";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";

import { useFetchListPayroll } from "../../../../client/payrollService";
import CreatePayroll from "./CreatePayroll";
import { useNavigate } from "react-router";

const getColumnConfig = (openDetailCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 100,
    },
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },

    {
        field: "fromDate",
        headerName: "From Date",
        width: 100
    },

    {
        field: "toDate",
        headerName: "To Date",
        width: 100
    },

    {
        field: "totalDeduction",
        headerName: "Tổng khấu trừ",
        width: 150,
    },

    {
        field: "totalAllowance",
        headerName: "Tổng phụ cấp",
        width: 150,
    },

    {
        field: "totalBonus",
        headerName: "Tổng thưởng",
        width: 150,
    },


    {
        field: "totalBaseSalary",
        headerName: "Tổng lương",
        width: 150
    },

    {
        field: "totalAmount",
        headerName: "Tổng cộng",
        width: 150,
    },

    {
        field: "description",
        headerName: "Description",
        width: 200,
    },

    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 0.5 }}>
                <ActionButton onClick={() => openDetailCb(id)}>
                    Chi tiết
                </ActionButton>
            </Box>
        }
    }
];


export default function PayrollList() {
    const navigate = useNavigate();
    
    const [payrolls, setPayrolls] = React.useState([]);
    const [isCreatePayrollOpen, setIsCreatePayrollOpen] = React.useState(false);

    const {
        isSuccess,
        data: fetchedPayroll,
    } = useFetchListPayroll();

    React.useEffect(() => {
        if (isSuccess) {
            setPayrolls(fetchedPayroll.data)
        }
    }, [isSuccess])

    return (
        <Fragment>
            {isCreatePayrollOpen && <CreatePayroll closeDialogCb={() => setIsCreatePayrollOpen(false)} />}
            <DataGridLayout
                title={"Danh sách Payroll"}
                datagridSection={
                    <DataGrid
                        rows={payrolls || []}
                        columns={getColumnConfig((id) => { 
                            navigate(`/payroll/${id}/payslip/`)
                        })}
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
                                    text: "Tạo mới Payroll", handler: () => {
                                        setIsCreatePayrollOpen(true);
                                    }
                                },
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
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
