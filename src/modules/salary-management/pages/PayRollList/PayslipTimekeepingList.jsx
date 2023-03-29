import React from "react";

import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import { useParams } from "react-router";
import { useFetchPayslipTimekeepings } from "../../../../client/payrollService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";

const getColumnConfig = () => [
    {
        field: "id",
        width: 50
    },

    {
        field:"date",
        headerName: "Ngày",
        width: 100,
    },
    {
        field: "startTime",
        headerName: "Bắt đầu",
        width: 100,
    },
    {
        field: "endTime",
        headerName: "Kết thúc",
        width: 100,
    },
    {
        field: "didCheckIn",
        headerName: "Checkin",
        width: 100,
    },
    {
        field: "checkinTime",
        headerName: "Thời gian checkin",
        width: 150,
    },
    {
        field: "didCheckout",
        headerName: "Checkout",
        width: 100,
    },
    {
        field: "checkoutTime",
        headerName: "Thời gian checkout",
        width: 150,
    },
    {
        field: "type",
        headerName: "Loại shift",
        width: 150,
    },
    {
        field: "amount",
        headerName: "Tiền công",
        width: 150,
    },
    {
        field: "formulaDefine",
        headerName: "Công thức",
        width: 300,
    }
]

export default function PayslipTimekeepingList() {
    const { payslipId } = useParams();

    const {
        isSuccess,
        isPending,
        isError,
        data: timekeepings,
        method: fetchTimekeepings,
    } = useFetchPayslipTimekeepings();

    React.useEffect(() => {
        fetchTimekeepings(payslipId);
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
            rows={timekeepings?.data?.map((timekeeping) => ({
                ...timekeeping,
                didCheckIn: timekeeping.didCheckIn ? "Có" : "Không",
                didCheckout: timekeeping.didCheckout ? "Có" : "Không",
                date: dayjs(timekeeping.startTime).format('DD/MM/YYYY'),
                startTime: dayjs(timekeeping.startTime).format('HH:mm:ss'),
                endTime: dayjs(timekeeping.endTime).format('HH:mm:ss'),
                checkinTime: dayjs(timekeeping.checkinTime).format('HH:mm:ss'),
                checkoutTime: dayjs(timekeeping.checkoutTime).format('HH:mm:ss'),
                amount: timekeeping.amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            })) ?? []}
            columns={getColumnConfig()}
            height={500}
        />
    </Box>;
}