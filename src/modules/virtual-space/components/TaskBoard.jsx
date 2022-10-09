import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./TaskColumn";
import { Typography } from "@mui/material";

const dragDropContextContainer = {
    padding: '20px',
    borderRadius: '6px'
}

const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
        const randomId = Math.floor(Math.random() * 1000);
        return {
            id: `item-${randomId}`,
            prefix,
            content: `item ${randomId}`
        };
    });

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ["todo", "inProgress", "done"];

const generateLists = () =>
    lists.reduce(
        (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
        {}
    );

function TaskBoard() {
    const [elements, setElements] = React.useState(generateLists());

    useEffect(() => {
        setElements(generateLists());
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...elements };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );

        setElements(listCopy);
    };

    return (
        <Box sx={{
            width: '100%',
            background: 'white',
            padding: 2,
            overflow: 'auto'
        }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ display: "flex", flexDirection: 'row', gap: 2 }}>
                    {lists.map((listKey) => (
                        <DraggableElement
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={listKey}
                        />
                    ))}
                </Box>
            </DragDropContext>
        </Box >
    );
}

export default TaskBoard;
