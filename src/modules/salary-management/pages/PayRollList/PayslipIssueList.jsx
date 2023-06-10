import React, { Fragment } from "react";
import api from "../../../../client/api";
import IssueDetail from "./IssueDetail";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import { Box } from "@mui/material";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useParams } from "react-router";
import dayjs from "dayjs";

const useFetchIssues = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState({});

    const method = async (payslipId) => {
        try {
            setIsPending(true);
            const response = await api.get(`/api/payslip/${payslipId}/issue`);

            if (!response) {
                throw response.err;
            }

            setData(response.data);
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

    return { isSuccess, isError, isPending, method, data }
}

const buildColumnConfig = (openDetailCb) => {
    return [
        {
            field: "id",
            headerName: "Id",
            width: 100,
        },
        {
            field: "payslipName",
            headerName: "Tên payslip",
            width: 250
        },
        {
            field: "content",
            headerName: "Nội dung",
            width: 200,
        },
        {
            field: "createdBy",
            headerName: "Tạo bởi",
            width: 150
        },
        {
            field: "createdAt",
            headerName: "Tạo lúc",
            width: 150
        },
        {
            field: "resolved",
            headerName: "Đã đóng",
            width: 150,
        },
        {
            field: "resolvedBy",
            headerName: "Đóng bởi",
            width: 150
        },
        {
            field: "resolvedAt",
            headerName: "Đóng lúc",
            width: 150
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
    ]
}

export default function PayslipIssueList(props) {
    const { payslipId } = useParams();

    const [currentOpenIssueId, setCurrentOpenIssueId] = React.useState(null);

    const [issues, setIssues] = React.useState([]);

    const [detailOpen, setDetailOpen] = React.useState(false);

    const [shouldReload, setShouldReload] = React.useState(props.shouldReload);

    const fetchIssuesHook = useFetchIssues();

    React.useEffect(() => {
        if (shouldReload) {
            fetchIssuesHook.method(payslipId);
            setShouldReload(false);
        }
    }, [shouldReload])

    React.useEffect(() => {
        fetchIssuesHook.method(payslipId);
    }, [])

    React.useEffect(() => {
        if (fetchIssuesHook.isSuccess) {
            console.log(fetchIssuesHook.data);
            setIssues(fetchIssuesHook.data ?? []);
        }
    }, [fetchIssuesHook.isSuccess, fetchIssuesHook.data])


    return <Fragment>
        {
            detailOpen &&
            <IssueDetail closeDialogCb={() => setDetailOpen(false)}
                issueId={currentOpenIssueId}
                reloadCb={() => setShouldReload(true)}
            />
        }

        <DataGrid
            rows={issues.map((row) => ({
                id: row.id,
                payslipName: row.payslipName,
                content: row.content,
                createdBy: row.createdBy,
                createdAt: dayjs(row.createdAt).format('DD/MM/YYYY HH:ss'),
                resolved: row.resolved ? 'yes' : 'no',
                resolvedBy: row.resolvedBy,
                resolvedAt: row.resolvedAt ? dayjs(row.resolvedAt).format('DD/MM/YYYY HH:ss') : null
            })) ?? []}
            columns={
                buildColumnConfig(
                    (id) => {
                        setCurrentOpenIssueId(id);
                        setDetailOpen(true);
                    },
                )
            }
            isError={fetchIssuesHook.isError}
            isLoading={fetchIssuesHook.isPending}
            isSuccess={fetchIssuesHook.isSuccess}
        />
    </Fragment>
}