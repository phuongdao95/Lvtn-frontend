import React, {Fragment, useState} from 'react';
import Chatbox from '../../../components/Chatbox/Chatbox';
import Incorporate from '../components/Incorporate';
import Card from '../components/Card';
import { Typography, Box, Grid, TableCell, CssBaseline, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HistoryCheck from '../../../components/Calendar/HistoryCheck'
import ModalDay from '../components/ModalDay';
import TaskIcon from '@mui/icons-material/Task';
import CreateTask from '../components/CreateTask';

// data samble
const itemsNormal = {
    available: [
        {
            id: 1,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477",
            title: "What is Lorem Ipsum?",
            subtitle: "Lorem Ipsum is simply dummy",
            updatedAt: "6 days ago",
        },
        {
            id: 2,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
            title: "Why do we use it?",
            subtitle: "The point of using at its layout",
            updatedAt: "2 days ago",
        },
        {
            id: 3,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449",
            title: "Where does it come from?",
            subtitle: "Contrary to popular belief, Lorem Ipsum is not simply",
            updatedAt: "3 days ago",
        },
    ],

    assigned: [
        {
            id: 5,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450",
            title: "Where can I get some?",
            subtitle: "There are many variations",
            updatedAt: "6 days ago",
        },
        {
            id: 6,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451",
            title: "Morbi sagittis tellus a efficitur",
            subtitle: "Etiam mollis eros eget mi.",
            updatedAt: "2 days ago",
        },
    ],

    test: [
        {
            id: 7,
            title: "heelldo",
            updatedAt: "3 days ago"
        },
        {
            id: 8,
            title: "adasf",
            updatedAt: "1 days ago"
        },
    ],
    helo: [
        {
            id: 9,
            title: "heelldo",
            updatedAt: "3 days ago"
        },
        {
            id: 10,
            title: "adasf",
            updatedAt: "1 days ago"
        },
    ],
};
const listTask = ['Team Dev', 'QA', 'Tester', 'QC'];

const VirtualSpace = () => {
    const [data, setData] = useState(itemsNormal);
    const [activeTask, setActiveTask] = useState(listTask[0]);
    const setTask = (text) => {
        setActiveTask(text);
        // setData()
    }
    // display table cell in calendar
    const tableCell = (day) => {
        return (
            <TableCell key={day.id}>
                <Typography align="center">{day.day}</Typography>
            </TableCell>
        )
    }
    return (
    <Fragment>
        <Box sx={{ display: 'flex', position: 'relative' }}>
            <Box sx={{
                bgcolor: '#1A1A50',
                borderRadius: 3,
            }}>
                <List>
                    {listTask.map((text, index) => (
                        <ListItem key={index} disablePadding
                            sx={{
                                bgcolor: (activeTask === text ? '#4C8C4A' : '#38384E'),
                                m: 1,
                                borderRadius: 2,
                                border: 1,
                                width: 250,
                                borderColor: 'white',
                            }}
                            onClick={() => setTask(text)}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TaskIcon sx={{color: 'white'}} />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography type="body2" style={{ color: '#FFFFFF' }}>
                                        {text}
                                    </Typography>
                                } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
                <Box>
                    <Incorporate itemsNormal={data} />
                </Box>
                <Box sx={{
                    pt: 5,
                }} >
                    <HistoryCheck selectedDate={new Date()} 
                        textColor={'#000000'}
                        modal={ModalDay}
                        tableCell={tableCell}
                    />
                </Box>
                <CreateTask />
            </Box>
        </Box>
        <Chatbox />
    </Fragment>
    )
}
export default VirtualSpace;