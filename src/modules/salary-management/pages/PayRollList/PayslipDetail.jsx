import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import PayslipTimekeepingList from "./PayslipTimekeepingList";
import PayslipSalaryDeltaList from "./PayslipSalaryDeltaList";
import PayslipOverview from "./PayslipOverview";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate, useParams } from "react-router";
import { Button, Link } from "@mui/material";

export default function PayslipDetail() {
    const navigate = useNavigate();

    const { payslipId } = useParams();

    return <Fragment>
        <DataGridTabLayout
            title={"Chi tiết payslip"}
            secondaryButtonSection={
                <Fragment>
                    <ActionButton onClick={() => navigate(-1)}>
                        Quay lại
                    </ActionButton>

                    <Button href={`/api/payslip/${payslipId}/export`} target="_blank" variant="contained">Xuất Excel</Button>;
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
                ]
            }
        />;
    </Fragment>
}