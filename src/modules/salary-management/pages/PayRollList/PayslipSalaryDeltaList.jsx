import React from "react";

import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

import { useParams } from "react-router";
import { useFetchPayslipSalaryDeltas } from "../../../../client/payrollService";
import dayjs from "dayjs";

const getColumnConfig = () => [
    {
        field: "id",
        headerName: "Id",
        width: 50,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "salaryDeltaType",
        headerName: "Loại",
        width: 100,
    },

    {
        field: "amount",
        headerName: "Giá trị",
        width: 100
    },

    {
        field: "formulaDefine",
        headerName: "Công thức",
        width: 400,
    },

    {
        field: "groupName",
        headerName: "Nhóm áp dụng",
        width: 150,

    },

    {
        field: "groupId",
        headerName: "Group Id",
        width: 100,
    },

    {
        field: "fromMonth",
        headerName: "Tháng bắt đầu",
        width: 100,
    },

    {
        field: "toMonth",
        headerName: "Tháng kết thúc",
        width: 100,
    },

    {
        field: "payslipName",
        headerName: "Tên payslip",
        width: 150,
    },
];

export default function PayslipSalaryDeltaList() {
    const { payslipId } = useParams();

    const {
        isSuccess,
        isPending,
        isError,
        method: fetchSalaryDeltas,
        data: salaryDeltas,
    } = useFetchPayslipSalaryDeltas();

    React.useEffect(() => {
        fetchSalaryDeltas(payslipId);
    }, [])

    return <Box sx={{ position: 'relative' }} >
        <LoadingOverlay isLoading={isPending} />

        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 2,
        }}>
            <SearchField />
            <SearchButton />
        </Box>
        <DataGrid
            rows={salaryDeltas?.data?.map((salaryDelta) => ({
                ...salaryDelta,
                amount: salaryDelta.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
                fromMonth: dayjs(salaryDelta.fromMonth).format("MM/YYYY"),
                toMonth: dayjs(salaryDelta.toMonth).format("MM/YYYY")
            })) ?? []}
            columns={getColumnConfig()}
            height={500} />
    </Box>;
}