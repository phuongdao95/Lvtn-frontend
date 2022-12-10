import React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ReportCard from "./ReportCard";
import PayrollPicker from "./PayrollPicker";

export default function SalaryReport() {
    const [isPayrollPickerOpen, setIsPayrollPickerOpen] = React.useState(false);
    const [pickedPayrollId, setPickedPayrollId] = React.useState(null);

    React.useEffect(() => {
        console.log(pickedPayrollId);
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

        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <ReportCard name={"Số nhân viên"} value={123} />
                <ReportCard name={"Tổng lương nhân viên"} value={123} />
                <ReportCard name={"Tổng khấu trừ"} value={123} />
                <ReportCard name={"Tổng phụ cấp"} value={123} />
                <ReportCard name={"Tổng thưởng"} value={123} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 3 }}>
                <Box>
                    Xếp hạng tổng phụ cấp
                </Box>

                <Box>
                    Xếp hạng tổng thưởng
                </Box>

                <Box>
                    Xếp hạng tổng khấu trừ
                </Box>

                <Box>
                    Xếp hạng lương cơ bản
                </Box>
            </Box>
        </Box>

    </Box>;
}