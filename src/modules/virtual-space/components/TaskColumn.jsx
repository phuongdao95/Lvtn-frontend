import React from "react";

import { Box, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

import ListItem from "./TaskColumnItem";

const columnHeader = {
    textTransform: 'uppercase',
    marginBottom: '20px'
}

const DraggableElement = ({ prefix, elements }) => (
    <Box sx={{
        position: 'relative',
        maxHeight: '65vh',
        padding: 0,
    }}>
        <Typography sx={{
            ...columnHeader,
            position: "sticky",
            top: 0,
            background: 'white'

        }}>
            {prefix}
        </Typography>
        <Droppable droppableId={`${prefix}`}>
            {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} sx={{
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '6px',
                    minHeight: '65vh',
                    minWidth: '200px',
                }}>
                    {elements.map((item, index) => (
                        <ListItem key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    </Box>
);

export default DraggableElement;