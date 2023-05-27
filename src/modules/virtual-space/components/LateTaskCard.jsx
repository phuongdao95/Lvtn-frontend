import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey, lightBlue, purple } from "@mui/material/colors";
import TaskDetail from "../pages/TaskDetail";
import dayjs from "dayjs";

const LateTaskCard = ({ item, setShouldReload }) => {
    const [isTaskDetailOpen, setIsTaskDetailOpen] = React.useState(false);

    return (
        <Fragment>
            {isTaskDetailOpen &&
                <TaskDetail taskId={item.id} closeCb={() => {
                    setIsTaskDetailOpen(false);
                    if (setShouldReload) {
                        setShouldReload(true);
                    }
                }} />
            }
            <Fragment>
                <Box sx={{
                    padding: 2,
                    minWidth: 250,
                    background: 'white',
                    border: '1px solid black',
                    borderLeft: `6px solid ${item.type == 0 ? lightBlue[500] : purple[500]}`
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                            {item.id}
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: '13px', color: grey[700] }}>
                            {item.name}
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: 1, justifyContent: 'space-around' }}>
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: .7 }}>
                                <Avatar sx={{ width: 28, height: 28 }} />
                                <Typography sx={{ fontSize: '13px', marginTop: .4 }}>
                                    {item.inChargeName}
                                </Typography>
                            </Box>
                            <Box sx={{ marginLeft: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{ fontSize: '13px' }}>
                                        Point
                                    </Typography>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold', }}>
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{ fontSize: '13px' }}>
                                        Deadline
                                    </Typography>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold', }}>
                                        {dayjs().format('DD/MM/YYYY')}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '13px' }}>
                                        Dự kiến
                                    </Typography>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                        {dayjs().format('DD/MM/YYYY')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                    <Button size="small" onClick={() => setIsTaskDetailOpen(true)} >
                        Xem chi tiết
                    </Button>
                </Box>

            </Fragment>
        </Fragment>
    );
};

export default LateTaskCard;