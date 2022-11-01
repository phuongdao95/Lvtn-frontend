import React, { Fragment, useEffect, useState } from 'react';
import { Box } from "@mui/system";
import Register from '../components/RegisterImage';
import { Typography, TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";

import ModalDay from '../components/ModalDay';
import HistoryCheck from '../../../components/Calendar/HistoryCheck';
import {useFetchListByUser} from '../../../client/workingShiftTimekeeping.js';
import {useGetByUser} from '../../../client/workingShiftEvent.js';
import * as dateFns from "date-fns";
import { CardContent } from "@mui/material";
import dayjs from "dayjs";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkOffIcon from '@mui/icons-material/WorkOff';

export default function Calendar() {
    const [data, setData] = useState([]);
    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchList
    } = useGetByUser();
    useEffect(() => {
        if (window.localStorage.getItem('user_id') !== undefined) {
            // fetchList(window.localStorage.getItem('user_id'), '0001-1-1 12:00:00 AM');
            fetchList(window.localStorage.getItem('user_id'));
        }
    }, [])
    useEffect(() => {
        if (isSuccess) {
            // console.log(response);
            // setData(response);
            let da = [];
            response.data.forEach(item => {
                if (item.isCheck) {
                    da.push(item);
                }
            });
            console.log(da);
            setData(da);
        }
    }, [isSuccess])
    const tableCell = (day) => {
        return (
            <TableCell key={day.id} sx={{backgroundColor: 'black'}}>
                <Typography align="center" sx={{color: 'white'}}>{day.day}</Typography>
            </TableCell>
        )
    }
    const cardContent = (day, today, formattedDate, monthStart, light) => {
        let isHasWorkShift = checkHasDate(dayjs(day).get('day'));
        return (
            <CardContent>
                {dateFns.isSameDay(day, today) ? (
                <>
                <Typography
                    align="center"
                    color="primary"
                    style={{ fontSize: "20px" }}
                >
                    {formattedDate}
                </Typography>
                {isHasWorkShift ? <WorkOutlineIcon sx={{color: 'blue'}}/> : <WorkOffIcon sx={{color: 'red'}} />}
                </>
                ) : (
                <>
                <Typography
                    align="center"
                    style={
                    dateFns.isSameMonth(day, monthStart)
                        ? {
                            color: light
                        }
                        : {
                            color: "#9C9999"
                        }
                    }
                >
                    {formattedDate}
                </Typography>
                {isHasWorkShift ? <WorkOutlineIcon sx={{color: 'blue'}}/> : <WorkOffIcon sx={{color: 'red'}} />}
                </>
                )}
            </CardContent>
        )
    }
    const checkHasDate = (dateOfWeek) => {
        // console.log(dateOfWeek);
        // console.log(dayjs(data[0].startTime).get('day'), data[0].startTime);
        let re = false;
        data.forEach(item => {
            if (dateOfWeek === dayjs(item.startTime).get('day')) {
                re = true;
            }
        });
        return re;
    }
    return (
    <Fragment>
        <Box sx={{
            padding: 2,
            background: 'white'
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 4,
                }}>
                    <Typography fontSize={30}
                        textTransform={"capitalize"}
                        fontWeight={500}
                        color={grey[800]}
                    >
                        Thời biểu
                    </Typography>
                </Box>
                <Box>
                    <HistoryCheck selectedDate={new Date()} 
                        textColor={'#000000'}
                        modal={ModalDay}
                        tableCell={tableCell}
                        cardContent={cardContent}
                    />
                </Box>
            </Box>
        </Box >
    </Fragment>
    );
}