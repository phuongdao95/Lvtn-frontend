import React from "react";
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { Fragment } from "react";
import { blueGrey, grey, lightBlue } from "@mui/material/colors";
import { useLogOut } from "../../client/autheticationService";
import { useNavigate } from "react-router";

export default function NavigationItem({ icon, text, onClick, subItems }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const { logOut } = useLogOut();

    const overrideOnclick = (event) => {
        toggleOpen();
    };

    return <Fragment>
        <ListItem disablePadding onClick={subItems.length > 0 ? overrideOnclick :
            onClick
        }
            sx={{
                background: lightBlue[100]
            }}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
        {
            isOpen && subItems.map(item => {
                const pageAccessList = window?.localStorage?.getItem('page_access_list');
                let processedList = [];
                if (!pageAccessList || !Array.isArray(processedList = JSON.parse(pageAccessList))) {
                    logOut(() => navigate('/'));
                }

                if (processedList.includes(item.pageName)) {
                    return <ListItem disablePadding onClick={item.onClick} key={item.text}>
                        <ListItemButton sx={{
                            paddingLeft: '30px',
                            background: "white"
                        }}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                }

            })
        }
    </Fragment >
}