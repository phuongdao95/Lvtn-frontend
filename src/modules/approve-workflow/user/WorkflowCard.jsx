import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

import Icon from '@mui/material/Icon';

const WorkflowCard = ({ title, content, link = '', icon = 'recommend' }) => {
    const location = useLocation();

    const pathname = location.pathname;

    return (
        <Card sx={{
            minWidth: 275,
            minHeight: 150,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 1,
            bgcolor: 'background.paper',
        }}>
            <Icon sx={{ fontSize: 60, color: "text.secondary", marginLeft: '20px', marginRight: '20px' }}>{icon}</Icon>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
            }}>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="string" component="div">
                        {content}
                    </Typography>
                    <Button sx={{ alignSelf: "end", marginRight: 2, marginTop: 2 }} variant="contained" size="small" component={Link} to={`${pathname}\\${link}`}>
                        New Request
                    </Button>
                </Box>
            </Box>
        </Card >
    );
}

export default WorkflowCard;