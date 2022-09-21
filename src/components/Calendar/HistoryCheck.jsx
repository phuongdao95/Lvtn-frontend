import React, {useState} from "react";
import { Paper, Button, Typography, IconButton } from "@mui/material";
import * as dateFns from "date-fns";
import DisplayMonth from "./DisplayMonth";
import DisplayDate from "./DisplayDate";
import DisplayYear from "./DisplayYear";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HistoryCheck = (props) => {
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [selectedMonth, setSelectedMonth] = useState(new Date());
    // const [mode, setMode] = useState(0);

    const [state, setState] = useState({
        selectedDate: new Date(),
        selectedMonth: new Date(),
        mode: 0,
    })

    /**
     * Depending on the mode, the calendar header will render different text.
     */
    const renderHeader = () => {
        const dateYearFormat = "yyyy";
        const dateMonthFormat = "MMMM yyyy";
        let header;
        if (state.mode === 0) {
            header = (
                <Typography variant="h5" inline={true}>
                    {dateFns.format(state.selectedDate, dateMonthFormat)}
                </Typography>
            );
        } else if (state.mode === 1) {
            header = (
                <Typography variant="h5" inline={true}>
                    {dateFns.format(state.selectedDate, dateYearFormat)}
                </Typography>
            );
        } else {
            const pastFiveYears = dateFns.addYears(state.selectedDate, -9);
            const nextFiveYears = dateFns.addYears(state.selectedDate, 2);
            header = (
                <Typography variant="h5" inline={true}>
                    {dateFns.format(pastFiveYears, dateYearFormat)} -{" "}
                    {dateFns.format(nextFiveYears, dateYearFormat)}
                </Typography>
            );
        }
        return (
            <Paper
                style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    minHeight: "5%"
                }}
            >
                <IconButton onClick={() => onChevronClick(true)}>
                    <ChevronLeftIcon />
                </IconButton>
                <Button onClick={() => modeChange()}>{header}</Button>
                <IconButton onClick={() => onChevronClick(false)}>
                    <ChevronRightIcon />
                </IconButton>
            </Paper>
        );
    }

    /**
     * Render the header but without mode change.
     */
    const renderYearHeader = () => {
        const dateYearFormat = "yyyy";
        let header;

        const pastFiveYears = dateFns.addYears(state.selectedDate, -9);
        const nextFiveYears = dateFns.addYears(state.selectedDate, 2);
        header = (
            <Typography variant="h5" inline={true}>
                {dateFns.format(pastFiveYears, dateYearFormat)} -{" "}
                {dateFns.format(nextFiveYears, dateYearFormat)}
            </Typography>
        );

        return (
            <Paper
                style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    minHeight: "5%"
                }}
            >
            <IconButton onClick={() => yearChevronClick(true)}>
                <ChevronLeftIcon />
            </IconButton>
            <Button onClick={() => modeChange()}>{header}</Button>
            <IconButton onClick={() => yearChevronClick(false)}>
                <ChevronRightIcon />
            </IconButton>
            </Paper>
        );
    };

    /*
    * Clicking on the header will change the mode between days, months and years.
    */
    const modeChange = () => {
        if (state.mode === 0) {
            setState({ ...state, mode: 1 });
        } else if (state.mode === 1) {
            setState({ ...state, mode: 2, selectedDate: new Date() });
        } else {
            setState({ ...state, mode: 0, selectedDate: new Date() });
        }
    };

    /*
    * Clicking on the chevron buttons next to the calendar will add or subtract months/year/decades.
    */
    const onChevronClick = direction => {
        if (direction) {
            if (state.mode === 0) {
                setState({
                    ...state,
                    selectedDate: dateFns.addMonths(state.selectedDate, -1)
                });
            } else if (state.mode === 1) {
                setState({
                    ...state,
                    selectedDate: dateFns.addYears(state.selectedDate, -1)
                });
            } else {
                setState({
                    ...state,
                    selectedDate: dateFns.addYears(state.selectedDate, -9)
                });
            }
        } else {
            if (state.mode === 0) {
                setState({
                    ...state,
                    selectedDate: dateFns.addMonths(state.selectedDate, 1)
                });
            } else if (state.mode === 1) {
                setState({
                    ...state,
                    selectedDate: dateFns.addYears(state.selectedDate, 1)
                });
            } else {
                setState({
                    ...state,
                    selectedDate: dateFns.addYears(state.selectedDate, 9)
                });
            }
        }
    };

    /*
    * Clicking on the chevron buttons next to the calendar will add or subtract months/year/decades.
    */
    const yearChevronClick = direction => {
        if (direction) {
            setState({
                ...state,
                selectedDate: dateFns.addYears(state.selectedDate, -9)
            });
        } else {
            setState({
                ...state,
                selectedDate: dateFns.addYears(state.selectedDate, 9)
            });
        }
    };

    /**
     * Clicking on a month in mode 1 will set the month and return back to the day calendar.(Monthly calendar mode)
     * If explicitly set to month mode, it will only return the month value.
     * Else it will change back to mode 0.
     */
    const onSetMonth = value => {
        if (props.selection !== undefined && props.mode === "month") {
            props.selection(value);
        } else {
            var result = dateFns.setMonth(state.selectedDate, value);
            setState({ ...state, selectedDate: result, mode: 0 });
        }
    };

    /**
     * Clicking on a year in mode 2 will set the year and return back to monthly calendar. (Yearly calendar mode)
     * If explicitly set to year mode, it will only return the year value.
     * Else it will change back to mode 1.
     */
    const onYearClick = value => {
        if (props.selection !== undefined && props.mode === "year") {
            props.selection(value);
        } else {
            setState({
                ...state,
                mode: 1,
                selectedDate: dateFns.setYear(state.selectedDate, value)
            });
        }
    };

    /**
     * Renders the regular calendar that can switch between day, month and year view.
     */
    const defaultDaySelector = () => {
        let textColor = { color: "rgba(0,0,0,1)" };
        let body;
        if (state.mode === 0) {
            body = (
                <DisplayDate
                    modal={props.modal}
                    selectedDate={state.selectedDate}
                    light={textColor}
                />
            );
        } else if (state.mode === 1) {
            body = (
                <DisplayMonth
                    onSetMonth={onSetMonth}
                    light={textColor}
                />
            );
        } else {
            body = (
                <DisplayYear
                    year={state.selectedDate}
                    onSetYear={onYearClick}
                    light={textColor}
                />
            );
        }

        return (
            <div style={{ height: "100%" }}>
                {renderHeader()}
                {body}
            </div>
        );
    };

    /**
     * Only render the month calendar and does not switch modes.
     */
    const monthSelector = () => {
        let textColor = { color: "rgba(0,0,0,1)" };
        return (
            <DisplayMonth onSetMonth={onSetMonth} light={textColor} />
        );
    };

    /**
     * Only render the year calendar and does not switch modes.
     */
    const yearSelector = () => {
    let textColor = { color: "rgba(0,0,0,1)" };

    return (
        <div style={{ height: "100%" }}>
            {renderYearHeader()}
            <DisplayYear
                year={state.selectedDate}
                onSetYear={onYearClick}
                light={textColor}
            />
        </div>
    );
  };
    //year={state.selectedDate}
    /**
     * Depending on the props given, renders the different modes.
     */
    const modeSelector = () => {
        if (props.mode === "year") {
            return yearSelector();
        } else if (props.mode === "month") {
            return monthSelector();
        } else {
            return defaultDaySelector();
        }
    };

    /**
     * Main render method
     */
    
    return (
        <Paper>{modeSelector()}</Paper>
    );

}

export default HistoryCheck;