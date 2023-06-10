import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import PayslipTimekeepingList from "./PayslipTimekeepingList";
import PayslipSalaryDeltaList from "./PayslipSalaryDeltaList";
import PayslipOverview from "./PayslipOverview";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate, useParams } from "react-router";
import { Button } from "@mui/material";
import { BASE_URL } from "../../../../client/api";
import PayslipIssueList from "./PayslipIssueList";
import { useFetchOnePayslip } from "../../../../client/payrollService";
import CreateIssue from "./CreateIssue";

export default function PayslipDetail() {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');

    const [createIssueOpen, setCreateIssueOpen] = React.useState(false);
    const [shouldReloadIssue, setShouldReloadIssue] = React.useState(false);

    const { payslipId } = useParams();

    const fetchOnePayslipHook = useFetchOnePayslip();

    React.useEffect(
        () => {
            fetchOnePayslipHook.method(payslipId);
        },
        []
    );

    React.useEffect(
        () => {
            if (fetchOnePayslipHook.isSuccess) {
                setName(fetchOnePayslipHook?.data?.name ?? '');
            }
        },
        [fetchOnePayslipHook.isSuccess]
    )


    return <Fragment>
        {
            createIssueOpen &&
            <CreateIssue payslipId={payslipId}
                reloadCb={() => { setShouldReloadIssue(true) }}
                closeDialogCb={() => setCreateIssueOpen(false)}
            />
        }

        <DataGridTabLayout
            title={`Chi tiết payslip ${name}`}
            secondaryButtonSection={
                <Fragment>
                    <ActionButton onClick={() => navigate(-1)}>
                        Quay lại
                    </ActionButton>

                    <Button href={`${BASE_URL}api/payslip/${payslipId}/export`} target="_blank" variant="contained">
                        Xuất Excel
                    </Button>

                    <ActionButton variant="contained" onClick={() => { setCreateIssueOpen(true) }} >
                        Phản hồi
                    </ActionButton>
                </Fragment>
            }
            tabSections={
                [
                    {
                        index: 0,
                        label: "Khái quát",
                        dataGrid: <PayslipOverview />
                    },
                    {
                        index: 1,
                        label: "Lương chấm công",
                        dataGrid: <PayslipTimekeepingList />
                    },
                    {
                        index: 2,
                        label: "Khấu trừ, phụ cấp, thưởng",
                        dataGrid: <PayslipSalaryDeltaList />
                    },

                    {
                        index: 3,
                        label: "Phản hồi",
                        dataGrid: <PayslipIssueList shouldReload={shouldReloadIssue} />
                    }
                ]
            }
        />;
    </Fragment>
}