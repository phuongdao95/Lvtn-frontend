import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SchedulerDayOfWeekHeader({ dayOfWeek }) {
    return <Box sx={{
        background: "white",
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Typography sx={{
            textAlign: 'center',
        }}>
            {dayOfWeek}
        </Typography>
    </Box>;
}