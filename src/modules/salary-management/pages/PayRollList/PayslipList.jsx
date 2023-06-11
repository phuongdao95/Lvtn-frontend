import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router";
import { useFetchOnePayroll, useFetchPayslipOfPayroll } from "../../../../client/payrollService";
import DataGrid from "../../../../components/DataGrid";
import EditPayslip from "./EditPayslip";
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { Box, Button } from "@mui/material";
import api, { BASE_URL } from "../../../../client/api";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import IssueDetail from './IssueDetail';

const useFetchPayrollIssue = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState([]);

    const method = async (payrollId) => {
        try {
            setIsPending(true);
            const response = await api.get(`/api/payroll/${payrollId}/issue/`);

            if (!response) {
                throw response.err;
            }

            setData(Array.isArray(response.data) ? response.data : []);
            setIsSuccess(true);
            setIsError(false);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return {
        isSuccess, isError, isPending, method, data
    }
}

const buildColumnConfigPayslip = (handleOpenDetail) => [
    {
        field: "id",
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250
    },
    {
        field: "description",
        headerName: "Mô tả",
        width: 250
    },
    {
        field: "employeeName",
        headerName: "Tên nhân viên",
        width: 250,
    },

    {
        field: "baseSalary",
        headerName: "Lương cơ bản",
        width: 150,
    },

    {
        field: "actualSalary",
        headerName: "Lương thực tế",
        width: 150,
    },

    {
        field: "action",
        headerName: "Thao tác",
        renderCell: ({ id }) => {
            return <ActionButton onClick={() => handleOpenDetail(id)}>
                Chi tiết
            </ActionButton>
        }
    }
]

const buildColumnConfigIssue = (openDetailCb) =>
    [
        {
            field: "id",
            headerName: "Id",
        },
        {
            field: "name",
            headerName: "Tiêu để",
            width: 250
        },
        {
            field: "createdBy",
            headerName: "Tạo bởi",
            width: 250
        },
        {
            field: "createdAt",
            headerName: "Tạo lúc",
            width: 250,
        },

        {
            field: "resolved",
            headerName: "Tình trạng",
            width: 150,
        },

        {
            field: "resolvedBy",
            headerName: "Giải quyết bởi",
            width: 150,
        },

        {
            field: "resolvedAt",
            headerName: "Giải quyết lúc",
            width: 150,
        },

        {
            field: "action",
            headerName: "Thao tác",
            renderCell: ({ id }) => {
                return <ActionButton onClick={() => openDetailCb(id)}>
                    Chi tiết
                </ActionButton>
            }
        }
    ]

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function PayslipList(isPersonalView = false) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [payroll, setPayroll] = React.useState(null);
    const [currentOpenIssueId, setCurrentOpenIssueId] = React.useState(null);
    const [issueDetailOpen, setIssueDetailOpen] = React.useState(false);
    const [shouldReloadIssue, setShouldReloadIssue] = React.useState(false);

    const [payslipId, setPayslipId] = React.useState(null);
    const [isEditPayslipOpen, setIsEditPayslipOpen] = React.useState(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const fetchPayrollIssueHook = useFetchPayrollIssue();

    const fetchPayrollHook = useFetchOnePayroll();

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    React.useEffect(() => {
        if (shouldReloadIssue) {
            fetchPayrollIssueHook.method(id);
            setShouldReloadIssue(false);
        }
    }, [shouldReloadIssue])

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchPayslips
    } = useFetchPayslipOfPayroll();

    React.useState(() => {
        if (fetchPayrollHook.isSuccess && fetchPayrollHook.data) {
            setPayroll(fetchPayrollHook.data);
        }
    }, [fetchPayrollHook.isSuccess])

    React.useState(() => {
        if (id) {
            fetchPayrollHook.method(id);
            fetchPayslips(id);
            fetchPayrollIssueHook.method(id);
        }
    }, []);

    return (
        <Fragment>
            {issueDetailOpen &&
                <IssueDetail
                    issueId={currentOpenIssueId}
                    closeDialogCb={() => setIssueDetailOpen(false)}
                    reloadCb={() => { setShouldReloadIssue(true) }}
                />
            }

            {isEditPayslipOpen &&
                <EditPayslip closeDialogCb={
                    () => setIsEditPayslipOpen(false)}
                    payslipId={payslipId} />}

            {isInfoDialogOpen && <InfoDialog
                title={infoDialogMessage.title}
                message={infoDialogMessage.message}
                closeDialogCb={() => {
                    setIsInfoDialogOpen(false);
                    resetDialogState();
                }}
            />}

            <DataGridTabLayout
                title={"Chi tiết payroll"}
                secondaryButtonSection={
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <ActionButton onClick={() => navigate(-1)}>
                            Quay lại
                        </ActionButton>

                        <Button href={`${BASE_URL}/api/payroll/${id}/export`} target="_blank" variant="contained">
                            Xuất Excel
                        </Button>
                    </Box>
                }
                tabSections={[
                    {
                        index: 0,
                        label: 'Payslip',
                        dataGrid: <DataGrid
                            rows={response?.data.map((row) => ({
                                ...row,
                                baseSalary: row.baseSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
                                actualSalary: row.actualSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            })) ?? []}
                            columns={buildColumnConfigPayslip(
                                (id) => {
                                    navigate(`${id}`);
                                })}
                            isError={isError}
                            isLoading={isPending}
                            isSuccess={isSuccess}
                        />
                    },
                    {
                        index: 1,
                        label: 'Phản hồi',
                        dataGrid: <DataGrid
                            rows={fetchPayrollIssueHook?.data.map((row) => ({
                                id: row.id,
                                name: row.name,
                                resolved: row.resolved ? 'Đã giải quyết' : 'Chưa giải quyết',
                                ...row,
                            }))}
                            columns={buildColumnConfigIssue(
                                (id) => {
                                    setCurrentOpenIssueId(id);
                                    setIssueDetailOpen(true);
                                }
                            )}
                            isError={isError}
                            isLoading={isPending}
                            isSuccess={isSuccess}
                        />
                    }
                ]}
            />
        </Fragment>
    );
}


