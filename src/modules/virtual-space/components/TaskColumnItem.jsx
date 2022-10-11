import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { lightBlue } from "@mui/material/colors";

const cardFooter = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const TaskColumnItem = ({ item, index }) => {
    const randomHeader = "This is a header";

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <Box sx={{
                        padding: 2,
                        minWidth: '220px',
                        background: 'white',
                        border: '1px solid black',
                        borderLeft: `6px solid ${lightBlue[500]}`
                    }}
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Typography sx={{ fontWeight: 500 }}>
                            {randomHeader}
                        </Typography>
                        <Box sx={cardFooter}>
                            <span>{item.content}</span>

                            <Avatar />
                        </Box>
                        <Button size="small" onClick={() => {
                            console.log("hello");
                        }}>
                            View Detail
                        </Button>
                    </Box>
                );
            }}
        </Draggable>
    );
};

export default TaskColumnItem;
