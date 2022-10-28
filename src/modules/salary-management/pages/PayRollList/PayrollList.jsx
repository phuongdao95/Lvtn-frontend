import React, { Fragment } from "react";
import { Box } from "@mui/system";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import CreatePayroll from "./CreatePayroll";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";

import { useDeletePayroll, useFetchListPayroll, useSendPayroll } from "../../../../client/payrollService";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

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
                <ActionButton onClick={() => openSendCb(id)}>
                    Gửi
                </ActionButton>
                <ActionButton onClick={() => openDeleteCb(id)}>
                    Xóa
                </ActionButton>
            </Box>
        }
    }
];


export default function PayrollList() {
    const navigate = useNavigate();

    const [payrollId, setPayrollId] = React.useState(null);
    const [payrolls, setPayrolls] = React.useState([]);
    const [isCreatePayrollOpen, setIsCreatePayrollOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isSendOpen, setIsSendOpen] = React.useState(false);

    const {
        isSuccess: isDeletePayrollSuccess,
        isPending: isDeletePayrollPending,
        isError: isDeletePayrollError,
        method: deletePayroll,
    } = useDeletePayroll();

    const {
        isSuccess: isSendPayrollSuccess,
        isPending: isSendPayrollPending,
        isError: isSendPayrollError,
        method: sendPayroll,
    } = useSendPayroll();

    const {
        isError,
        isPending,
        isSuccess,
        method: fetchPayroll,
        data: fetchedPayroll,
    } = useFetchListPayroll();

    React.useEffect(() => {
        if (isDeletePayrollSuccess || isSendPayrollSuccess) {
            fetchPayroll();
        }
    }, [isDeletePayrollSuccess, isSendPayrollSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            setPayrolls(fetchedPayroll.data)
        }
    }, [isSuccess])

    return (
        <Fragment>
            {isCreatePayrollOpen && <CreatePayroll
                reload={() => fetchPayroll()}
                closeDialogCb={() => setIsCreatePayrollOpen(false)} />}
            {isDeleteOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa chức vụ này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setPayrollId(null);
                            setIsDeleteOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteOpen(false);
                            setPayrollId(null);
                            deletePayroll(payrollId);
                        }
                    }}
                />}

            {isSendOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn gửi payroll đến người dùng"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setPayrollId(null);
                            setIsSendOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsSendOpen(false);
                            setPayrollId(null);
                            sendPayroll(payrollId);
                        }
                    }}
                />}

            <DataGridLayout
                title={"Danh sách Payroll"}
                datagridSection={
                    <DataGrid
                        rows={payrolls.map(payroll => ({
                            ...payroll,
                            fromDate: dayjs(payroll.fromDate).format("DD/MM/YYYY"),
                            toDate: dayjs(payroll.toDate).format("DD/MM/YYYY")
                        })) || []}
                        columns={getColumnConfig(
                            (id) => {
                                navigate(`/payroll/${id}/payslip/`)
                            },
                            (id) => {
                                setPayrollId(id);
                                setIsDeleteOpen(true);
                            },
                            (id) => {
                                setPayrollId(id);
                                setIsSendOpen(true);
                            }
                        )}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
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
