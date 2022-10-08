import React, { Fragment } from 'react';
import { Box } from "@mui/system";
import Register from '../components/RegisterImage';
import { Typography, TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";

import ModalDay from '../components/ModalDay';
import HistoryCheck from '../../../components/Calendar/HistoryCheck';

export default function Calendar() {
    const tableCell = (day) => {
        return (
            <TableCell key={day.id}>
                <Typography align="center">{day.day}</Typography>
            </TableCell>
        )
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
                    />
                </Box>
            </Box>
        </Box >
    </Fragment>
    );
}