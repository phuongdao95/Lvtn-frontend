import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const generateMonths = () => {
    return Array.from({ length: 12 }, (_, index) => index + 1);
}

export default function SchedulerMonthPicker({ handlePick }) {
    const months = React.useMemo(() => generateMonths(), []);

    return <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 4,
        padding: 4,
        background: 'white',
        minHeight: '70vh',
    }}>
        {months.map(month =>
            <Button key={month}
                variant="outlined"
                onClick={() => {
                    handlePick(month - 1)
                }}
                sx={{
                    fontSize: 20,
                    background: "white",
                }}>
                Tháng {month}
            </Button>)}
    </Box>;
}
