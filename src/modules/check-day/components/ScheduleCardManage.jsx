import React from "react";
import { grey, yellow } from "@mui/material/colors";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import SchedulerEventCard from "./SchedulerEventCard";
import TimekeepingsOfDayManager from "./TimekeepingsOfDayManager";

import { useIsFullTime } from "../../../client/TimekeepingManageService";

const generateDaysInMonth = (year, month) => {
    const firstDateOfMonth = dayjs(`${year}-${month}-01`);

    return new Array({ length: firstDateOfMonth.daysInMonth() },
        (_, index) => index + 1)
}

export default function SchedulerCardManager({
    events,
    day,
    month,
    year,
    isDayInMonth = true,
    id
}) {
    const [isTimekeepingsOfDayShown, setIsTimekeepingsOfDayShown] = React.useState(false);
    const [hasChange, setHasChange] = React.useState(false);
    const [stop, setStop] = React.useState(false);
    const [isCheckFullTime, setIsCheckFullTime] = React.useState(0);
    const {
        isPending,
        isSuccess,
        isError,
        data: fetchData,
        method: fetch,
    } = useIsFullTime();

    React.useEffect(() => {
        if (!stop) {
            fetch(day, month + 1, year, id);
        }
    }, [stop])

    React.useEffect(() => {
        if (isSuccess) {
            setIsCheckFullTime(fetchData.data);
            setStop(true);
        }
    }, [isSuccess])

    return <Box
        onClick={() => setIsTimekeepingsOfDayShown(true)}
        sx={{
            background: isCheckFullTime == 1 ? '#B4F7B9' : isCheckFullTime == -1 ? 'orange' : 'white',
            position: 'relative',
            border: `2px solid ${grey[200]}`,
            padding: '5px',
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

        {isTimekeepingsOfDayShown &&
            <TimekeepingsOfDayManager closeDialogCb={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsTimekeepingsOfDayShown(false);
            }} date={dayjs(new Date(year, month, day))} id={id}/>
        }

        <Box sx={{
            position: 'absolute',
            fontWeight: 'semibold',
            color: isDayInMonth ? grey[1000] : grey[400],
            top: "2px",
            right: "4px"
        }}>
            {day}
        </Box>

        <Box
            sx={{
                display: 'flex', gap: 1,
                flexWrap: "wrap",
            }}
        >
            {events && events.map((event) =>
                <SchedulerEventCard title={
                    `${dayjs(event.workingShiftStartTime).format('HH:mm')} -
                        ${dayjs(event.workingShiftEndTime).format('HH:mm')}`} />)}

            {events && events.length > 3 &&
                < Button size="small" variant="outlined" sx={{ textTransform: "capitalize" }}>
                    more</Button>
            }
        </Box>
    </Box >;
}