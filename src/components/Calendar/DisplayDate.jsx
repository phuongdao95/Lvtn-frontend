import React, { useState } from "react";
import {
    Typography,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Card,
    CardActionArea,
    CardContent
} from "@mui/material";
import * as dateFns from "date-fns";

const DisplayDate = props => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('')
    const onDateClick = (str) => {
        setOpen(true);
        setDate(str);
    }
    
    const today = new Date();
    const { selectedDate } = props;
    const monthStart = dateFns.startOfMonth(selectedDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const weekdays = [
        { id: 0, day: "Sun" },
        { id: 1, day: "Mon" },
        { id: 2, day: "Tue" },
        { id: 3, day: "Wed" },
        { id: 4, day: "Thu" },
        { id: 5, day: "Fri" },
        { id: 6, day: "Sat" }
    ];

    const eachWeek = [];
    let daysOfWeek = [];

    let day = startDate;
    let end = endDate;
    let formattedDate;
    const dateFormat = "d";

    let weekNumber = 1;
    while (day <= end) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            daysOfWeek.push(
                <TableCell key={formattedDate} >
                <CardActionArea
                    style={{ height: "100%" }}
                >
                    <Card
                    onClick={() => onDateClick(dateFns.format(cloneDay, 'dd/MM/yyyy'))}
                    style={
                        dateFns.isSameDay(day, selectedDate)
                        ? {
                            backgroundColor: "rgba(128,128,128,0.5)",
                            height: "100%"
                            }
                        : {
                            backgroundColor: "rgba(0,0,0,0)",
                            height: "100%"
                            }
                    }
                    >
                    {props.cardContent ? props.cardContent(day, today, formattedDate, monthStart, props.light) : 
                    <CardContent>
                        {dateFns.isSameDay(day, today) ? (
                        <Typography
                            align="center"
                            color="primary"
                            style={{ fontSize: "20px" }}
                        >
                            {formattedDate}
                        </Typography>
                        ) : (
                        <Typography
                            align="center"
                            style={
                            dateFns.isSameMonth(day, monthStart)
                                ? {
                                    color: props.light
                                }
                                : {
                                    color: "#9C9999 "
                                }
                            }
                        >
                            {formattedDate}
                        </Typography>
                        )}
                    </CardContent>}
                    </Card>
                </CardActionArea>
                </TableCell>
            );
            day = dateFns.addDays(day, 1);
        }
        eachWeek.push(<TableRow key={weekNumber}>{daysOfWeek}</TableRow>);
        daysOfWeek = [];
        weekNumber += 1;
    }

    return (<>
        {props.modal({open, setOpen, date})}
        <Table style={{ height: "90%" }}>
            <TableHead>
                <TableRow>
                {weekdays.map(day => (
                    props.tableCell(day)
                ))}
                </TableRow>
            </TableHead>
            <TableBody>{eachWeek}</TableBody>
        </Table>
        </>
    );
};

export default DisplayDate;