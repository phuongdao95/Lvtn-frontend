import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import DataGrid from "../../../../components/DataGrid";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import dayjs from "dayjs";

import { useFormik } from "formik";
import { useFetchOneUser, useUpdateUser } from "../../../../client/userService";
import { useFetchListPayroll } from "../../../../client/payrollService";
import { useFetchListRole } from "../../../../client/roleService";
import { useFetchListTeam } from "../../../../client/teamService";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";


const getColumnConfig = (openDetailCb, openDeleteCb, openSendCb) => [
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
        field: "fromDate",
        headerName: "Từ ngày",
        width: 150
    },

    {
        field: "toDate",
        headerName: "Đến ngày",
        width: 150
    },



    {
        field: "action",
        headerName: "Thao tác",
        width: 300,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 0.5 }}>
                <ActionButton onClick={() => openDetailCb(id)}>
                    Chọn
                </ActionButton>
            </Box>
        }
    }
];

export default function PayrollPicker({ closeDialogCb, handlePick }) {
    const [payrolls, setPayrolls] = React.useState([]);

    const {
        isError,
        isPending,
        isSuccess,
        method: fetchPayroll,
        data: fetchedPayroll,
    } = useFetchListPayroll();

    React.useEffect(() => {
        fetchPayroll();
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            setPayrolls(fetchedPayroll.data)
        }
    }, [isSuccess])

    return <Dialog
        secondaryAction={{
            text: "Hủy",
            handler: () => {
                closeDialogCb();
            }
        }}
        title="Chọn payroll"
    >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <SearchField />
            <SearchButton />
        </Box>

        <DataGrid
            height={400}
            pageSize={[5]}
            rows={payrolls.map(payroll => ({
                ...payroll,
                fromDate: dayjs(payroll.fromDate).format("DD/MM/YYYY"),
                toDate: dayjs(payroll.toDate).format("DD/MM/YYYY")
            })) || []}
            columns={getColumnConfig(
                (id) => {
                    if (handlePick) {
                        console.log(id);
                        handlePick(id);
                    }
                }
            )}
            isError={isError}
            isLoading={isPending}
            isSuccess={isSuccess}
        />
    </Dialog >
}