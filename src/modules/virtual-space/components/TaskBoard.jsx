import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { useMoveTask } from "../../../client/taskService";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import { useParams } from "react-router";

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


function TaskBoard({ taskId, taskColumns, reloadList }) {
    const [elements, setElements] = React.useState({});
    const { id: boardId } = useParams();

    useEffect(() => {
        if (taskColumns) {
            setElements(taskColumns);
        }
    }, [taskColumns]);

    const {
        isPending,
        isSuccess,
        isError,
        method: moveTask
    } = useMoveTask();

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

        moveTask(removedElement.id, boardId, result.source.droppableId,
            result.destination.droppableId);

        setElements(listCopy);
    };

    React.useEffect(() => {
        if (isSuccess || isError) {
            reloadList();
        }
    }, [isSuccess, isError])

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            background: 'white',
            padding: 2,
            overflow: 'auto'
        }}>
            <LoadingOverlay isLoading={isPending} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ display: "flex", flexDirection: 'row', gap: 2 }}>
                    {Object.keys(elements).map((listKey) => (
                        <TaskColumn
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
