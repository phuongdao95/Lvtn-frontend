import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import PayslipTimekeepingList from "./PayslipTimekeepingList";
import PayslipSalaryDeltaList from "./PayslipSalaryDeltaList";
import PayslipOverview from "./PayslipOverview";

export default function PayslipDetail() {
    return <Fragment>
        <DataGridTabLayout
            title={"Chi tiết payslip"}
            primaryButtonSection={<MenuButton
                text={"Thao tác"}
                menu={
                    [
                        {
                            text: "Tạo mới Công thức",
                            handler: () => {
                            }
                        },
                        {
                            text: "Tạo mới Biến",
                            handler: () => {
                            }
                        }
                    ]
                }
                variant="contained"
                color="info"
            />}
            secondaryButtonSection={
                <Fragment></Fragment>
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