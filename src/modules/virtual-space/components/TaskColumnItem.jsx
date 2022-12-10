import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey, lightBlue, purple } from "@mui/material/colors";
import TaskDetail from "../pages/TaskDetail";

const TaskColumnItem = ({ item, index, setShouldReload }) => {
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
            <Draggable draggableId={`${item.id}`} index={index}>
                {(provided, snapshot) => {
                    return (
                        <Fragment>
                            <Box sx={{
                                padding: 2,
                                minWidth: '220px',
                                background: 'white',
                                border: '1px solid black',
                                borderLeft: `6px solid ${item.type == 0 ? lightBlue[500] : purple[500]}`
                            }}
                                ref={provided.innerRef}
                                snapshot={snapshot}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 1 }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                        {item.id}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: '13px', color: grey[700] }}>
                                        {item.name}
                                    </Typography>
                                </Box>

                                <Box sx={{ marginBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: .7 }}>
                                        <Avatar sx={{ width: 28, height: 28 }} />
                                        <Typography sx={{ fontSize: '13px', marginTop: .4 }}>
                                            {item.inChargeName}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                        {item.point}
                                    </Typography>
                                </Box>


                                <Button size="small" onClick={() => setIsTaskDetailOpen(true)} >
                                    Xem chi tiết
                                </Button>
                            </Box>
                        </Fragment>
                    );
                }}
            </Draggable>
        </Fragment>
    );
};

export default TaskColumnItem;
