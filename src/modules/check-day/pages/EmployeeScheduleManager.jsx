import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ScheduleManager from "../components/ScheduleManager";
import dayjs from "dayjs";
import SchedulerMonthPicker from "../components/SchedulerMonthPicker";
import { grey } from "@mui/material/colors";

import { useParams } from 'react-router';

const monthReducer = (state, action) => {
    switch (action.type) {
        case "pickMonth":
            return {
                ...state,
                month: action.payload.month,
            }
        case "nextYear":
            return {
                ...state,
                year: state.year + 1
            }
        case "previousYear":
            return {
                ...state,
                year: state.year - 1
            }
        case "nextMonth":
            return {
                ...state,
                month: (state.month + 1) % 12,
                year: state.month + 1 >= 12 ?
                    state.year + 1 : state.year,
            }
        case "previousMonth":
            return {
                ...state,
                month: (state.month - 1) % 12 < 0 ?
                    state.month + 11 : state.month - 1,
                year: state.month - 1 < 0 ?
                    state.year - 1 : state.year,
            }
        default:
            return state;
    }
}

const initialSchedulerState = {
    name: 'eventPickerActivated',
    isMonthPickerActive: false,
    isEventPickerActive: true,
}

const schedulerReducer = (state, action) => {
    switch (action.type) {
        case "togglePicker":
            if (state.name == 'monthPickerActivated') {
                return schedulerReducer(state, { type: 'activateEventPicker' });
            }
            if (state.name == 'eventPickerActivated') {
                return schedulerReducer(state, { type: 'activateMonthPicker' });
            }
            return state;
        case "handleDidPickMonth":
            return schedulerReducer(state, { type: 'activateEventPicker' })
        case "activateEventPicker":
            return {
                name: 'eventPickerActivated',
                isMonthPickerActive: false,
                isEventPickerActive: true,
            }
        case "activateMonthPicker":
            return {
                name: 'monthPickerActivated',
                isMonthPickerActive: true,
                isEventPickerActive: false,
            };
        default:
            return state;
    }
}

export default function TimekeepingSchedule({params, setSwitchToSchedule}) {
    const { month, year, id, name } = params;
    console.log(params);
    const initialMonth = {
        year: Number(year),
        month: Number(month),
    }
    const [monthState, dispatchMonthAction]
        = React.useReducer(monthReducer, initialMonth);

    const [schedulerState, dispatchShedulerAction]
        = React.useReducer(schedulerReducer, initialSchedulerState);


    const handlePreviousClick = () => {
        setSwitchToSchedule(false);
    }

    return <Box sx={{
        padding: 2,
        background: 'white'
    }}>
        <Box>
            <Typography fontSize={30}
                textTransform={"capitalize"}
                fontWeight={500}
                color={grey[800]}
            >
                Lịch chấm công: {name}
            </Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'white',
            paddingY: '6px',
            paddingX: '4px',
            marginBottom: '4px',
        }}>
            <Button size="small" onClick={handlePreviousClick}>
                Quay lại 
            </Button>
        </Box>

        {schedulerState.isMonthPickerActive &&
            <SchedulerMonthPicker handlePick={
                (month) => {
                    dispatchMonthAction({
                        type: 'pickMonth',
                        payload: {
                            month
                        }
                    })

                    dispatchShedulerAction({
                        type: 'handleDidPickMonth'
                    });
                }} />}


        {schedulerState.isEventPickerActive &&
            <ScheduleManager year={monthState.year} month={monthState.month} id={id}/>
        }
    </Box >
}