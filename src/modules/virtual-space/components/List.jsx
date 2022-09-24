import React from "react";
import {
    Droppable,
    DragDropContext,
    DroppableProvided,
    DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Box, Typography } from '@mui/material';

type ListProps = {
    children?: React.ReactNode;
    title: string;
    onDragEnd: (data: any) => void;
    name: string;
};

const List = ({ children, title, onDragEnd, name }: ListProps) => {
    return (
        <Box>
            <Typography variant='h4' align='center' >{title}</Typography>
            <Box>
                <Droppable droppableId={name}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <Box ref={provided.innerRef} >
                            <Box sx={{ maxHeight: 450, overflow: 'auto'}}>
                                {children}
                                {provided.placeholder}
                            </Box>
                        </Box>
                    )}
                </Droppable>
            </Box>
        </Box>
    );
};

export default List;