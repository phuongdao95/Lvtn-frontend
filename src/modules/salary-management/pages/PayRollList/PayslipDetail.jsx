import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import PayslipTimekeepingList from "./PayslipTimekeepingList";
import PayslipSalaryDeltaList from "./PayslipSalaryDeltaList";
import PayslipOverview from "./PayslipOverview";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";

export default function PayslipDetail() {
    const navigate = useNavigate();

    return <Fragment>
        <DataGridTabLayout
            title={"Chi tiết payslip"}
            secondaryButtonSection={
                <Fragment>
                    <ActionButton onClick={() => navigate(-1)}>
                        Quay lại
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
                ]
            }
        />;
    </Fragment>
}