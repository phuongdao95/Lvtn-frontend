import React from "react";
import { Button } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import SchedulerEventCard from "./SchedulerEventCard";

const generateDaysInMonth = (year, month) => {
    const firstDateOfMonth = dayjs(`${year}-${month}-01`);

    return new Array({ length: firstDateOfMonth.daysInMonth() },
        (_, index) => index + 1)
}

export default function SchedulerCard({
    events,
    day,
    month,
    year,
    isDayInMonth = true
}) {
    const daysInMonth = React.useMemo(
        () => generateDaysInMonth(year, month), [year, month]);

    return <Box sx={{
        background: 'white',
        position: 'relative',
        border: `2spx solid ${grey[200]}`,
        padding: '10px',
        paddingTop: '24px',
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        '&:hover': {
            cursor: 'pointer',
            background: yellow[100],
            transition: '100ms all',
        }
    }}>
        <Box sx={{
            position: 'absolute',
            fontWeight: 'semibold',
            color: isDayInMonth ? grey[800] : grey[400],
            top: "2px",
            right: "4px"
        }}>
            {day}
        </Box>

        <Box sx={{
            display: 'flex', gap: 1,
            flexWrap: "wrap",

        }}>
            {events.filter((_, index) => index < 3)
                .map((event) =>
                    <SchedulerEventCard title={event.title} />)}

            {events.length > 3 &&
                < Button size="small" variant="outlined" sx={{ textTransform: "capitalize" }}>
                    more</Button>
            }
        </Box>
    </Box >;
}