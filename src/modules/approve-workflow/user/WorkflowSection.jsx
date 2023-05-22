import React from "react";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WorkflowSection = ({ sectionName, listWorkflow }) => {
    let navigate = useNavigate();

    return (
        <div>
            <Divider>
                <Chip label={sectionName} />
            </Divider>
            <List>
                {listWorkflow.map(w => {
                    return <ListItemButton onClick={() => navigate(w.link)}>
                        <ListItemText
                            primary={w.title}
                            secondary={w.content}
                        />
                    </ListItemButton>
                })}
            </List>
        </div>
    )
};

export default WorkflowSection;
