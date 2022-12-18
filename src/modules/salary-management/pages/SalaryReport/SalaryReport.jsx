import React from "react";
import ReportCard from "./ReportCard";
import PayrollPicker from "./PayrollPicker";
import RankingTable from "./RankingTable";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useGetReport } from "../../../../client/payrollService";
import { grey } from "@mui/material/colors";

export default function SalaryReport() {
    const [isPayrollPickerOpen, setIsPayrollPickerOpen] = React.useState(false);
    const [pickedPayrollId, setPickedPayrollId] = React.useState(null);
    const [reportData, setReportData] = React.useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        data: fetchedReport,
        method: fetchReport
    } = useGetReport();

    React.useEffect(() => {
        if (pickedPayrollId) {
            fetchReport(pickedPayrollId);
        }
    }, [pickedPayrollId])

    return <Box sx={{ background: 'white', height: '80vh' }}>
        {isPayrollPickerOpen &&
            <PayrollPicker
                closeDialogCb={() => setIsPayrollPickerOpen(false)}
                handlePick={(id) => {
                    setPickedPayrollId(id);
                    setIsPayrollPickerOpen(false);
                }}
            />}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 5, padding: 2 }}>
            <Typography variant='h4'>Biểu đồ lương </Typography>
            <Button variant="contained" size="small" onClick={() => setIsPayrollPickerOpen(true)}>Chọn payroll</Button>
        </Box>

        {isSuccess && pickedPayrollId &&
            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ReportCard name={"Số nhân viên"} value={
                        fetchedReport.totalEmployee
                    } />
                    <ReportCard name={"Tổng lương nhân viên"} value={
                        fetchedReport.totalActualSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    } />
                    <ReportCard name={"Tổng khấu trừ"} value={
                        fetchedReport.totalDeduction.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    } />
                    <ReportCard name={"Tổng phụ cấp"} value={
                        fetchedReport.totalAllowance.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    } />
                    <ReportCard name={"Tổng thưởng"} value={
                        fetchedReport.totalBonus.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    } />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 3 }}>
                    <Box>
                        <Typography marginLeft={'4px'} fontWeight={"bold"} color={grey[700]}>
                            Xếp hạng tổng thưởng
                        </Typography>

                        <RankingTable rows={fetchedReport.top10Bonus} category='Thưởng' />
                    </Box>

                    <Box>
                        <Typography marginLeft={'4px'} fontWeight={"bold"} color={grey[700]}>
                            Xếp hạng tổng lương
                        </Typography>

                        <RankingTable rows={fetchedReport.top10ActualSalary} category={'Lương'} />
                    </Box>
                </Box>
            </Box>
        }

        {!pickedPayrollId &&
            <Box sx={{ padding: 2 }}>
                <Typography>
                    Chưa có payroll nào được chọn
                </Typography>
            </Box>
        }
    </Box>;
}