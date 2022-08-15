import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chat from './components/Chat';
import Rooms from './components/Rooms';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: "#F3F7F9 !important",
        height: "100vh",
    },
}));

const VirtualSpace = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Rooms />
            <main className={classes.content}>
                <Chat />
            </main>
        </div>
    )
}
export default VirtualSpace;