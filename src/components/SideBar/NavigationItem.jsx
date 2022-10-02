import React from "react";
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { Fragment } from "react";
import { blueGrey, grey } from "@mui/material/colors";

export default function NavigationItem({ icon, text, onClick, subItems }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return <Fragment>
        <ListItem disablePadding onClick={(event) => {
            toggleOpen();
        }} sx={{
            background: grey[300]
        }}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
        {isOpen && subItems.map(item =>
            <ListItem disablePadding onClick={item.onClick} key={item.text}>
                <ListItemButton sx={{
                    paddingLeft: '30px',
                    background: "white"
                }}>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>)}
    </Fragment>
}