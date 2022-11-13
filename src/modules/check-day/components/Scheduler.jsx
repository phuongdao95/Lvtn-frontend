import React from "react";
import { Box } from "@mui/system";
import SchedulerCard from "./SchedulerCard";
import dayjs from "dayjs";
import SchedulerDayOfWeekHeader from "./SchedulerDayOfWeekHeader";
import { grey } from "@mui/material/colors";

const generateShownDaysInScheduler = (year, month) => {
    const firstDateOfMonth = dayjs(`${year}-${month}-01`);
    const diffReverseUntilSunday = firstDateOfMonth.day() - 0;
    const firstDateShowInCalendar = firstDateOfMonth.subtract(diffReverseUntilSunday);
    const daysInMonth = firstDateOfMonth.daysInMonth();
    const lastDateOfMonth = dayjs(`${year}-${month}-${daysInMonth}`);
    const diffUntilSaturday = 6 - lastDateOfMonth.day() - 1;
    const lastDateShownInCalendar = lastDateOfMonth.add(diffUntilSaturday, 'day');

    const result = [];

    for (let date = firstDateShowInCalendar;
        date.isBefore(lastDateShownInCalendar, 'day');
        date = date.add(1, 'day')) {
        result.push(date.date());
    }

    return result;
}

const generateDaysOfWeek = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Thurday', 'Saturday'];
}

export default function Scheduler({ year, month }) {
    const shownDays = React.useMemo(
        () => generateShownDaysInScheduler(year, month), [year, month]);

    const daysOfWeek = React.useMemo(
        () => generateDaysOfWeek(), []);
    console.log({ shownDays })

    return <Box
        sx={{
            background: grey[300],
            minHeight: "70vh",
            display: "grid",
            gap: "4px",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "50px"
        }}
    >
        {daysOfWeek.map((day, index) =>
            <SchedulerDayOfWeekHeader dayOfWeek={day} />)}

        {shownDays.map((day, index) => (
            <SchedulerCard
                key={index}
                day={day}
                events={[
                    { title: "Hello 8:30 - 9:30  " },
                    { title: "World at 9:30" },
                    { title: "World at 9:30" },
                ]}
            />
        ))}
    </Box>
}