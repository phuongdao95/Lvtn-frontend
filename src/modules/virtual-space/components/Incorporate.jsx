import Card from "./Card";
import List from "./List";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useState } from "react";
import { Box, Typography, Grid } from '@mui/material';

const Incorporate = (props) => {
    const [items, setItems] = useState(props.itemsNormal);

    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list: any, index: any, element: any) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            console.log(result);
            return;
        }
        const listCopy: any = { ...items };
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
        setItems(listCopy);
    };

    const renderColumn = (name, items) => {
        return (
            <List title={name} onDragEnd={onDragEnd} name={name} >
                {items[name].map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                        {(
                            provided: DraggableProvided | any,
                            snapshot: DraggableStateSnapshot
                        ) => (
                            <div style={{padding: '10px',}}>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card data={item} />
                                </div>
                            </div>
                        )}
                    </Draggable>
                ))}
            </List>
        );
    }
    const countColumn = Object.keys(items).length;
    return (
    <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{
                display: 'flex',
                overflow: 'auto',
                width: 900
            }}>
                {Object.keys(items).map((item, index) => (
                    <Box key={index}
                        sx={{
                            minWidth: 300,
                        }}
                    >
                        {renderColumn(item, items)}
                    </Box>
                ))}
            </Box>
        </DragDropContext>
    </>
    );
};

export default Incorporate;