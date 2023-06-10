import React, { Fragment } from "react";
import { Box } from "@mui/system";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";

import { useFetchPayslipsOfUser } from "../../../../client/payrollService";
import { useNavigate } from "react-router";
import { getCurrentUserId } from "../../../../client/autheticationService";
import { Button } from "@mui/material";
import MenuButton from "../../../../components/DataGrid/MenuButton";

const getColumnConfig = (openDetailCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 100,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "employeeName",
        headerName: "Tên nhân viên",
        width: 100
    },

    {
        field: "baseSalary",
        headerName: "Lương cơ bản",
        width: 150
    },
    {
        field: "actualSalary",
        headerName: "Tổng cộng",
        width: 150,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 200,
    },

    {
        field: "action",
        headerName: "Thao tác",
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

    const [payslips, setPayslips] = React.useState([]);

    const {
        isPending,
        isError,
        isSuccess,
        data: fetchedPayslips,
        method: fetchPayslips,
    } = useFetchPayslipsOfUser();

    React.useEffect(() => {
        const userId = getCurrentUserId();
        fetchPayslips(userId);
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            setPayslips(fetchedPayslips.data)
        }
    }, [isSuccess])

    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách Payslip của tôi"}
                datagridSection={
                    <DataGrid
                        rows={payslips.map(payslip => ({
                            ...payslip,
                            baseSalary: payslip.baseSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
                            actualSalary: payslip.actualSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        })) || []}
                        columns={getColumnConfig((id) => {
                            navigate(`/my-payslips/${id}/`)
                        })}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                searchSection={<SearchField />}
                searchButtonSection={<SearchButton />}
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                { text: "Xuất payslip", handler: () => { } },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                } />
        </Fragment>
    );
}
