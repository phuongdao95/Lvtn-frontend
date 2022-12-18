import React from "react";
import { Box } from "@mui/system";
import SchedulerCard from "./SchedulerCard";
import dayjs from "dayjs";
import SchedulerDayOfWeekHeader from "./SchedulerDayOfWeekHeader";
import { grey } from "@mui/material/colors";
import { useFetchRegistrationListOfUser } from "../../../client/workingShiftService";
import { getCurrentUserId } from "../../../client/autheticationService";

const generateShownDaysInScheduler = (year, month) => {
    const firstDateOfMonth = dayjs(`${year}-${month}-01`);
    const diffReverseUntilSunday = firstDateOfMonth.day() - 0;
    const firstDateShowInCalendar = firstDateOfMonth.subtract(diffReverseUntilSunday, 'day');
    const daysInMonth = firstDateOfMonth.daysInMonth();
    const lastDateOfMonth = dayjs(`${year}-${month}-${daysInMonth}`);
    const diffUntilSaturday = 6 - lastDateOfMonth.day();
    const lastDateShownInCalendar = lastDateOfMonth.add(diffUntilSaturday, 'day');

    const result = [];

    for (let date = firstDateShowInCalendar;
        date.isBefore(lastDateShownInCalendar, 'day') || date.isSame(lastDateShownInCalendar, 'day');
        date = date.add(1, 'day')) {
        result.push(date);
    }

    console.log(result)

    return result;
}

const generateDaysOfWeek = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

const groupEventsByDay = (events, year, month) => {
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const result = Array.from({ length: daysInMonth }, (_, index) => index + 1)
        .map(() => []);

    for (let event of events) {
        let dayOfEvent = dayjs(event.workingShiftStartTime).date();
        result[dayOfEvent - 1].push(event);
    }

    console.log({ result })
    return result;
}

export default function Scheduler({ year, month }) {
    const [events, setEvents] = React.useState([])

    const {
        isSuccess,
        isPending,
        isError,
        method: fetchWorkingShifts,
        data: registrationResponse
    } = useFetchRegistrationListOfUser();

    React.useEffect(() => {
        fetchWorkingShifts(getCurrentUserId(), `${(month % 12) + 1}/${year}`, 'month');
    }, [month, year])

    React.useEffect(() => {
        if (isSuccess) {
            const eventsByDay = groupEventsByDay(registrationResponse.data);
            setEvents(eventsByDay)
        }
    }, [isSuccess])

    const shownDays = React.useMemo(
        () => generateShownDaysInScheduler(year, (month % 12) + 1), [year, month]);

    const daysOfWeek = React.useMemo(
        () => generateDaysOfWeek(), []);

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
            <SchedulerDayOfWeekHeader key={index} dayOfWeek={day} />)}

        {shownDays.map((day, index) => {
            return <SchedulerCard
                key={index}
                day={day.date()}
                month={day.month()}
                year={day.year()}
                events={day.month() !== month ? [] : events[day.date() - 1]}
            />
        }
        )}
    </Box>
}